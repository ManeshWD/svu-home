"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

const FALLBACK_WIDTH = 190;
const FALLBACK_HEIGHT = 48;
const MAX_CELLS = 1600;

/**
 * Deterministic hash matching the Framer Pixel Button Pro implementation.
 */
function hashToUnit(row: number, col: number, rows: number, cols: number): number {
  const seed =
    ((row + 1) * 73856093) ^
    ((col + 1) * 19349663) ^
    (rows * 83492791) ^
    (cols * 2971215073);
  const hashed = Math.imul(seed ^ (seed >>> 16), 2246822507);
  const normalized = (hashed >>> 0) / 4294967295;
  return Math.max(0, Math.min(1, normalized));
}

export interface PixelButtonProps {
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  className?: string;
  /** Pixel cell size in px (defaults to 14) */
  pixelSize?: number;
  /** Stagger delay between pixel pop-ins (defaults to 0.02s) */
  staggerStep?: number;
  /** Color of the pixel blocks revealed on hover */
  pixelColor?: string;
  /** Base background color of the button */
  background?: string;
  /** Text color in default state */
  fontDefaultColor?: string;
  /** Text color in hover state */
  fontHoverColor?: string;
  /** Reveal algorithm ("random" is the first variant in Pixel Button Pro) */
  reveal?: "random" | "diagonalTopLeft" | "centerOut" | "topToBottom" | "leftToRight";
}

export default function PixelButton({
  href,
  onClick,
  target,
  rel,
  children,
  className = "",
  pixelSize = 14,
  staggerStep = 0.02,
  pixelColor = "#001546",
  background = "#FFB21A",
  fontDefaultColor = "#001546",
  fontHoverColor = "#FFB21A",
  reveal = "random",
}: PixelButtonProps) {
  const containerRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);
  // The pixel grid is only built on first hover — 14 buttons × 60+ cells
  // rendered up front kept ~900 extra elements on the page for nothing
  const [armed, setArmed] = useState(false);
  const enter = useCallback(() => {
    setArmed(true);
    setHovered(true);
  }, []);
  const [size, setSize] = useState({ width: FALLBACK_WIDTH, height: FALLBACK_HEIGHT });

  // Native event listeners to ensure synthetic event compatibility
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleEnter = enter;
    const handleLeave = () => setHovered(false);

    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);
    el.addEventListener("pointerenter", handleEnter);
    el.addEventListener("pointerleave", handleLeave);

    return () => {
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
      el.removeEventListener("pointerenter", handleEnter);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, [enter]);

  // Measure button container size for pixel grid tiling
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      const w = rect.width > 0 ? rect.width : FALLBACK_WIDTH;
      const h = rect.height > 0 ? rect.height : FALLBACK_HEIGHT;
      setSize((prev) => (prev.width === w && prev.height === h ? prev : { width: w, height: h }));
    };

    updateSize();

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(updateSize);
      observer.observe(el);
      return () => observer.disconnect();
    }

    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Compute rows, cols, and diagonal metrics
  const metrics = useMemo(() => {
    const width = size.width > 0 ? size.width : FALLBACK_WIDTH;
    const height = size.height > 0 ? size.height : FALLBACK_HEIGHT;
    const safePixelSize = Math.max(1, pixelSize);

    const cols = Math.max(1, Math.ceil(width / safePixelSize));
    const computedCell = width / cols;
    const cellSize = Math.max(1, computedCell);
    const rows = Math.max(1, Math.ceil(height / cellSize));

    const effectiveTotal = cols * rows;
    if (effectiveTotal > MAX_CELLS) {
      const scale = Math.sqrt(effectiveTotal / MAX_CELLS);
      const scaledCols = Math.max(1, Math.ceil(cols / scale));
      const scaledRows = Math.max(1, Math.ceil(rows / scale));
      return { cols: scaledCols, rows: scaledRows, maxDiagonal: Math.max(1, scaledCols + scaledRows - 2) };
    }

    const maxDiagonal = Math.max(1, cols + rows - 2);
    return { cols, rows, maxDiagonal };
  }, [size.width, size.height, pixelSize]);

  // Compute individual cell delays based on the chosen reveal pattern
  const cells = useMemo(() => {
    const list: Array<{ key: string; delay: number }> = [];
    for (let r = 0; r < metrics.rows; r++) {
      for (let c = 0; c < metrics.cols; c++) {
        let diagonal = 0;
        switch (reveal) {
          case "random":
            diagonal = hashToUnit(r, c, metrics.rows, metrics.cols) * metrics.maxDiagonal;
            break;
          case "diagonalTopLeft":
            diagonal = r + c;
            break;
          case "centerOut": {
            const cr = (metrics.rows - 1) / 2;
            const cc = (metrics.cols - 1) / 2;
            diagonal = Math.sqrt(Math.pow(r - cr, 2) + Math.pow(c - cc, 2));
            break;
          }
          case "topToBottom":
            diagonal = r;
            break;
          case "leftToRight":
            diagonal = c;
            break;
        }
        list.push({
          key: `${r}-${c}`,
          delay: diagonal * staggerStep,
        });
      }
    }
    return list;
  }, [metrics, staggerStep, reveal]);

  const onMouseEnter = enter;
  // Time for the last cell to finish popping in
  const revealTime = Math.max(0, ...cells.map((c) => c.delay)) + 0.22;
  const onMouseLeave = useCallback(() => setHovered(false), []);

  const content = (
    <>
      {/* Background Pixel Surface (Pill Clipped) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-full"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${metrics.cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${metrics.rows}, minmax(0, 1fr))`,
          // Once every cell has filled in, the surface itself turns the pixel
          // colour — otherwise its face colour bleeds through the cells'
          // anti-aliased edges along the curve as a faint ring
          backgroundColor: hovered ? pixelColor : background,
          transition: `background-color 0.12s linear ${hovered ? revealTime : 0}s`,
        }}
        aria-hidden="true"
      >
        {armed && cells.map((cell) => (
          <motion.div
            key={cell.key}
            // Cells mount on first hover, so start them hidden and animate in
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: hovered ? 1 : 0,
              scale: hovered ? 1 : 0.6,
            }}
            transition={{
              type: "tween",
              ease: [0.44, 0, 0.56, 1],
              duration: 0.22,
              delay: cell.delay,
            }}
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: pixelColor,
              boxShadow: `0 0 0 1px ${pixelColor}`,
              transformOrigin: "center",
              // No will-change: on ~60 cells per button it pinned hundreds of
              // GPU layers permanently. Motion promotes cells while animating.
            }}
          />
        ))}
      </div>

      {/* Button Label (Above Pixel Canvas) */}
      <span
        className="relative z-10 flex items-center justify-center gap-2 select-none pointer-events-none transition-colors duration-200"
        style={{
          color: hovered ? fontHoverColor : fontDefaultColor,
        }}
      >
        {children}
      </span>
    </>
  );

  const sharedClasses = `relative inline-flex items-center justify-center overflow-hidden cursor-pointer select-none rounded-full shadow-md hover:shadow-xl active:scale-95 transition-all duration-200 ${className}`;

  if (href) {
    if (href.startsWith("http") || target === "_blank") {
      return (
        <a
          ref={containerRef as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className={sharedClasses}
        >
          {content}
        </a>
      );
    }
    return (
      <Link
        ref={containerRef as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={sharedClasses}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={containerRef as React.Ref<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={sharedClasses}
    >
      {content}
    </button>
  );
}
