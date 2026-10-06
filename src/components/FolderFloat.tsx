"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Matter from "matter-js";

const { Bodies, Body, Composite, Engine } = Matter;

export type FolderItem =
  | string
  | { label: string; value?: string; color?: string; ink?: string };

type Pill = { label: string; value: string; color?: string; ink?: string };
type Size = { w: number; h: number };
type Pos = { x: number; y: number; r: number };

const DEFAULT_ITEMS = ["Try a warmer palette", "Tighten the spacing", "Logo feels small", "Love the new hero"];
const PAD = 28;
const CHAR = 9.2;
const GAP = 12;
const ROW = 52;
const PILL_H = 34;
const DRAG_MIN = 4;
const ZONE_PAD = 8;

const jitter = (i: number) => {
  const x = Math.sin(i * 12.9898 + 4.1414) * 43758.5453;
  return x - Math.floor(x);
};

// Narrowest gap allowed when a fixed perRow squeezes pills together (slight overlap)
const MIN_GAP = -10;

const layout = (list: Pill[], spread: number, lift: number, tilt: number, sizes: Size[], perRow?: number): Pos[] => {
  const rows: { items: { i: number; pw: number }[]; width: number; gap: number }[] = [];
  const widthOf = (i: number) => sizes[i]?.w ?? PAD + list[i].label.length * CHAR;
  if (perRow) {
    // Fixed pills per row (narrow screens): tighten the gap — down to a slight
    // overlap — so the row fits the spread instead of wrapping one per line
    for (let k = 0; k < list.length; k += perRow) {
      const items = list.slice(k, k + perRow).map((_, o) => ({ i: k + o, pw: widthOf(k + o) }));
      const sum = items.reduce((t, it) => t + it.pw, 0);
      const gap = items.length > 1 ? Math.max(MIN_GAP, Math.min(GAP, (spread * 2 - sum) / (items.length - 1))) : 0;
      rows.push({ items, width: sum + gap * (items.length - 1), gap });
    }
  } else {
    let row: { i: number; pw: number }[] = [];
    let width = 0;
    list.forEach((_, i) => {
      const pw = widthOf(i);
      if (row.length && width + GAP + pw > spread * 2) {
        rows.push({ items: row, width, gap: GAP });
        row = [];
        width = 0;
      }
      row.push({ i, pw });
      width += (row.length > 1 ? GAP : 0) + pw;
    });
    if (row.length) rows.push({ items: row, width, gap: GAP });
  }
  const pos: Pos[] = [];
  rows.forEach((r, ri) => {
    let x = -r.width / 2;
    const shift = (ri % 2 ? 1 : -1) * Math.min(16, spread * 0.1);
    r.items.forEach(({ i, pw }) => {
      const j = jitter(i);
      pos[i] = { x: x + pw / 2 + shift + (j - 0.5) * 6, y: -lift - ri * ROW - j * 6, r: tilt * (j * 2 - 1) };
      x += pw + r.gap;
    });
  });
  return pos;
};

// Hover-capable pointer (desktop) → open on hover; touch (phones, tablets) → tap
const HOVER_QUERY = "(hover: hover) and (pointer: fine)";
const subscribeHover = (cb: () => void) => {
  const mq = window.matchMedia(HOVER_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const useCanHover = () =>
  useSyncExternalStore(subscribeHover, () => window.matchMedia(HOVER_QUERY).matches, () => true);

interface PhysicsBody extends Matter.Body {
  plugin: { phase: number };
}

export interface FolderFloatProps {
  items?: FolderItem[];
  label?: string;
  sublabel?: string;
  /** "auto" = hover on hover-capable pointers, tap on touch devices */
  trigger?: "auto" | "hover" | "click";
  defaultOpen?: boolean;
  closeOnSelect?: boolean;
  physics?: boolean;
  drift?: number;
  onSelect?: (value: string, index: number) => void;
  onOpenChange?: (open: boolean) => void;
  folderColor?: string;
  frontColor?: string;
  paperColor?: string;
  itemColor?: string;
  itemTextColor?: string;
  labelColor?: string;
  width?: number;
  height?: number;
  radius?: number;
  spread?: number;
  /** Fixed number of pills per row (e.g. 2 on phones); default wraps by spread */
  perRow?: number;
  lift?: number;
  tilt?: number;
  reach?: number;
  flapAngle?: number;
  restAngle?: number;
  openDuration?: number;
  stagger?: number;
  bounce?: number;
  className?: string;
}

export default function FolderFloat({
  items = DEFAULT_ITEMS,
  label = "Design feedback",
  sublabel = "",
  trigger = "auto",
  defaultOpen = false,
  closeOnSelect = true,
  physics = true,
  drift = 0.5,
  onSelect,
  onOpenChange,
  folderColor = "#3f3f46",
  frontColor = "#52525b",
  paperColor = "#f5f5f5",
  itemColor = "#f5f5f5",
  itemTextColor = "#18181b",
  labelColor = "#f5f5f5",
  width = 200,
  height = 148,
  radius = 14,
  spread = 180,
  perRow,
  lift = 26,
  tilt = 8,
  reach: reachProp,
  flapAngle = 34,
  restAngle = 16,
  openDuration = 520,
  stagger = 45,
  bounce = 0.3,
  className = "",
}: FolderFloatProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [popped, setPopped] = useState(-1);
  const [live, setLive] = useState(false);
  const [sizes, setSizes] = useState<Size[]>(() =>
    items.map((item) => {
      const lbl = typeof item === "string" ? item : item.label;
      return { w: Math.round(PAD + lbl.length * 6.5), h: PILL_H };
    })
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const world = useRef({
    engine: null as Matter.Engine | null,
    bodies: [] as PhysicsBody[],
    sizes: [] as Size[],
    raf: 0,
    last: 0,
    t0: 0,
    drag: null as null | { i: number; id: number; dx: number; dy: number; sx: number; sy: number; moved: boolean },
    zone: null as null | { left: number; right: number; top: number; bottom: number },
    live: false,
  });
  const latest = useRef({ onSelect, onOpenChange, drift, reduce: false });
  useLayoutEffect(() => {
    latest.current.onSelect = onSelect;
    latest.current.onOpenChange = onOpenChange;
    latest.current.drift = drift;
  });
  const popTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const liveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const canHover = useCanHover();
  const hover = trigger === "hover" || (trigger === "auto" && canHover);

  const list: Pill[] = items.map((item) =>
    typeof item === "string" ? { label: item, value: item } : { ...item, value: item.value ?? item.label }
  );
  const n = list.length;
  const sub = sublabel || `${n} ${n === 1 ? "note" : "notes"}`;
  const pos = layout(list, spread, lift, tilt, sizes, perRow);
  // Height the open pills need above the folder — reserved as padding so the
  // pills never spill over neighbouring content. If reach is passed, it is strictly fixed.
  const reach = reachProp ?? (pos.length ? Math.ceil(Math.max(...pos.map((p) => -p.y)) + PILL_H + 12) : 0);

  const labelsKey = list.map((item) => item.label).join("|");
  useLayoutEffect(() => {
    let raf = 0;
    const measure = () => {
      const next = pillRefs.current.slice(0, n).map((el) => (el ? { w: el.offsetWidth, h: el.offsetHeight } : null));
      if (next.some((s) => !s)) return;
      const ok = next as Size[];
      setSizes((prev) =>
        prev.length === ok.length && prev.every((s, i) => s.w === ok[i].w && s.h === ok[i].h) ? prev : ok
      );
    };
    raf = requestAnimationFrame(measure);
    document.fonts?.ready.then(measure);
    return () => cancelAnimationFrame(raf);
  }, [n, labelsKey]);

  const stopPhysics = useCallback(() => {
    const w = world.current;
    clearTimeout(liveTimer.current);
    cancelAnimationFrame(w.raf);
    w.raf = 0;
    if (w.engine) {
      w.bodies.forEach((b, i) => {
        const el = pillRefs.current[i];
        if (!el) return;
        el.style.setProperty("--x", `${b.position.x.toFixed(1)}px`);
        el.style.setProperty("--y", `${(b.position.y - w.sizes[i].h / 2).toFixed(1)}px`);
      });
      Composite.clear(w.engine.world, false, true);
      Engine.clear(w.engine);
      w.engine = null;
    }
    w.bodies = [];
    w.drag = null;
    w.live = false;
    setLive(false);
  }, []);

  const posKey = pos.map((p) => `${p.x},${p.y}`).join("|");
  const startPhysics = useCallback(() => {
    const w = world.current;
    if (w.engine) return;
    const els = pillRefs.current.slice(0, n);
    if (els.some((el) => !el)) return;
    const engine = Engine.create({ gravity: { x: 0, y: 0, scale: 0 } });
    engine.enableSleeping = false;
    w.engine = engine;
    w.sizes = els.map((el) => ({ w: el!.offsetWidth, h: el!.offsetHeight }));
    const ys = pos.map((p) => p.y);
    const zone = {
      left: -spread - ZONE_PAD,
      right: spread + ZONE_PAD,
      top: Math.min(...ys) - ZONE_PAD,
      bottom: -lift + Math.max(...w.sizes.map((s) => s.h)),
    };
    w.zone = zone;
    w.bodies = els.map((_, i) => {
      const { w: bw, h: bh } = w.sizes[i];
      const b = Bodies.rectangle(pos[i].x, pos[i].y + bh / 2, bw, bh, {
        chamfer: { radius: Math.min(bh / 2 - 1, 16) },
        restitution: 0.55,
        friction: 0,
        frictionAir: 0.08,
        inertia: Infinity,
      }) as PhysicsBody;
      b.plugin = { phase: jitter(i) * Math.PI * 2 };
      return b;
    });
    const T = 80;
    const walls = [
      Bodies.rectangle((zone.left + zone.right) / 2, zone.top - T / 2, zone.right - zone.left + 2 * T, T, { isStatic: true }),
      Bodies.rectangle((zone.left + zone.right) / 2, zone.bottom + T / 2, zone.right - zone.left + 2 * T, T, { isStatic: true }),
      Bodies.rectangle(zone.left - T / 2, (zone.top + zone.bottom) / 2, T, zone.bottom - zone.top + 2 * T, { isStatic: true }),
      Bodies.rectangle(zone.right + T / 2, (zone.top + zone.bottom) / 2, T, zone.bottom - zone.top + 2 * T, { isStatic: true }),
    ];
    Composite.add(engine.world, [...w.bodies, ...walls]);
    w.live = true;
    w.last = 0;
    w.t0 = 0;
    setLive(true);
    const tick = (now: number) => {
      const s = world.current;
      if (!s.engine) return;
      if (!s.t0) s.t0 = now; // clock starts on the first physics frame
      const dt = s.last ? Math.min(32, now - s.last) : 16;
      s.last = now;
      const t = (now - s.t0) / 1000;
      const k = latest.current.drift * 0.00005 * Math.min(1, t / 2);
      s.bodies.forEach((b, i) => {
        if (s.drag && s.drag.i === i) return;
        const ph = b.plugin.phase;
        Body.applyForce(b, b.position, {
          x: Math.sin(t * 0.9 + ph) * k * b.mass,
          y: Math.cos(t * 1.3 + ph * 1.7) * k * b.mass,
        });
      });
      Engine.update(s.engine, dt);
      s.bodies.forEach((b, i) => {
        const el = pillRefs.current[i];
        if (!el) return;
        el.style.setProperty("--x", `${b.position.x.toFixed(1)}px`);
        el.style.setProperty("--y", `${(b.position.y - s.sizes[i].h / 2).toFixed(1)}px`);
      });
      s.raf = requestAnimationFrame(tick);
    };
    w.raf = requestAnimationFrame(tick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n, spread, lift, posKey]);

  const set = useCallback(
    (next: boolean) => {
      if (!next) stopPhysics();
      setOpen((prev) => {
        if (prev === next) return prev;
        latest.current.onOpenChange?.(next);
        return next;
      });
    },
    [stopPhysics]
  );

  useEffect(() => {
    // Closing already stops the simulation inside set(false)
    clearTimeout(liveTimer.current);
    if (!open || !physics || latest.current.reduce) return undefined;
    liveTimer.current = setTimeout(startPhysics, openDuration + (n - 1) * stagger + 80);
    return () => clearTimeout(liveTimer.current);
  }, [open, physics, openDuration, stagger, n, startPhysics]);

  // Tap mode: a tap anywhere outside the folder closes it
  useEffect(() => {
    if (hover || !open) return;
    const onDown = (e: Event) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) set(false);
    };
    // touchstart too: some touch browsers don't emit pointerdown for every tap
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("touchstart", onDown, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [hover, open, set]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      latest.current.reduce = mq.matches;
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(
    () => () => {
      clearTimeout(popTimer.current);
      stopPhysics();
    },
    [stopPhysics]
  );

  const pick = (item: Pill, i: number) => {
    latest.current.onSelect?.(item.value, i);
    clearTimeout(popTimer.current);
    setPopped(i);
    popTimer.current = setTimeout(() => setPopped(-1), 320);
    if (closeOnSelect) set(false);
  };

  const pointerAt = (e: React.PointerEvent) => {
    const r = anchorRef.current?.getBoundingClientRect();
    return r ? { x: e.clientX - r.left, y: e.clientY - r.top } : { x: 0, y: 0 };
  };
  const down = (e: React.PointerEvent<HTMLButtonElement>, i: number) => {
    const w = world.current;
    if (!w.live || e.button !== 0) return;
    const b = w.bodies[i];
    if (!b) return;
    const p = pointerAt(e);
    w.drag = { i, id: e.pointerId, dx: b.position.x - p.x, dy: b.position.y - p.y, sx: e.clientX, sy: e.clientY, moved: false };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };
  const move = (e: React.PointerEvent<HTMLButtonElement>, i: number) => {
    const w = world.current;
    const d = w.drag;
    if (!d || d.i !== i || d.id !== e.pointerId || !w.zone) return;
    if (!d.moved && Math.hypot(e.clientX - d.sx, e.clientY - d.sy) >= DRAG_MIN) {
      d.moved = true;
      e.currentTarget.setAttribute("data-drag", "");
    }
    if (!d.moved) return;
    const b = w.bodies[i];
    const { w: bw, h: bh } = w.sizes[i];
    const z = w.zone;
    const p = pointerAt(e);
    const x = Math.min(z.right - bw / 2, Math.max(z.left + bw / 2, p.x + d.dx));
    const y = Math.min(z.bottom - bh / 2, Math.max(z.top + bh / 2, p.y + d.dy));
    Body.setVelocity(b, { x: (x - b.position.x) * 0.6, y: (y - b.position.y) * 0.6 });
    Body.setPosition(b, { x, y });
  };
  const up = (e: React.PointerEvent<HTMLButtonElement>, i: number, item: Pill) => {
    const w = world.current;
    const d = w.drag;
    if (!d || d.i !== i || d.id !== e.pointerId) return;
    w.drag = null;
    e.currentTarget.removeAttribute("data-drag");
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    if (!d.moved && e.type === "pointerup") pick(item, i);
  };

  return (
    <div
      ref={rootRef}
      className={`folder-float${className ? ` ${className}` : ""}`}
      data-open={open ? "" : undefined}
      data-live={live ? "" : undefined}
      data-physics={physics ? "" : undefined}
      data-trigger={hover ? "hover" : "click"}
      onPointerEnter={hover ? () => set(true) : undefined}
      onPointerLeave={
        hover
          ? () => {
              if (!world.current.drag) set(false);
            }
          : undefined
      }
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          e.stopPropagation();
          set(false);
        }
      }}
      style={
        {
          "--ff-w": `${width}px`,
          "--ff-h": `${height}px`,
          "--ff-r": `${radius}px`,
          "--ff-reach": `${reach}px`,
          "--ff-back": folderColor,
          "--ff-front": frontColor,
          "--ff-paper": paperColor,
          "--ff-item": itemColor,
          "--ff-item-ink": itemTextColor,
          "--ff-label": labelColor,
          "--ff-spread": `${spread}px`,
          "--ff-lift": `${lift}px`,
          "--ff-angle": `${flapAngle}deg`,
          "--ff-rest": `${restAngle}deg`,
          "--ff-open": `${openDuration}ms`,
          "--ff-close": `${Math.round(openDuration * 0.6)}ms`,
          "--ff-stagger": `${stagger}ms`,
          "--ff-n": n,
          "--ff-spring": `cubic-bezier(0.34, ${(1 + bounce * 1.9).toFixed(2)}, 0.64, 1)`,
        } as React.CSSProperties
      }
    >
      <div ref={anchorRef} className="folder-float__items">
        {list.map((item, i) => {
          const p = pos[i];
          return (
            <button
              key={`${item.value}-${i}`}
              ref={(el) => {
                pillRefs.current[i] = el;
              }}
              type="button"
              className="folder-float__item"
              tabIndex={open ? 0 : -1}
              aria-hidden={!open}
              data-pop={popped === i ? "" : undefined}
              style={
                {
                  "--i": i,
                  "--x": `${p.x.toFixed(1)}px`,
                  "--y": `${p.y.toFixed(1)}px`,
                  "--r": `${p.r.toFixed(2)}deg`,
                  ...(item.color ? { "--ff-item": item.color } : {}),
                  ...(item.ink ? { "--ff-item-ink": item.ink } : {}),
                } as React.CSSProperties
              }
              onPointerDown={(e) => down(e, i)}
              onPointerMove={(e) => move(e, i)}
              onPointerUp={(e) => up(e, i, item)}
              onPointerCancel={(e) => up(e, i, item)}
              onClick={(e) => {
                if (!world.current.live || e.detail === 0) pick(item, i);
              }}
            >
              <span className="folder-float__drift">{item.label}</span>
            </button>
          );
        })}
      </div>
      <div className="folder-float__folder">
        <span className="folder-float__back" aria-hidden="true" />
        <span className="folder-float__paper" aria-hidden="true" />
        <span className="folder-float__front" aria-hidden="true">
          <span className="folder-float__label">{label}</span>
          <span className="folder-float__sub">{sub}</span>
        </span>
        <button
          type="button"
          className="folder-float__trigger"
          aria-expanded={open}
          aria-label={`${label}, ${sub}`}
          onClick={() => set(!open)}
        />
      </div>
    </div>
  );
}
