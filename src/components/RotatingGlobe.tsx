"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import AndhraMap from "@/components/AndhraMap";
import ap from "@/data/andhraDistricts.json";
import {
  LAND_MASK_B64,
  LAND_MASK_HEIGHT,
  LAND_MASK_WIDTH,
} from "@/data/landMask";

interface GlobePoint {
  x: number;
  y: number;
  z: number;
}

/** A timed camera move (rotation + zoom) driven from the render loop */
interface CameraTween {
  start: number;
  duration: number;
  direction: "in" | "out";
  yaw0: number;
  yaw1: number;
  pitch0: number;
  pitch1: number;
  zoom0: number;
  zoom1: number;
}

/** Decoded Natural Earth land mask (1° cells) — see src/data/landMask.ts */
let landBits: Uint8Array | null = null;

function isLand(lat: number, lng: number): boolean {
  if (!landBits) {
    const bin = atob(LAND_MASK_B64);
    landBits = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) landBits[i] = bin.charCodeAt(i);
  }
  const row = Math.min(LAND_MASK_HEIGHT - 1, Math.max(0, Math.floor(90 - lat)));
  const col = (((Math.floor(lng + 180) % LAND_MASK_WIDTH) + LAND_MASK_WIDTH) % LAND_MASK_WIDTH);
  const i = row * LAND_MASK_WIDTH + col;
  return ((landBits[i >> 3] >> (7 - (i & 7))) & 1) === 1;
}

/** Number of brightness bands dots are batched into (one path per band) */
const DOT_BANDS = 8;

const DEG = Math.PI / 180;
const TAU = Math.PI * 2;

/** Sri Venkateswara University — exact point from the Google Maps link */
const SVU = { lat: ap.svu.lat, lng: ap.svu.lng };

const REST_PITCH = -0.32;
/**
 * How far the canvas camera dives before handing over to the district map.
 * Past this point the compositor carries the dive on (CSS scale + fade of the
 * last frame), so the canvas never has to repaint at extreme zoom.
 */
const ZOOM_MAX = 4.5;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
/** Accelerating zoom, so the CSS hand-off continues an already-moving dive */
const easeInQuad = (t: number) => t * t;
const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function RotatingGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const rotationVelocityRef = useRef({ x: 0.0035 });
  // Start with Tirupati just left of centre (the spin carries it across the
  // face), tilted so the northern hemisphere leans toward the viewer
  const rotationRef = useRef({ yaw: -SVU.lng * DEG - 0.45, pitch: REST_PITCH });
  const zoomRef = useRef(1);
  const tweenRef = useRef<CameraTween | null>(null);
  const viewRef = useRef<"globe" | "map">("globe");
  /** Screen-space hit areas for the SVU pin, refreshed every frame */
  const pinHitRef = useRef<{ x: number; y: number; r: number; label?: DOMRect } | null>(null);

  const [view, setView] = useState<"globe" | "map">("globe");
  const exploreRef = useRef<HTMLButtonElement | null>(null);
  const prevViewRef = useRef(view);
  /** Last globe ↔ map switch came from the keyboard → move focus along with it */
  const viaKeyboardRef = useRef(false);

  // Returning from the map by keyboard: hand focus back to the explore control
  // (never on first load, only after an actual map → globe transition)
  useEffect(() => {
    if (prevViewRef.current === "map" && view === "globe" && viaKeyboardRef.current) {
      exploreRef.current?.focus({ preventScroll: true });
    }
    prevViewRef.current = view;
  }, [view]);

  const [openedByKeyboard, setOpenedByKeyboard] = useState(false);

  const showMap = useCallback(() => {
    viewRef.current = "map";
    setOpenedByKeyboard(viaKeyboardRef.current);
    setView("map");
  }, []);

  const zoomIn = useCallback(() => {
    if (tweenRef.current || viewRef.current !== "globe") return;
    const { yaw, pitch } = rotationRef.current;
    // Face Andhra Pradesh, taking the shortest way round
    let yaw1 = -ap.centre.lng * DEG;
    yaw1 += TAU * Math.round((yaw - yaw1) / TAU);
    tweenRef.current = {
      start: performance.now(),
      duration: 1150,
      direction: "in",
      yaw0: yaw,
      yaw1,
      pitch0: pitch,
      pitch1: -ap.centre.lat * DEG,
      zoom0: zoomRef.current,
      zoom1: ZOOM_MAX,
    };
  }, []);

  const zoomOut = useCallback((viaKeyboard: boolean) => {
    if (viewRef.current !== "map") return;
    viaKeyboardRef.current = viaKeyboard;
    viewRef.current = "globe";
    setView("globe");
    const { yaw, pitch } = rotationRef.current;
    tweenRef.current = {
      start: performance.now(),
      duration: 1100,
      direction: "out",
      yaw0: yaw,
      yaw1: yaw + 0.5,
      pitch0: pitch,
      pitch1: REST_PITCH,
      zoom0: zoomRef.current,
      zoom1: 1,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let pulsePhase = 0;

    // Evenly spaced dot grid (constant spacing on the sphere), kept on land.
    // Latitude trig is precomputed — only the longitude term changes per frame.
    const dots: { cosLat: number; sinLat: number; lngRad: number }[] = [];
    const spacing = 1.25;

    for (let lat = -84; lat <= 84; lat += spacing) {
      const circum = Math.cos(lat * DEG);
      const step = spacing / Math.max(circum, 0.05);
      const offset = (Math.round(lat / spacing) % 2) * step * 0.5;
      for (let lng = -180 + offset; lng < 180; lng += step) {
        if (isLand(lat, lng)) {
          dots.push({ cosLat: circum, sinLat: Math.sin(lat * DEG), lngRad: lng * DEG });
        }
      }
    }

    // Cached CSS size — avoids forcing layout every frame
    let width = 0;
    let height = 0;
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Edge mask radius (see .svu-globe-canvas-wrap): clear of the resting
      // globe + glow, so it only softens the sphere once it overflows on a dive
      canvas.parentElement?.style.setProperty(
        "--globe-mask-r",
        `${Math.round(Math.min(width, height) * 0.44 * 1.18)}px`
      );
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);
      pulsePhase += 0.04;

      // Advance any camera move
      const tween = tweenRef.current;
      if (tween) {
        const t = clamp01((now - tween.start) / tween.duration);
        // Zoom-in: turn to face AP first, then dive. Zoom-out: the reverse.
        const rotT = easeInOutCubic(
          tween.direction === "in" ? clamp01(t / 0.55) : clamp01((t - 0.2) / 0.8)
        );
        const zoomT =
          tween.direction === "in"
            ? easeInQuad(clamp01((t - 0.25) / 0.75))
            : easeOutQuad(clamp01(t / 0.8));
        rotationRef.current.yaw = lerp(tween.yaw0, tween.yaw1, rotT);
        rotationRef.current.pitch = lerp(tween.pitch0, tween.pitch1, rotT);
        // Interpolate zoom in log space so the dive feels constant-speed
        zoomRef.current = Math.exp(
          lerp(Math.log(tween.zoom0), Math.log(tween.zoom1), zoomT)
        );
        if (t >= 1) {
          tweenRef.current = null;
          // Hand over: CSS keeps diving on this last frame while the map arrives
          if (tween.direction === "in") showMap();
        }
      } else if (viewRef.current === "map") {
        // Canvas is hidden behind the district map — nothing to draw
        return;
      } else if (!isDraggingRef.current) {
        // Auto-spin; ease the tilt back to the resting angle
        rotationRef.current.yaw += rotationVelocityRef.current.x;
        rotationRef.current.pitch += (REST_PITCH - rotationRef.current.pitch) * 0.02;
      }

      ctx.clearRect(0, 0, width, height);

      const yaw = rotationRef.current.yaw;
      const pitch = rotationRef.current.pitch;
      const zoom = zoomRef.current;
      const zoomProgress = clamp01((zoom - 1) / (ZOOM_MAX - 1));
      // Globe chrome (glow, rim, pin) fades as the camera dives in
      const chromeAlpha = clamp01(1 - (zoom - 1) / 1.5);
      // Canvas shadows are expensive on large, changing shapes — skip them
      // while the camera is moving so the transition holds 60fps
      const glow = tweenRef.current ? 0 : 1;

      // Globe geometry — centre drifts to the exact middle while zooming
      const baseRadius = Math.min(width, height) * 0.44;
      const globeRadius = baseRadius * zoom;
      const cx = width * lerp(0.52, 0.5, zoomProgress);
      const cy = height * lerp(0.52, 0.5, zoomProgress);

      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);

      // Coordinate converter (Lat, Lng) -> 3D position (x, y, z)
      const project = (lat: number, lng: number): GlobePoint => {
        const theta = lng * DEG + yaw;
        const x = globeRadius * Math.cos(lat * DEG) * Math.sin(theta);
        const y = -globeRadius * Math.sin(lat * DEG);
        const z = globeRadius * Math.cos(lat * DEG) * Math.cos(theta);
        // Pitch tilt rotation
        return { x, y: y * cosP - z * sinP, z: y * sinP + z * cosP };
      };

      // 1. Atmospheric back glow behind the sphere
      if (chromeAlpha > 0) {
        const bgGlow = ctx.createRadialGradient(cx, cy, globeRadius * 0.75, cx, cy, globeRadius * 1.35);
        bgGlow.addColorStop(0, "rgba(31, 69, 214, 0.22)"); // Sapphire glow
        bgGlow.addColorStop(0.5, "rgba(35, 181, 233, 0.08)"); // Sky glow
        bgGlow.addColorStop(1, "transparent");

        ctx.save();
        ctx.globalAlpha = chromeAlpha;
        ctx.fillStyle = bgGlow;
        ctx.beginPath();
        ctx.arc(cx, cy, globeRadius * 1.35, 0, TAU);
        ctx.fill();
        ctx.restore();
      }

      // 2. Dark sphere body (silhouette)
      const sphereGrad = ctx.createRadialGradient(
        cx - globeRadius * 0.35,
        cy - globeRadius * 0.35,
        globeRadius * 0.1,
        cx,
        cy,
        globeRadius
      );
      sphereGrad.addColorStop(0, "rgba(8, 24, 76, 0.95)"); // Deep Navy core
      sphereGrad.addColorStop(0.7, "rgba(2, 11, 40, 0.98)");
      sphereGrad.addColorStop(1, "rgba(0, 8, 28, 1)");

      // While diving in, the body thins out so the card shows through
      ctx.save();
      ctx.globalAlpha = 1 - (1 - chromeAlpha) * 0.85;
      ctx.beginPath();
      ctx.arc(cx, cy, globeRadius, 0, TAU);
      ctx.fillStyle = sphereGrad;
      ctx.fill();
      ctx.restore();

      // 3. Land dots — real world map. Batched into depth bands so each
      //    band is a single path/fill: bright ivory in front, fading to sky
      //    blue toward the limb. Off-screen dots are culled while zoomed.
      const dotSize = Math.min(2.6, Math.max(1.1, globeRadius / 150));
      const bands: Path2D[] = Array.from({ length: DOT_BANDS }, () => new Path2D());
      // Projection inlined (no per-dot objects) so ~8k dots/frame create no
      // garbage — GC pauses were the main source of dropped frames
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const theta = dot.lngRad + yaw;
        const py = -dot.sinLat;
        const pz = dot.cosLat * Math.cos(theta);
        const depth = py * sinP + pz * cosP; // (0, 1] on the visible side
        if (depth <= 0) continue;
        const x = cx + globeRadius * dot.cosLat * Math.sin(theta);
        const y = cy + globeRadius * (py * cosP - pz * sinP);
        if (x < -4 || x > width + 4 || y < -4 || y > height + 4) continue;
        const band = Math.min(DOT_BANDS - 1, Math.floor(depth * DOT_BANDS));
        const r = dotSize * (0.55 + 0.45 * depth);
        if (r < 1.6) {
          // At ≤3px a square is indistinguishable from a circle and ~2.5×
          // cheaper to raster; side = r·√π keeps the same area
          const s = r * 1.772;
          bands[band].rect(x - s / 2, y - s / 2, s, s);
        } else {
          bands[band].moveTo(x + r, y);
          bands[band].arc(x, y, r, 0, TAU);
        }
      }
      bands.forEach((path, i) => {
        const t = (i + 0.5) / DOT_BANDS;
        // Sky #23B5E9 at the edge → ivory #FFF9EE facing the viewer
        const rC = Math.round(35 + (255 - 35) * t);
        const gC = Math.round(181 + (249 - 181) * t);
        const bC = Math.round(233 + (238 - 233) * t);
        ctx.fillStyle = `rgba(${rC}, ${gC}, ${bC}, ${0.18 + 0.72 * t})`;
        ctx.fill(path);
      });

      // 4. SVU location pin — Tirupati, Andhra Pradesh, India
      pinHitRef.current = null;
      const svuPt = project(SVU.lat, SVU.lng);
      if (svuPt.z > 0 && chromeAlpha > 0) {
        const sx = cx + svuPt.x;
        const sy = cy + svuPt.y;
        // Fade as the pin rolls toward the limb
        const vis = Math.min(1, svuPt.z / (globeRadius * 0.35)) * chromeAlpha;

        ctx.save();
        ctx.globalAlpha = vis;

        // Ground pulse rings at the exact location
        for (let w = 0; w < 3; w++) {
          const p = (pulsePhase * 0.45 + w / 3) % 1;
          ctx.beginPath();
          ctx.ellipse(sx, sy, 3 + p * 22, (3 + p * 22) * 0.55, 0, 0, TAU);
          ctx.strokeStyle = `rgba(255, 178, 26, ${(1 - p) * 0.85})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Location dot on the ground
        ctx.beginPath();
        ctx.arc(sx, sy, 2.4, 0, TAU);
        ctx.fillStyle = "#D23F12";
        ctx.fill();

        // Teardrop pin standing on the dot
        const pinH = 26;
        const headR = 8;
        const bob = Math.sin(pulsePhase * 1.2) * 1.5;
        const headY = sy - pinH + headR + bob;
        ctx.beginPath();
        ctx.moveTo(sx, sy - 2 + bob);
        ctx.bezierCurveTo(sx - headR * 0.35, sy - 8 + bob, sx - headR, headY + headR * 0.6, sx - headR, headY);
        ctx.arc(sx, headY, headR, Math.PI, 0);
        ctx.bezierCurveTo(sx + headR, headY + headR * 0.6, sx + headR * 0.35, sy - 8 + bob, sx, sy - 2 + bob);
        ctx.closePath();
        const pinGrad = ctx.createLinearGradient(sx, headY - headR, sx, sy);
        pinGrad.addColorStop(0, "#FFB21A");
        pinGrad.addColorStop(1, "#D23F12");
        ctx.fillStyle = pinGrad;
        ctx.shadowColor = "rgba(255, 178, 26, 0.75)";
        ctx.shadowBlur = 14 * glow;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = "rgba(255, 249, 238, 0.9)";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Pin eye
        ctx.beginPath();
        ctx.arc(sx, headY, 3.2, 0, TAU);
        ctx.fillStyle = "#001546";
        ctx.fill();

        let label: DOMRect | undefined;
        // Label badge to the right of the pin, with a call to action
        if (vis > 0.6) {
          const title = "SVU";
          const sub = "Tirupati, Andhra Pradesh";
          const cta = "Click to explore ›";
          ctx.font = "800 11px 'Plus Jakarta Sans', sans-serif";
          const titleW = ctx.measureText(title).width;
          ctx.font = "600 9px 'Inter', sans-serif";
          const subW = ctx.measureText(sub).width;
          const bw = Math.max(titleW, subW) + 18;
          const bh = 46;
          const bx = sx + headR + 8;
          const by = headY - 17;

          ctx.fillStyle = "rgba(0, 21, 70, 0.9)";
          ctx.strokeStyle = "rgba(255, 178, 26, 0.85)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(bx, by, bw, bh, 8);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = "#FFB21A";
          ctx.font = "800 11px 'Plus Jakarta Sans', sans-serif";
          ctx.fillText(title, bx + 9, by + 14);
          ctx.fillStyle = "rgba(255, 233, 194, 0.85)";
          ctx.font = "600 9px 'Inter', sans-serif";
          ctx.fillText(sub, bx + 9, by + 27);
          ctx.fillStyle = "#23B5E9";
          ctx.font = "700 8.5px 'Inter', sans-serif";
          ctx.fillText(cta, bx + 9, by + 39);

          label = new DOMRect(bx, by, bw, bh);
        }

        ctx.restore();

        if (vis > 0.4 && !tweenRef.current) {
          pinHitRef.current = { x: sx, y: (sy + headY) / 2, r: 18, label };
        }
      }

      // 5. Iconic coloured atmosphere rim arc
      if (chromeAlpha > 0) {
        ctx.save();
        ctx.globalAlpha = chromeAlpha;
        const rimGrad = ctx.createLinearGradient(
          cx - globeRadius,
          cy - globeRadius,
          cx + globeRadius * 0.8,
          cy - globeRadius * 0.8
        );
        rimGrad.addColorStop(0, "rgba(14, 128, 80, 0.95)"); // Emerald
        rimGrad.addColorStop(0.3, "rgba(35, 181, 233, 0.95)"); // Sky
        rimGrad.addColorStop(0.65, "rgba(31, 69, 214, 0.95)"); // Sapphire
        rimGrad.addColorStop(1, "rgba(255, 178, 26, 0.95)"); // Saffron Gold

        ctx.beginPath();
        ctx.arc(cx, cy, globeRadius + 1.5, Math.PI * 0.95, Math.PI * 1.95, false);
        ctx.strokeStyle = rimGrad;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = "#23B5E9";
        ctx.shadowBlur = 14 * glow;
        ctx.stroke();
        ctx.restore();
      }
    };


    animationFrameId = requestAnimationFrame(render);

    // Pointer controls: drag to rotate, click the pin to zoom into Andhra Pradesh
    const hitPin = (clientX: number, clientY: number) => {
      const hit = pinHitRef.current;
      if (!hit) return false;
      const r = canvas.getBoundingClientRect();
      const x = clientX - r.left;
      const y = clientY - r.top;
      if (Math.hypot(x - hit.x, y - hit.y) <= hit.r) return true;
      const l = hit.label;
      return !!l && x >= l.left && x <= l.right && y >= l.top && y <= l.bottom;
    };

    let downPos: { x: number; y: number } | null = null;
    let moved = false;

    const onPointerDown = (e: PointerEvent) => {
      if (viewRef.current !== "globe" || tweenRef.current) return;
      downPos = { x: e.clientX, y: e.clientY };
      moved = false;
      isDraggingRef.current = true;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) {
        if (e.target === canvas) {
          canvas.style.cursor = hitPin(e.clientX, e.clientY) ? "pointer" : "grab";
        }
        return;
      }
      if (downPos && Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y) > 4) {
        moved = true;
      }
      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;
      rotationRef.current.yaw += dx * 0.007;
      rotationRef.current.pitch = Math.max(-0.9, Math.min(0.7, rotationRef.current.pitch + dy * 0.007));
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
      canvas.style.cursor = "grabbing";
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      canvas.style.cursor = "grab";
      if (!moved && hitPin(e.clientX, e.clientY)) {
        viaKeyboardRef.current = false;
        zoomIn();
      }
      downPos = null;
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [showMap, zoomIn]);

  return (
    <div className="relative w-full h-full select-none overflow-hidden">
      <div className={`svu-globe-canvas-wrap ${view === "map" ? "is-hidden" : ""}`}>
        <canvas
          ref={canvasRef}
          className="w-full h-full block cursor-grab"
          style={{ touchAction: "none" }}
          title="Drag to rotate · click the SVU pin to explore Andhra Pradesh"
        />
      </div>

      {/* Keyboard / screen-reader route into the district map — kept outside
          the masked canvas layer so the edge fade can't clip it */}
      {view === "globe" && (
        <button
          ref={exploreRef}
          type="button"
          onClick={(e) => {
            // detail === 0 → activated with Enter/Space rather than a pointer
            viaKeyboardRef.current = e.detail === 0;
            zoomIn();
          }}
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-20 focus:rounded-full focus:bg-[#FFB21A] focus:px-3 focus:py-1.5 focus:text-xs focus:font-bold focus:text-[#001546]"
        >
          Explore SVU on the Andhra Pradesh map
        </button>
      )}

      <AndhraMap
        visible={view === "map"}
        focusOnShow={openedByKeyboard}
        onBack={zoomOut}
      />
    </div>
  );
}
