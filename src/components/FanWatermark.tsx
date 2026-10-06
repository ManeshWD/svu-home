import React from "react";

type FanWatermarkProps = {
  /** Which edge the fan is pinned to — only the inner half shows */
  side?: "left" | "right";
  /** "light" = pale fan for dark sections, "dark" = navy fan for light sections */
  tone?: "light" | "dark";
  /** Extra classes, e.g. `svu-fan-watermark--behind` to sit under content */
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Half-visible spinning fan watermark. Drop it inside any `relative` +
 * overflow-clipped container; it centres on the chosen edge so the outer
 * half is cut off, and spins continuously like a fan.
 */
export function FanWatermark({ side = "left", tone = "dark", className = "", style }: FanWatermarkProps) {
  return (
    <div
      aria-hidden="true"
      className={`svu-fan-watermark svu-fan-watermark--${side} svu-fan-watermark--${tone} ${className}`}
      style={style}
    >
      <svg viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M480 210H312.4L430.9 91.5l-42.4-42.4L270 167.6V0h-60v167.6L91.5 49.1 49.1 91.5 167.6 210H0v60h167.6L49.1 388.5l42.4 42.4L210 312.4V480h60V312.4l118.5 118.5 42.4-42.4L312.4 270H480v-60z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

/** Wraps a section so the watermark is clipped to its bounds. */
export default function WithFanWatermark({
  children,
  ...props
}: FanWatermarkProps & { children: React.ReactNode }) {
  return (
    <div className="svu-fan-section">
      {children}
      <FanWatermark {...props} />
    </div>
  );
}
