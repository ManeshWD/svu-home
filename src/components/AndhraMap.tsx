"use client";

import { useEffect, useRef, useState } from "react";
import ap from "@/data/andhraDistricts.json";

// Full google.com/maps place URL — the maps.app.goo.gl short link is blocked
// on some networks (ERR_CONNECTION_RESET), this one is not
export const SVU_MAPS_URL =
  "https://www.google.com/maps/place/Sri+Venkateswara+University/@13.6263024,79.3986083,17z/data=!3m1!4b1!4m6!3m5!1s0x3a4d4b3cad0b13e3:0xb9635a2a9d920c7d!8m2!3d13.6263024!4d79.3986083!16zL20vMGNkdGts";

interface AndhraMapProps {
  visible: boolean;
  /** Move focus to "Back to globe" on reveal (the map was opened by keyboard) */
  focusOnShow: boolean;
  /** `viaKeyboard` lets the globe restore focus only for keyboard users */
  onBack: (viaKeyboard: boolean) => void;
}

/**
 * Andhra Pradesh district map (26 districts, 2022 boundaries). Districts
 * reveal their name on hover; the blinking SVU marker opens Google Maps.
 * Shown in place of the globe once the zoom-in finishes.
 */
export default function AndhraMap({ visible, focusOnShow, onBack }: AndhraMapProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const tipRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  // Marker animations start only once the reveal has finished, so they never
  // force the map layer to repaint while it is still scaling in
  const [settled, setSettled] = useState(false);
  const backRef = useRef<HTMLButtonElement | null>(null);

  // The globe's explore control unmounts on reveal — keep keyboard focus in the card
  useEffect(() => {
    if (visible && focusOnShow) backRef.current?.focus({ preventScroll: true });
  }, [visible, focusOnShow]);

  // Tooltip follows the pointer via a direct style write — no re-render per move
  const moveTip = (e: React.PointerEvent) => {
    const wrap = wrapRef.current;
    const tip = tipRef.current;
    if (!wrap || !tip) return;
    const r = wrap.getBoundingClientRect();
    tip.style.transform = `translate3d(${e.clientX - r.left}px, ${e.clientY - r.top - 14}px, 0) translate(-50%, -100%)`;
  };

  return (
    <div
      ref={wrapRef}
      className={`svu-ap-map ${visible ? "is-visible" : ""} ${visible && settled ? "is-settled" : ""}`}
      aria-hidden={!visible}
      onPointerMove={moveTip}
      onTransitionEnd={(e) => {
        if (e.target === e.currentTarget && e.propertyName === "transform") setSettled(visible);
      }}
    >
      {/* Header chip + back control */}
      <div className="absolute left-3 top-3 z-20 flex items-center gap-2 sm:left-5 sm:top-5">
        <button
          ref={backRef}
          type="button"
          onClick={(e) => {
            const viaKeyboard = e.detail === 0;
            // Don't leave pointer focus parked inside the now-hidden map
            if (!viaKeyboard) e.currentTarget.blur();
            onBack(viaKeyboard);
          }}
          tabIndex={visible ? 0 : -1}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#001546]/85 px-3 py-1.5 text-[11px] font-semibold text-[#FFE9C2] backdrop-blur-sm transition-colors hover:border-[#FFB21A]/70 hover:text-white"
        >
          <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden="true">
            <path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to globe
        </button>
        <span className="hidden rounded-full border border-[#23B5E9]/30 bg-[#001546]/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#23B5E9] sm:inline-block">
          Andhra Pradesh · {ap.districts.length} districts
        </span>
      </div>

      <svg
        viewBox={`0 0 ${ap.width} ${ap.height}`}
        preserveAspectRatio="xMidYMid meet"
        className="svu-ap-svg"
        role="img"
        aria-label="Map of Andhra Pradesh districts with Sri Venkateswara University marked in Tirupati"
      >
        <g className="svu-ap-districts" onPointerLeave={() => setHovered(null)}>
          {ap.districts.map((d) => (
            <path
              key={d.name}
              d={d.d}
              className={`svu-ap-district ${d.name === ap.svu.district ? "is-home" : ""}`}
              onPointerEnter={() => setHovered(d.name)}
            >
              <title>{d.name}</title>
            </path>
          ))}
        </g>

        {/* SVU — blinking marker linked to the exact Google Maps location */}
        <a
          href={SVU_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="svu-ap-marker"
          tabIndex={visible ? 0 : -1}
          aria-label="Open Sri Venkateswara University, Tirupati in Google Maps"
          onPointerEnter={() => setHovered(null)}
        >
          <g transform={`translate(${ap.svu.x} ${ap.svu.y})`}>
            <circle className="svu-ap-ping" r="14" />
            <circle className="svu-ap-ping svu-ap-ping--late" r="14" />
            <circle className="svu-ap-hit" r="34" />
            <circle className="svu-ap-core" r="9" />
            <circle r="3.5" fill="#FFF9EE" />

            <g className="svu-ap-label" transform="translate(26 -58)">
              <rect width="300" height="64" rx="14" />
              <text x="18" y="27" className="svu-ap-label-title">Sri Venkateswara University</text>
              <text x="18" y="50" className="svu-ap-label-sub">Tirupati · Open in Google Maps ↗</text>
            </g>
          </g>
        </a>
      </svg>

      {/* Hover tooltip */}
      <div
        ref={tipRef}
        className={`svu-ap-tip ${hovered ? "is-on" : ""}`}
        role="status"
        aria-live="polite"
      >
        {hovered && (
          <>
            <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-[#23B5E9]">
              District
            </span>
            <span className="block text-[13px] font-bold text-white">{hovered}</span>
          </>
        )}
      </div>
    </div>
  );
}
