"use client";

import React, { useEffect, useRef } from "react";

/**
 * Green gradient trapped inside the "Excellence Since 1954" banner.
 *
 * Each blob is a slow-moving body with its own velocity. It travels in a
 * straight line until its centre reaches an edge of the card, then reflects
 * off that wall and squashes briefly against it — so the gradient reads as
 * something pacing inside the card, hunting for a way out.
 *
 * On top of the physics, the whole layer drifts a little toward the pointer
 * (per-blob parallax depth) so the glow still answers the cursor.
 */

type BlobConfig = {
  className: string;
  /** diameter in px at full card width, scaled down on smaller cards */
  size: number;
  /** starting position as a fraction of the card box */
  x: number;
  y: number;
  /** velocity in px per second — deliberately tiny */
  vx: number;
  vy: number;
  /** how far this blob travels toward the pointer (0 = anchored) */
  depth: number;
};

const BLOBS: BlobConfig[] = [
  { className: "svu-glow-blob--a", size: 560, x: 0.72, y: 0.62, vx: -11, vy: -7, depth: 0.12 },
  { className: "svu-glow-blob--b", size: 460, x: 0.24, y: 0.3, vx: 8, vy: 9.5, depth: 0.2 },
  { className: "svu-glow-blob--c", size: 400, x: 0.52, y: 0.78, vx: 9.5, vy: -6, depth: 0.16 },
  { className: "svu-glow-blob--d", size: 300, x: 0.86, y: 0.2, vx: -7, vy: 10.5, depth: 0.3 },
];

export default function HeritageGlow() {
  const layerRef = useRef<HTMLDivElement | null>(null);
  const blobRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const layer = layerRef.current;
    const card = layer?.parentElement;
    if (!layer || !card) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let width = card.clientWidth;
    let height = card.clientHeight;

    // Live state per blob, seeded from the config
    const bodies = BLOBS.map((cfg) => ({
      cfg,
      x: cfg.x * width,
      y: cfg.y * height,
      vx: cfg.vx,
      vy: cfg.vy,
      /** squash amount on each axis, decays back to 0 after an impact */
      squashX: 0,
      squashY: 0,
    }));

    // Pointer offset from the card centre, eased toward the raw value
    let curX = 0;
    let curY = 0;
    let targetX = 0;
    let targetY = 0;

    let frame = 0;
    let last = 0;
    let running = false;

    const step = (now: number) => {
      // Clamp dt so a backgrounded tab doesn't teleport everything on return
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      curX += (targetX - curX) * 0.07;
      curY += (targetY - curY) * 0.07;

      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        const el = blobRefs.current[i];
        if (!el) continue;

        b.x += b.vx * dt;
        b.y += b.vy * dt;

        // Reflect off the walls, squashing against the one it hit
        if (b.x <= 0) {
          b.x = 0;
          b.vx = Math.abs(b.vx);
          b.squashX = 1;
        } else if (b.x >= width) {
          b.x = width;
          b.vx = -Math.abs(b.vx);
          b.squashX = 1;
        }
        if (b.y <= 0) {
          b.y = 0;
          b.vy = Math.abs(b.vy);
          b.squashY = 1;
        } else if (b.y >= height) {
          b.y = height;
          b.vy = -Math.abs(b.vy);
          b.squashY = 1;
        }

        b.squashX *= 0.975;
        b.squashY *= 0.975;

        // Compress along the impact axis, bulge across it
        const sx = 1 - b.squashX * 0.16 + b.squashY * 0.12;
        const sy = 1 - b.squashY * 0.16 + b.squashX * 0.12;

        const px = b.x + curX * b.cfg.depth;
        const py = b.y + curY * b.cfg.depth;

        el.style.transform = `translate3d(${px.toFixed(1)}px, ${py.toFixed(
          1
        )}px, 0) translate(-50%, -50%) scale(${sx.toFixed(3)}, ${sy.toFixed(3)})`;
      }

      frame = requestAnimationFrame(step);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(step);
    };

    const stop = () => {
      running = false;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    // Rescale positions so blobs stay proportionally placed after a resize
    const resize = () => {
      const nextW = card.clientWidth;
      const nextH = card.clientHeight;
      if (!nextW || !nextH) return;
      const ratioX = width ? nextW / width : 1;
      const ratioY = height ? nextH / height : 1;
      for (const b of bodies) {
        b.x *= ratioX;
        b.y *= ratioY;
      }
      width = nextW;
      height = nextH;

      // Blobs shrink on narrow cards so they still read as a gradient
      const scale = Math.max(0.5, Math.min(1, nextW / 1100));
      blobRefs.current.forEach((el, i) => {
        if (!el) return;
        const size = BLOBS[i].size * scale;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        // Hand positioning over from the SSR left/top seed to the transform
        el.style.left = "0px";
        el.style.top = "0px";
      });
    };

    const handleMove = (e: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      targetX = e.clientX - rect.left - rect.width / 2;
      targetY = e.clientY - rect.top - rect.height / 2;
    };

    const handleLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    // Only animate while the card is actually on screen
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) start();
        else stop();
      },
      { threshold: 0 }
    );

    const ro = new ResizeObserver(resize);

    resize();
    io.observe(card);
    ro.observe(card);
    card.addEventListener("pointermove", handleMove);
    card.addEventListener("pointerleave", handleLeave);
    card.addEventListener("pointercancel", handleLeave);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      card.removeEventListener("pointermove", handleMove);
      card.removeEventListener("pointerleave", handleLeave);
      card.removeEventListener("pointercancel", handleLeave);
    };
  }, []);

  return (
    <div ref={layerRef} className="svu-glow-layer" aria-hidden="true">
      {BLOBS.map((blob, i) => (
        <span
          key={blob.className}
          ref={(el) => {
            blobRefs.current[i] = el;
          }}
          className={`svu-glow-blob ${blob.className}`}
          style={{
            width: blob.size,
            height: blob.size,
            // Seed for the pre-hydration paint; the effect swaps these for
            // transform-based positioning on mount.
            left: `${blob.x * 100}%`,
            top: `${blob.y * 100}%`,
          }}
        />
      ))}
    </div>
  );
}
