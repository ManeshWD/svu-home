"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import PixelButton from "./PixelButton";
import FlipDate from "./FlipDate";
import { noticeCategories } from "@/data/notices";

const categories = noticeCategories;

const ease = [0.22, 1, 0.36, 1] as const;

export default function Notifications() {
  const [index, setIndex] = useState(0);
  // +1 = moving forward (list slides in from the right), -1 = backward
  const [direction, setDirection] = useState(1);
  const current = categories[index];

  // Autoplay: the active tab's underline fills like a loader, then advances.
  // Pauses only while a notice is hovered (or keyboard-focused) so it can be
  // read; also waits while the section is off-screen. Off for reduced motion.
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });
  const reduceMotion = useReducedMotion();
  const [itemActive, setItemActive] = useState(false);
  // Touch screens can't hover to pause it, so autoplay (and the loader) only
  // runs on hover-capable devices — on mobile the tabs are static
  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  // Date counters replay every time the notice list scrolls into view,
  // from either direction
  const panelRef = useRef<HTMLDivElement>(null);
  const panelInView = useInView(panelRef, { amount: 0.6 });
  const [{ datePlay, wasInView }, setDateState] = useState({ datePlay: 0, wasInView: false });
  if (panelInView !== wasInView) {
    setDateState((s) => ({ datePlay: panelInView ? s.datePlay + 1 : s.datePlay, wasInView: panelInView }));
  }

  const autoplay = !reduceMotion && canHover;
  const running = autoplay && inView && !itemActive;

  const go = (next: number) => {
    const n = (next + categories.length) % categories.length;
    setDirection(next > index ? 1 : -1);
    setIndex(n);
    // The hovered row is replaced by the new list, which never fires mouseleave
    setItemActive(false);
  };

  // Category arrows — shown in the eyebrow row on mobile (so long headings
  // get the full width) and beside the heading from sm up
  const arrows = (className: string) => (
    <div className={`flex shrink-0 items-center gap-3 ${className}`}>
      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label="Previous category"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFB21A] text-[#001546] shadow-[0_6px_20px_-6px_rgba(255,178,26,0.6)] transition-all hover:bg-[#FFC94D] active:scale-95"
      >
        <ArrowLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label="Next category"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFB21A] text-[#001546] shadow-[0_6px_20px_-6px_rgba(255,178,26,0.6)] transition-all hover:bg-[#FFC94D] active:scale-95"
      >
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="notifications"
      className="relative bg-[#001546] px-6 py-[clamp(3.5rem,8vh,6rem)] text-white lg:px-12 lg:py-[clamp(2rem,8vh,6rem)]"
      aria-labelledby="notifications-heading"
    >
      {/* Vertical margin label */}
      <span
        className="pointer-events-none absolute bottom-12 left-5 hidden origin-bottom-left -rotate-90 translate-x-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30 lg:block"
        aria-hidden="true"
      >
        Notices
      </span>

      <MotionConfig reducedMotion="user">
        <div className="relative z-10 mx-auto max-w-5xl">
          {/* Eyebrow (+ arrows on mobile) */}
          <div className="flex items-center justify-between gap-4">
            <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[#23B5E9]">
              Notifications
            </span>
            {arrows("sm:hidden")}
          </div>

          {/* Title row: category heading + arrows (arrows sit in the eyebrow row on mobile) */}
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6 lg:mt-[calc(16*var(--dk-space))]">
            <div className="relative min-h-[1.2em] overflow-hidden font-serif text-[2rem] sm:text-[clamp(2.25rem,5.5vw,3.75rem)] lg:text-(length:--dk-h2-xl) font-bold leading-[1.1] tracking-tight">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.h2
                  key={current.key}
                  id="notifications-heading"
                  custom={direction}
                  initial={{ y: "60%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-60%", opacity: 0 }}
                  transition={{ duration: 0.4, ease }}
                  className="font-serif"
                >
                  {current.label}
                </motion.h2>
              </AnimatePresence>
            </div>

            {arrows("hidden sm:flex")}
          </div>

          {/* Category tabs + description */}
          <div className="mt-5 flex flex-wrap items-start justify-between gap-x-10 gap-y-4 lg:mt-[calc(20*var(--dk-space))]">
            <div className="max-w-xl">
              <div role="tablist" aria-label="Notification categories" className="flex flex-wrap gap-x-5 gap-y-2">
                {categories.map((c, i) => (
                  <button
                    key={c.key}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-controls="notifications-panel"
                    onClick={() => go(i)}
                    className={`relative pb-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                      i === index ? "text-[#FFB21A]" : "text-white/50 hover:text-white"
                    }`}
                  >
                    {c.label}
                    {i === index && (
                      <>
                        {/* Faint track + loader that grows from a dot to full
                            width, then advances to the next category */}
                        <span className="absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-white/10" aria-hidden="true" />
                        {autoplay ? (
                          <span
                            key={current.key}
                            className="svu-notice-progress"
                            style={{ animationPlayState: running ? "running" : "paused" }}
                            onAnimationEnd={() => go(index + 1)}
                            aria-hidden="true"
                          />
                        ) : (
                          <span className="absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-[#FFB21A]" aria-hidden="true" />
                        )}
                      </>
                    )}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#FFE9C2]/70 lg:mt-[calc(16*var(--dk-space))]">{current.description}</p>
            </div>
            <span className="pt-1 text-sm text-white/40">{current.range}</span>
          </div>

          {/* Notice list */}
          <div ref={panelRef} id="notifications-panel" role="tabpanel" className="relative mt-10 lg:mt-[calc(40*var(--dk-space))]">
            {/* Frosted strip behind the date column — ends where the list's
                dividers end, feathered on the left/top/bottom so it melts into
                the list, blurring the fan behind it */}
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-36 sm:w-60 bg-[#001546]/15 backdrop-blur-md [mask-image:linear-gradient(to_left,#000_70%,transparent),linear-gradient(to_bottom,transparent,#000_80px,#000_calc(100%-80px),transparent)] [mask-composite:intersect]"
              aria-hidden="true"
            />
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.ol
                key={current.key}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ x: d * 40, opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (d: number) => ({ x: d * -40, opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease }}
                className="relative border-t border-white/10"
              >
                {current.items.map((item, i) => (
                  <li key={item.title} className="border-b border-white/10">
                    <a
                      href={item.href}
                      onMouseEnter={() => setItemActive(true)}
                      onMouseLeave={() => setItemActive(false)}
                      onFocus={() => setItemActive(true)}
                      onBlur={() => setItemActive(false)}
                      className="group block py-5 pr-2 sm:grid sm:grid-cols-[4rem_1fr_auto] sm:items-start sm:gap-x-6 sm:py-6 sm:pr-12 lg:py-[calc(24*var(--dk-space))]"
                    >
                      {/* Mobile Row 1: Number and Date on one line */}
                      <div className="flex items-center justify-between sm:contents">
                        <span className="font-mono text-sm tabular-nums text-white/35 sm:pt-0.5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <time className="whitespace-nowrap text-xs font-mono tabular-nums text-white/45 sm:hidden">
                          {item.date}
                        </time>
                      </div>

                      {/* Mobile Row 2 / Desktop Col 2: Title and Description */}
                      <div className="mt-2 sm:mt-0">
                        <span className="flex items-center gap-2 text-[15px] font-semibold text-white transition-colors group-hover:text-[#FFB21A] sm:text-base">
                          {item.title}
                          <ArrowUpRight className="h-4 w-4 shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                        </span>
                        <span className="mt-1.5 block text-sm leading-relaxed text-white/55">
                          {item.note}
                        </span>
                      </div>

                      {/* Desktop Col 3: Date */}
                      <div className="hidden sm:block">
                        <FlipDate date={item.date} play={datePlay} delay={i * 120} />
                      </div>
                    </a>
                  </li>
                ))}
              </motion.ol>
            </AnimatePresence>
          </div>

          <div className="mt-8 lg:mt-[calc(32*var(--dk-space))]">
            <PixelButton
              href={current.all.href}
              className="px-6 py-3 text-xs sm:text-sm font-bold tracking-wide"
              background="#FFB21A"
              pixelColor="#001546"
              fontDefaultColor="#001546"
              fontHoverColor="#FFB21A"
              pixelSize={14}
              staggerStep={0.02}
              reveal="random"
            >
              <span>{current.all.label}</span>
              <ArrowRight className="h-4 w-4" />
            </PixelButton>
          </div>
        </div>
      </MotionConfig>
    </section>
  );
}
