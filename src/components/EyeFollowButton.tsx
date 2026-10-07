"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useSpring, type MotionValue } from "motion/react";

// Ported from Framer's "Eye Follow Button" (FollowEyes): a pill button whose
// two eyes track the cursor anywhere on the page. Pupils are driven by spring
// motion values — no React re-render per mouse move.

interface EyeFollowButtonProps {
  href: string;
  children: React.ReactNode;
  buttonColor?: string;
  textColor?: string;
  eyeColor?: string;
  pupilColor?: string;
  eyeSize?: number;
  pupilSize?: number;
  eyeGap?: number;
  /** Spring stiffness — higher follows faster */
  speed?: number;
  /** How far pupils travel inside the eye, 0–100 % */
  range?: number;
  className?: string;
}

function Eye({ size, pupil, eyeColor, pupilColor, x, y, lid }: {
  size: number;
  pupil: number;
  eyeColor: string;
  pupilColor: string;
  x: MotionValue<number>;
  y: MotionValue<number>;
  /** Vertical scale of the eye — dips toward 0 for a blink */
  lid: MotionValue<number>;
}) {
  return (
    <motion.span
      className="flex items-center justify-center overflow-hidden rounded-full"
      style={{ width: size, height: size, backgroundColor: eyeColor, scaleY: lid }}
    >
      <motion.span
        className="block rounded-full"
        style={{ width: pupil, height: pupil, backgroundColor: pupilColor, x, y }}
      />
    </motion.span>
  );
}

/**
 * Natural blinking: irregular gaps (2.5–6 s), a quick close and slightly
 * slower open (~170 ms), and an occasional double blink.
 */
function useBlink(enabled: boolean) {
  const lid = useMotionValue(1);
  useEffect(() => {
    if (!enabled) return;
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;
    const blinkOnce = () =>
      animate(lid, [1, 0.08, 1], { duration: 0.17, times: [0, 0.4, 1], ease: "easeInOut" });
    const schedule = () => {
      timer = setTimeout(async () => {
        if (cancelled) return;
        await blinkOnce();
        if (!cancelled && Math.random() < 0.2) {
          await new Promise((r) => setTimeout(r, 90));
          if (!cancelled) await blinkOnce();
        }
        if (!cancelled) schedule();
      }, 2500 + Math.random() * 3500);
    };
    schedule();
    return () => {
      cancelled = true;
      clearTimeout(timer);
      lid.set(1);
    };
  }, [enabled, lid]);
  return lid;
}

export default function EyeFollowButton({
  href,
  children,
  buttonColor = "#001546",
  textColor = "#FFFFFF",
  eyeColor = "#FFFFFF",
  pupilColor = "#001546",
  eyeSize = 40,
  pupilSize = 12,
  eyeGap = 4,
  speed = 100,
  range = 90,
  className = "",
}: EyeFollowButtonProps) {
  const eyesRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const pupil = Math.min(pupilSize, eyeSize * 0.8);
  const maxDistance = ((eyeSize - pupil) / 2) * (range / 100);

  const spring = { stiffness: speed, damping: 20 };
  const lx = useSpring(0, spring);
  const ly = useSpring(0, spring);
  const rx = useSpring(0, spring);
  const ry = useSpring(0, spring);
  // Both eyes share one lid so they blink together
  const lid = useBlink(!reduceMotion);

  // Mouse devices follow the cursor; touch devices look around on their own.
  // Tracked live so it also switches when DevTools toggles device emulation.
  const [canHover, setCanHover] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Desktop: follow the cursor
  useEffect(() => {
    if (reduceMotion || !canHover) return;
    // Pointer events can fire far faster than the display refreshes — keep
    // only the latest position and aim once per frame
    let raf = 0;
    let px = 0;
    let py = 0;
    const aimAtPointer = () => {
      raf = 0;
      const el = eyesRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const mx = px - (r.left + r.width / 2);
      const my = py - (r.top + r.height / 2);
      // Each eye aims from its own centre, like the original
      const aim = (offsetX: number) => {
        const dx = mx - offsetX;
        const d = Math.hypot(dx, my);
        if (d === 0) return { x: 0, y: 0 };
        const k = Math.min(d, maxDistance) / d;
        return { x: dx * k, y: my * k };
      };
      const half = (eyeSize + eyeGap) / 2;
      const l = aim(-half);
      const rr = aim(half);
      lx.set(l.x);
      ly.set(l.y);
      rx.set(rr.x);
      ry.set(rr.y);
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(aimAtPointer);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion, canHover, maxDistance, eyeSize, eyeGap, lx, ly, rx, ry]);

  // Touch: glance around like a real eye — a quick shift to a random
  // direction, hold, sometimes a small corrective adjustment, and a
  // regular drift back to looking straight ahead
  useEffect(() => {
    if (reduceMotion || canHover) return;
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;
    let lastAngle = 0;

    const look = (x: number, y: number) => {
      lx.set(x);
      ly.set(y);
      rx.set(x);
      ry.set(y);
    };

    const glance = () => {
      if (cancelled) return;
      if (Math.random() < 0.25) {
        look(0, 0);
      } else {
        // New direction at least ~70° away from the last, so it really looks around
        const angle = lastAngle + (Math.PI * 0.4 + Math.random() * Math.PI * 1.2);
        lastAngle = angle;
        const dist = maxDistance * (0.6 + Math.random() * 0.4);
        const x = Math.cos(angle) * dist;
        const y = Math.sin(angle) * dist;
        look(x, y);
        if (Math.random() < 0.3) {
          // Small corrective re-fixation shortly after the main shift
          timer = setTimeout(() => {
            if (cancelled) return;
            look(x * 0.85 + (Math.random() - 0.5) * maxDistance * 0.3, y * 0.85 + (Math.random() - 0.5) * maxDistance * 0.3);
            timer = setTimeout(glance, 900 + Math.random() * 1500);
          }, 350);
          return;
        }
      }
      timer = setTimeout(glance, 1000 + Math.random() * 1800);
    };

    timer = setTimeout(glance, 600);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      look(0, 0);
    };
  }, [reduceMotion, canHover, maxDistance, lx, ly, rx, ry]);

  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
      className={`inline-flex w-fit items-center gap-5 rounded-[30px] py-1.5 pl-5 pr-1.5 font-bold tracking-[-0.02em] no-underline shadow-[10px_10px_14px_-1.25px_rgba(0,21,70,0.19),3px_3px_4.5px_-0.94px_rgba(0,21,70,0.1)] outline-none focus-visible:ring-2 focus-visible:ring-[#FFB21A] focus-visible:ring-offset-2 ${className}`}
      style={{ backgroundColor: buttonColor, color: textColor }}
    >
      <span className="whitespace-nowrap text-base leading-[1.4]">{children}</span>
      <span ref={eyesRef} className="flex items-center" style={{ gap: eyeGap }} aria-hidden="true">
        <Eye size={eyeSize} pupil={pupil} eyeColor={eyeColor} pupilColor={pupilColor} x={lx} y={ly} lid={lid} />
        <Eye size={eyeSize} pupil={pupil} eyeColor={eyeColor} pupilColor={pupilColor} x={rx} y={ry} lid={lid} />
      </span>
    </motion.a>
  );
}
