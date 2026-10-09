"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Bar poses. Every pose uses the same transform list (translate · rotate ·
 * scaleX) so the browser interpolates it smoothly, and only transform and
 * opacity animate — no layout work, so the morph stays on the compositor.
 * Bars are full width and scaled about their centre; the X offset
 * (`(1 - scale) / 2`) keeps the short bars flush with the right edge.
 * Y offsets use `cqh` (container height) so the icon scales with its box.
 */
const pose = (x: number, y: number, rotate: number, scale: number) =>
  `translate(${x}%, ${y}cqh) rotate(${rotate}deg) scaleX(${scale})`;

const BARS = {
  closed: [pose(0, -28, 0, 1), pose(16, 0, 0, 0.68), pose(30, 28, 0, 0.4)],
  open: [pose(0, 0, 45, 1), pose(16, 0, 0, 0), pose(0, 0, -45, 1)],
};

interface MenuToggleIconProps {
  /** Shows the X instead of the bars */
  open: boolean;
  /**
   * For close buttons inside a menu that has just opened: render the bars
   * first and morph into the X once the menu has slid in, so the hamburger
   * the user tapped appears to turn into the close button
   */
  morphOnMount?: boolean;
  className?: string;
}

/**
 * SVU hamburger — three right-aligned bars, each shorter than the one above;
 * the top and bottom bars cross into an X while the middle one fades out.
 * Sized by `className` (default 24px); colour follows `currentColor`.
 */
export default function MenuToggleIcon({ open, morphOnMount = false, className }: MenuToggleIconProps) {
  const [ready, setReady] = useState(!morphOnMount);

  useEffect(() => {
    if (!morphOnMount) return;
    // Let the menu's entrance settle first, then morph
    const t = setTimeout(() => setReady(true), 180);
    return () => clearTimeout(t);
  }, [morphOnMount]);

  const poses = open && ready ? BARS.open : BARS.closed;

  return (
    <span aria-hidden="true" className={cn("relative block h-6 w-6 [container-type:size]", className)}>
      {poses.map((transform, i) => (
        <span
          key={i}
          className="absolute inset-x-0 top-1/2 -mt-px h-[2px] rounded-full bg-current transition-[transform,opacity] duration-[420ms] ease-[cubic-bezier(0.65,0,0.35,1)] will-change-transform motion-reduce:transition-none"
          style={{ transform, opacity: i === 1 && poses === BARS.open ? 0 : 1 }}
        />
      ))}
    </span>
  );
}

/** Static hamburger with an icon-style signature, for icon slots like the mobile tab bar */
export function MenuBarsIcon({ className }: { className?: string; strokeWidth?: number }) {
  return <MenuToggleIcon open={false} className={className} />;
}
