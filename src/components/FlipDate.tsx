"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Flip length for the first and last tick — each flip a little slower than
// the one before, so the card settles onto the real value
const FIRST_FLIP_MS = 300;
const LAST_FLIP_MS = 560;

const pad = (n: number, len: number) => String(n).padStart(len, "0");

/* Ticks a card `flips` values up to `end`, wrapping within min..max (so a
   day of 02 starts from 29). Re-runs whenever `play` changes (0 = idle). */
function useFlipTicks(end: number, flips: number, min: number, max: number, play: number, delay: number) {
  const reduceMotion = useReducedMotion();
  const span = max - min + 1;
  const at = (k: number) => min + ((((end - flips + k - min) % span) + span) % span);
  const [state, setState] = useState({ value: at(0), from: null as number | null, dur: 0, step: 0 });
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (!play) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));
    const wrap = (k: number) => min + ((((end - flips + k - min) % span) + span) % span);
    if (reduceMotion) {
      later(() => setState((s) => ({ value: end, from: null, dur: 0, step: s.step + 1 })), 0);
      return () => timers.current.forEach(clearTimeout);
    }
    later(() => setState((s) => ({ value: wrap(0), from: null, dur: 0, step: s.step + 1 })), 0);
    let t = delay;
    for (let k = 1; k <= flips; k++) {
      const dur = FIRST_FLIP_MS + ((LAST_FLIP_MS - FIRST_FLIP_MS) * (k - 1)) / Math.max(flips - 1, 1);
      later(() => setState((s) => ({ value: wrap(k), from: wrap(k - 1), dur, step: s.step + 1 })), t);
      t += dur;
    }
    return () => timers.current.forEach(clearTimeout);
  }, [play, end, flips, min, max, span, delay, reduceMotion]);

  const settle = () => setState((s) => (s.value === end ? { ...s, from: null } : s));
  return { ...state, settle };
}

type CardProps = { end: number; flips: number; min: number; max: number; digits: number; play: number; delay: number };

/* One split-flap card. At rest both halves show `value`; while `from` is set
   the top flap falls from `from` to `value`, then the bottom flap lands. */
function FlipCard({ end, flips, min, max, digits, play, delay }: CardProps) {
  const { value, from, dur, step, settle } = useFlipTicks(end, flips, min, max, play, delay);
  const v = pad(value, digits);
  const f = from === null ? null : pad(from, digits);
  return (
    <span
      className="svu-flip-card"
      style={{
        width: `${digits * 0.95 + 0.7}rem`,
        ["--flip-top-dur" as string]: `${dur * 0.45}ms`,
        ["--flip-bottom-dur" as string]: `${dur * 0.55}ms`,
      }}
      aria-hidden="true"
    >
      <span className="svu-flip-half svu-flip-top"><span className="svu-flip-digit">{v}</span></span>
      <span className="svu-flip-half svu-flip-bottom"><span className="svu-flip-digit">{f ?? v}</span></span>
      {f !== null && (
        <span key={step} className="contents">
          <span className="svu-flip-half svu-flip-top svu-flip-flap-top"><span className="svu-flip-digit">{f}</span></span>
          <span className="svu-flip-half svu-flip-bottom svu-flip-flap-bottom" onAnimationEnd={settle}>
            <span className="svu-flip-digit">{v}</span>
          </span>
        </span>
      )}
    </span>
  );
}

/* Flip-clock date for the notice list: day · month · year cards that each
   tick over a few values onto the real date every time `play` changes.
   Expects dates formatted "DD Mon YYYY". */
export default function FlipDate({ date, play, delay = 0 }: { date: string; play: number; delay?: number }) {
  const [d, mon, y] = date.split(" ");
  const day = Number(d);
  const month = MONTHS.indexOf(mon) + 1;
  const year = Number(y);

  if (!day || !month || !year) return <time>{date}</time>;

  return (
    <time dateTime={`${year}-${pad(month, 2)}-${pad(day, 2)}`} aria-label={date} className="svu-flip-date">
      <FlipCard end={day} flips={3} min={1} max={31} digits={2} play={play} delay={delay} />
      <FlipCard end={month} flips={3} min={1} max={12} digits={2} play={play} delay={delay + 120} />
      <FlipCard end={year} flips={3} min={0} max={9999} digits={4} play={play} delay={delay + 240} />
    </time>
  );
}
