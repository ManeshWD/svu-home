"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

/** Matches the .svu-sheet transition in globals.css */
const SHEET_MS = 380;

/**
 * Native-style bottom sheet: slides up over a dimmed backdrop, drag the
 * handle/header down (or tap outside, or Escape) to dismiss.
 *
 * Built for 60fps on phones: the slide and fade are CSS transitions on
 * transform/opacity only (composited off the main thread), the backdrop has
 * no blur, and dragging writes the transform straight to the element
 * instead of re-rendering.
 */
export default function BottomSheet({ open, onClose, title, subtitle, children, footer }: BottomSheetProps) {
  // mounted: in the DOM (open, or playing its exit); shown: at its resting place
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Follow `open` during render (no extra effect pass): mount on open,
  // start sliding out on close
  if (open && !mounted) setMounted(true);
  if (!open && shown) setShown(false);

  useEffect(() => {
    if (open) {
      // Two frames: the first paints it parked off-screen, the second
      // starts the transition from there
      let raf2 = 0;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setShown(true));
      });
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
      };
    }
    // Unmount once the slide-out has played
    const t = setTimeout(() => setMounted(false), SHEET_MS);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  /* ---------------- Drag to dismiss (no React renders while dragging) ---------------- */
  const drag = useRef({ active: false, startY: 0, lastY: 0, lastT: 0, velocity: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { active: true, startY: e.clientY, lastY: e.clientY, lastT: e.timeStamp, velocity: 0 };
    sheet.style.transition = "none";
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const sheet = sheetRef.current;
    if (!d.active || !sheet) return;
    const dt = e.timeStamp - d.lastT;
    if (dt > 0) d.velocity = (e.clientY - d.lastY) / dt;
    d.lastY = e.clientY;
    d.lastT = e.timeStamp;
    const dy = e.clientY - d.startY;
    // Free downwards, a little rubber-band resistance upwards
    const offset = dy >= 0 ? dy : -Math.sqrt(-dy) * 2;
    sheet.style.transform = `translate3d(0, ${offset}px, 0)`;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const sheet = sheetRef.current;
    if (!d.active || !sheet) return;
    d.active = false;
    const dy = e.clientY - d.startY;
    // Hand back to the CSS transition: it eases from where the finger left
    // off, either home or out (via `shown` → false)
    sheet.style.transition = "";
    sheet.style.transform = "";
    if (dy > 110 || d.velocity > 0.6) onClose();
  };

  if (!mounted) return null;

  return (
    <>
      <div
        className={`svu-sheet-backdrop fixed inset-0 z-[60] bg-[#000A24]/60 ${shown ? "is-shown" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`svu-sheet fixed inset-x-0 bottom-0 z-[61] flex max-h-[85svh] flex-col rounded-t-[28px] bg-[#FFF9EE] text-[#0C1230] shadow-[0_-12px_40px_rgba(0,21,70,0.25)] ${
          shown ? "is-shown" : ""
        }`}
      >
        {/* Drag handle + header */}
        <div
          className="shrink-0 cursor-grab touch-none px-5 pb-3 pt-2.5 active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <span className="mx-auto mb-3 block h-1.5 w-10 rounded-full bg-[#001546]/20" aria-hidden="true" />
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-bold leading-tight text-[#001546]">{title}</h2>
              {subtitle && <p className="mt-0.5 text-[13px] text-[#5A6382]">{subtitle}</p>}
            </div>
            <button
              type="button"
              onClick={onClose}
              onPointerDown={(e) => e.stopPropagation()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#001546]/[0.07] text-[#001546] active:scale-95"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-4">{children}</div>

        {footer && (
          <div className="shrink-0 border-t border-[#001546]/10 px-5 pb-[calc(env(safe-area-inset-bottom)+14px)] pt-3">
            {footer}
          </div>
        )}
        {!footer && <div className="shrink-0 pb-[env(safe-area-inset-bottom)]" />}
      </div>
    </>
  );
}
