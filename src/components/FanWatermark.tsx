import React from "react";

type FanWatermarkProps = {
  /** Which edge the fan is pinned to — only the inner half shows */
  side?: "left" | "right";
  /** "light" = pale watermark for dark sections, "dark" = navy watermark for light sections */
  tone?: "light" | "dark";
  /** Explicit custom color override based on section background */
  color?: string;
  /** Extra classes, e.g. `svu-fan-watermark--behind` to sit under content */
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Half-visible spinning sacred emblem watermark. Drop it inside any `relative` +
 * overflow-clipped container; it centres on the chosen edge so the outer
 * half is cut off, and spins continuously.
 */
export function FanWatermark({
  side = "left",
  tone = "dark",
  color,
  className = "",
  style,
}: FanWatermarkProps) {
  const mergedStyle: React.CSSProperties = {
    ...style,
    ...(color ? { color } : {}),
  };

  return (
    <div
      aria-hidden="true"
      className={`svu-fan-watermark svu-fan-watermark--${side} svu-fan-watermark--${tone} ${className}`}
      style={mergedStyle}
    >
      <div className="svu-fan-watermark-art" />
    </div>
  );
}

/**
 * Wraps a section so the watermark is clipped to its bounds. With
 * `mobilePair`, phones/tablets get a second fan on the opposite side: the
 * first moves to the section's upper part, the second to its lower part.
 */
export default function WithFanWatermark({
  children,
  mobilePair = false,
  ...props
}: FanWatermarkProps & { children: React.ReactNode; mobilePair?: boolean }) {
  const { side = "left", className = "" } = props;
  return (
    <div className="svu-fan-section">
      {children}
      <FanWatermark {...props} className={mobilePair ? `${className} svu-fan-watermark--m-upper` : className} />
      {mobilePair && (
        <FanWatermark
          {...props}
          side={side === "left" ? "right" : "left"}
          className={`${className} svu-fan-watermark--m-lower svu-fan-watermark--mobile-only`}
        />
      )}
    </div>
  );
}
