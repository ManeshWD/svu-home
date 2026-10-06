"use client";

import React, { useState } from "react";

type Phase = "idle" | "filling" | "emptying";

/**
 * Outlined wordmark that fills on hover.
 *
 * Two stacked copies of the same text: the base is stroke-only, the overlay
 * is solid and clipped. The clip drives the effect:
 *
 *   idle      inset(0 100% 0 0)    empty, anchored to the left edge
 *   filling   inset(0 0 0 0)       sweeps in from the left, slowly
 *   emptying  inset(0 50% 0 50%)   drains inward and vanishes at the centre
 *
 * `idle` and `emptying` both render nothing, so snapping from one to the
 * other after the drain finishes is invisible — that reset is what lets the
 * next hover start from the side again instead of rewinding to the centre.
 */
export default function OutlineWord({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [phase, setPhase] = useState<Phase>("idle");

  return (
    <span
      className={`svu-outline-word ${className}`}
      data-phase={phase}
      onPointerEnter={() => setPhase("filling")}
      onPointerLeave={() => setPhase("emptying")}
    >
      {/* Stroke-only base — always visible */}
      <span className="svu-outline-word__stroke">{children}</span>

      {/* Solid copy, revealed through the clip */}
      <span
        className="svu-outline-word__fill"
        aria-hidden="true"
        onTransitionEnd={(e) => {
          // Once the drain has finished, reset to the left-anchored empty
          // state so the next hover sweeps in from the side again.
          if (e.propertyName === "clip-path" && phase === "emptying") {
            setPhase("idle");
          }
        }}
      >
        {children}
      </span>
    </span>
  );
}
