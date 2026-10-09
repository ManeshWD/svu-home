"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Landmark, Camera } from "lucide-react";
import PixelButton from "./PixelButton";

type College = {
  year: string;
  short: string;
  name: string;
  accent: string;
  headline: string;
  src: string;
  paintingSrc: string;
  alt: string;
  tag: string;
  meta: string;
  body: string;
  href: string;
  tone: "dark" | "sand";
};

const colleges: College[] = [
  {
    year: "1954",
    short: "Arts",
    name: "College of",
    accent: "Arts & Humanities",
    headline: "SVU Enters The Academic World",
    src: "/college%20of%20arts.webp",
    paintingSrc: "/arts_college_painting.webp",
    alt: "SVU College of Arts Building",
    tag: "Humanities",
    meta: "PG · Ph.D. · Est. 1954",
    body:
      "Languages, literature, social sciences and philosophy founded alongside the university, establishing Tirupati's oldest scholarly heritage.",
    href: "/colleges/arts",
    tone: "dark",
  },
  {
    year: "1956",
    short: "Sciences",
    name: "College of",
    accent: "Sciences & Research",
    headline: "Expanding Scientific Frontiers",
    src: "/college%20of%20science.webp",
    paintingSrc: "/science_college_painting.webp",
    alt: "SVU College of Sciences Building",
    tag: "Sciences",
    meta: "PG · Ph.D. · Est. 1956",
    body:
      "State-of-the-art physical, chemical, and biological laboratories conducting high-impact funded research across southern India.",
    href: "/colleges/sciences",
    tone: "sand",
  },
  {
    year: "1959",
    short: "Engineering",
    name: "College of",
    accent: "Engineering & Tech",
    headline: "Pioneering Technical Ingenuity",
    src: "/college%20of%20engineering.webp",
    paintingSrc: "/engineering_college_painting.webp",
    alt: "SVU College of Engineering Building",
    tag: "Engineering",
    meta: "UG · PG · Ph.D. · Est. 1959",
    body:
      "Civil, mechanical, electrical, electronics and computer engineering backed by industry tech incubators and robotics facilities.",
    href: "/colleges/engineering",
    tone: "dark",
  },
  {
    year: "1972",
    short: "Commerce & CS",
    name: "College of",
    accent: "Commerce & Computer Science",
    headline: "Modernizing Business & Tech",
    src: "/college%20of%20cm%20and%20cs.webp",
    paintingSrc: "/commerce_college_painting.webp",
    alt: "SVU College of Commerce, Management and Computer Science",
    tag: "Commerce",
    meta: "PG · Ph.D. · Est. 1972",
    body:
      "Fostering corporate leadership, business analytics, and advanced computing paradigms with distinguished campus recruitment.",
    href: "/colleges/cm-cs",
    tone: "sand",
  },
  {
    year: "2007",
    short: "Pharmacy",
    name: "College of",
    accent: "Pharmaceutical Sciences",
    headline: "Advancing Healthcare Discovery",
    src: "/college%20of%20pharmacy.webp",
    paintingSrc: "/pharmacy_college_painting.webp",
    alt: "SVU College of Pharmaceutical Sciences Building",
    tag: "Pharmacy",
    meta: "UG · PG · Ph.D. · Est. 2007",
    body:
      "Precision pharmaceutics, drug design, biotechnology, and clinical pharmacology research compliant with global healthcare benchmarks.",
    href: "/colleges/pharmacy",
    tone: "dark",
  },
];

export default function Colleges() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [cardWidth, setCardWidth] = useState(690);

  const dragStartRef = useRef({
    startX: 0,
    startTime: 0,
    isDown: false,
    currentOffset: 0,
  });

  // Dynamically measure container and card dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        setContainerWidth(width);
        // Responsive card width: up to 690px or 88vw
        const measuredCard = Math.min(width * 0.88, 690);
        setCardWidth(measuredCard);
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const GAP = 24; // gap-6
  const step = cardWidth + GAP;
  const centerOffset = (containerWidth - cardWidth) / 2;
  const translateX = centerOffset - active * step + dragOffset;

  const goToCard = useCallback((i: number) => {
    setActive(i);
    setDragOffset(0);
  }, []);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + colleges.length) % colleges.length);
    setDragOffset(0);
  }, []);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % colleges.length);
    setDragOffset(0);
  }, []);

  // Auto-slide only while the carousel is on screen — off-screen slides would
  // just restyle the glass cards for nobody
  const [onScreen, setOnScreen] = useState(true);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* ------------------------------------------------ 3-Second Carousel Auto-Slide */
  // A one-shot timer re-armed on every slide change, so a manual move (arrows,
  // swipe) always gets a full 3 s before autoplay advances again — a free-running
  // interval could fire right after a click and undo it
  useEffect(() => {
    if (isPaused || isDragging || !onScreen) return;

    const timer = setTimeout(() => {
      setActive((prev) => (prev + 1) % colleges.length);
    }, 3000);

    return () => clearTimeout(timer);
  }, [active, isPaused, isDragging, onScreen]);

  /* ------------------------------------------------ 1-to-1 Mouse/Touch Pointer Dragging */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    dragStartRef.current = {
      startX: e.clientX,
      startTime: Date.now(),
      isDown: true,
      currentOffset: 0,
    };
    setIsDragging(true);
    setIsPaused(true);

    if (containerRef.current) {
      try {
        containerRef.current.setPointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current.isDown) return;
    const deltaX = e.clientX - dragStartRef.current.startX;
    dragStartRef.current.currentOffset = deltaX;
    setDragOffset(deltaX);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current.isDown) return;
    dragStartRef.current.isDown = false;
    setIsDragging(false);

    if (containerRef.current && containerRef.current.hasPointerCapture(e.pointerId)) {
      try {
        containerRef.current.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }

    const deltaX = dragStartRef.current.currentOffset;
    const elapsed = Date.now() - dragStartRef.current.startTime;
    const velocity = Math.abs(deltaX) / (elapsed || 1);

    // If dragged past 50px threshold or flicked quickly
    if (deltaX < -50 || (deltaX < -20 && velocity > 0.35)) {
      handleNext();
    } else if (deltaX > 50 || (deltaX > 20 && velocity > 0.35)) {
      handlePrev();
    } else {
      setDragOffset(0);
    }
  };

  const onClickCapture = (e: React.MouseEvent) => {
    // If the user actually dragged the cards (> 8px), prevent clicking on links or buttons
    if (Math.abs(dragStartRef.current.currentOffset) > 8) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section
      id="colleges"
      className="relative overflow-hidden bg-[#FFF9EE] py-[clamp(3.5rem,7vh,5.5rem)] text-[#0C1230]"
    >
      {/* Background ambient glow orbs */}
      <div
        className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-[#FFE9C2]/50 to-transparent blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 top-1/3 h-[550px] w-[550px] rounded-full bg-gradient-to-bl from-[#23B5E9]/15 to-transparent blur-[120px]"
        aria-hidden="true"
      />

      {/* Header Container */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Eyebrow badge */}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FFE9C2] bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D23F12] shadow-sm backdrop-blur-md">
            Constituent Colleges
          </span>
        </div>

        {/* Heading row: Title on Left, Stacked Pills in 2 lines above Arrows on Right */}
        <div className="mt-5 flex flex-col gap-8 lg:mt-[calc(20*var(--dk-space))] lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl xl:max-w-3xl">
            <h2 className="font-serif text-[clamp(1.8rem,4vw,3.2rem)] lg:text-[calc(51.2*var(--dk-type))] lg:leading-[calc(76.8*var(--dk-ui))] lg:text-balance font-bold tracking-tight text-[#0C1230]">
              The Journey of Sri Venkateswara University
            </h2>
            <p className="mt-3 text-[clamp(0.85rem,1.1vw,1rem)] leading-relaxed text-[#5A6382]">
              From its founding in 1954 to becoming a premier temple of learning, explore the five constituent pillars powering academic excellence, scientific discovery, and global leadership.
            </p>
          </div>

          {/* Right Column: Credential Pills (Line 1: bigger, Line 2: shorter) directly on top of Navigation Arrows */}
          <div className="flex flex-col items-start lg:items-end gap-3 shrink-0 self-start lg:self-end">
            {/* Line 1: Accreditation logos */}
            <div className="flex items-center gap-4 justify-start lg:justify-end">
              <Image
                src="/accreditation/naac-a-plus.webp"
                alt="NAAC — accredited with grade A+"
                width={207}
                height={192}
                className="h-20 w-auto drop-shadow-sm"
              />
              <span className="h-12 w-px bg-[#001546]/15" aria-hidden="true" />
              <Image
                src="/accreditation/ugc.webp"
                alt="UGC (University Grants Commission) — Category-I university"
                width={266}
                height={192}
                className="h-20 w-auto"
              />
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-2.5 pt-1">
              <button
                onClick={handlePrev}
                type="button"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#001546]/15 bg-white text-[#001546] shadow-sm transition-all duration-200 hover:bg-[#001546] hover:text-white hover:border-[#001546] active:scale-95 cursor-pointer"
                aria-label="Previous college"
              >
                <ChevronLeft className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
              </button>
              <button
                onClick={handleNext}
                type="button"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#001546]/15 bg-white text-[#001546] shadow-sm transition-all duration-200 hover:bg-[#001546] hover:text-white hover:border-[#001546] active:scale-95 cursor-pointer"
                aria-label="Next college"
              >
                <ChevronRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================
          HARDWARE-ACCELERATED CAROUSEL — Direct 1-to-1 Cursor Following
          ================================================================ */}
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={onClickCapture}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          if (!dragStartRef.current.isDown) {
            setIsPaused(false);
          }
        }}
        className={`relative mt-10 w-full overflow-hidden pb-12 pt-4 lg:mt-[calc(40*var(--dk-space))] lg:pb-[calc(48*var(--dk-space))] select-none touch-pan-y ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        aria-label="Constituent colleges carousel"
      >
        <div
          className="flex gap-6 will-change-transform"
          style={{
            transform: `translate3d(${translateX}px, 0, 0)`,
            transition: isDragging
              ? "none"
              : "transform 650ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {colleges.map((c, i) => {
            const dark = c.tone === "dark";
            const isActive = active === i;

            return (
              <article
                key={c.year + c.short}
                data-card
                className={`liquid-glass-card group shrink-0 ${
                  dark ? "liquid-glass-dark" : "liquid-glass-sand"
                } ${isActive ? "is-active" : ""}`}
                style={{
                  width: `${cardWidth}px`,
                  // Desktops compact via --dk-ui (1px on phones/tablets → unchanged)
                  minHeight: "min(clamp(380px, 46vw, 440px), calc(440 * var(--dk-ui)))",
                }}
              >
                <div className="flex h-full w-full flex-col sm:flex-row">
                  {/* ----------------- LEFT SIDE: Full-Bleed Watercolor Painting & Photo Crossfade ----------------- */}
                  <div className="relative h-[220px] w-full shrink-0 overflow-hidden sm:h-auto sm:w-[46%] rounded-t-2xl sm:rounded-t-none sm:rounded-l-2xl">
                    {/* Atmospheric base background */}
                    <div
                      className={`absolute inset-0 z-0 ${
                        dark ? "bg-[#001546]" : "bg-[#FFE9C2]"
                      }`}
                    />

                    {/* 1. VIBRANT WATERCOLOR PAINTING (Visible by default, full-bleed edge to edge like a box) */}
                    <div className="absolute inset-0 z-10 transition-transform duration-700 ease-out group-hover:scale-105">
                      <Image
                        src={c.paintingSrc}
                        alt={`${c.alt} Fine Art Watercolor Painting`}
                        fill
                        draggable={false}
                        sizes="(max-width: 768px) 100vw, 350px"
                        className="select-none object-cover w-full h-full"
                      />
                    </div>

                    {/* 2. ORIGINAL FULL-COLOR PHOTOGRAPH (Reveals smoothly on hover) */}
                    <div className="absolute inset-0 z-20 opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105">
                      <Image
                        src={c.src}
                        alt={c.alt}
                        fill
                        draggable={false}
                        sizes="(max-width: 768px) 100vw, 350px"
                        className="select-none object-cover w-full h-full"
                      />
                    </div>

                    {/* Glassmorphic Badge: Tag */}
                    <div className="absolute left-4 top-4 z-30 flex items-center gap-2">
                      <span className="rounded-full border border-white/35 bg-[#001546]/85 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#23B5E9] backdrop-blur-md shadow-sm">
                        {c.tag}
                      </span>
                    </div>

                    {/* Status Indicator Badge */}
                    <div className="absolute bottom-3 left-4 z-30 flex items-center gap-1.5 rounded-full border border-white/30 bg-[#001546]/85 px-2.5 py-0.5 text-[8px] font-medium tracking-wider text-white/90 backdrop-blur-md transition-all duration-300 group-hover:bg-[#0E8050]/90 group-hover:border-[#0E8050]">
                      <Landmark className="h-2.5 w-2.5 text-[#FFB21A] group-hover:hidden" />
                      <Camera className="hidden h-2.5 w-2.5 text-white group-hover:inline" />
                      <span className="group-hover:hidden font-semibold">EST. {c.year}</span>
                      <span className="hidden font-semibold text-white group-hover:inline">CAMPUS PHOTO</span>
                    </div>
                  </div>

                  {/* ----------------- RIGHT SIDE: Information Panel with Generous Bottom Padding ----------------- */}
                  <div
                    className={`relative z-20 flex flex-1 flex-col justify-between p-[clamp(1.2rem,2.8vw,2.2rem)] pb-8 sm:pb-9 lg:p-[min(2.8vw,calc(35.2*var(--dk-ui)))] lg:pb-[calc(36*var(--dk-ui))] ${
                      dark ? "text-white" : "text-[#0C1230]"
                    }`}
                  >
                    {/* Top: Large Milestone Year */}
                    <div className="flex items-start justify-between">
                      <span
                        className={`font-sans text-[clamp(2.8rem,5.2vw,4.4rem)] lg:text-[min(5.2vw,calc(70.4*var(--dk-type)))] font-light leading-none tracking-tight ${
                          dark
                            ? "text-[#FFB21A] drop-shadow-sm font-semibold"
                            : "text-[#001546] drop-shadow-sm font-semibold"
                        }`}
                      >
                        {c.year}
                      </span>

                      {/* Meta pill */}
                      <span
                        className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider ${
                          dark
                            ? "border border-white/20 bg-white/10 text-white/80"
                            : "border-[#001546]/15 bg-white/70 text-[#5A6382]"
                        }`}
                      >
                        {c.meta.split("·")[0]}
                      </span>
                    </div>

                    {/* Middle: Headline & Description */}
                    <div className="my-auto py-2">
                      <h3
                        className={`text-[clamp(1.1rem,1.9vw,1.45rem)] font-bold leading-tight ${
                          dark ? "text-white" : "text-[#0C1230]"
                        }`}
                      >
                        {c.headline}
                      </h3>
                      <p
                        className={`mt-1 text-[11px] font-semibold uppercase tracking-wider ${
                          dark ? "text-[#23B5E9]" : "text-[#D23F12]"
                        }`}
                      >
                        {c.name} {c.accent}
                      </p>

                      <p
                        className={`mt-2.5 max-w-[36ch] text-[clamp(0.74rem,0.98vw,0.85rem)] leading-relaxed ${
                          dark ? "text-white/80" : "text-[#5A6382]"
                        }`}
                      >
                        {c.body}
                      </p>
                    </div>

                    {/* Bottom: Explore CTA Button with comfortable bottom spacing */}
                    <div className="flex items-center justify-between pt-3">
                      <PixelButton
                        href={c.href}
                        className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] whitespace-nowrap shadow-sm"
                        background={dark ? "#FFB21A" : "#1F45D6"}
                        pixelColor={dark ? "#001546" : "#FFB21A"}
                        fontDefaultColor={dark ? "#001546" : "#FFFFFF"}
                        fontHoverColor={dark ? "#FFB21A" : "#001546"}
                        pixelSize={12}
                        staggerStep={0.02}
                        reveal="random"
                      >
                        <span className="whitespace-nowrap">Explore College</span>
                        <ArrowRight className="h-3 w-3 shrink-0" />
                      </PixelButton>

                      <span
                        className={`hidden sm:inline-block text-[9px] font-semibold tracking-wider ${
                          dark ? "text-white/50" : "text-[#5A6382]"
                        }`}
                      >
                        Tirupati Campus
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom active line accent */}
                <span
                  className={`pointer-events-none absolute inset-x-0 bottom-0 h-[3.5px] origin-left bg-gradient-to-r from-[#D23F12] via-[#FFB21A] to-[#1F45D6] transition-transform duration-500 ${
                    isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                  }`}
                />
              </article>
            );
          })}
        </div>
      </div>

      {/* ================================================================
          MILESTONE TIMELINE TRACK — With extra top breathing room
          ================================================================ */}
      {/* Timeline + CTA share one row on larger screens */}
      <div className="mx-auto mt-6 flex max-w-7xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:gap-8 lg:mt-[calc(24*var(--dk-space))] lg:px-12">
        <div className="relative flex flex-1 items-start justify-between">
          {colleges.map((c, i) => {
            const on = active === i;
            return (
              <div
                key={c.year + "-node"}
                // Last step only as wide as its label, so the CTA sits right after it
                className={`group flex flex-col items-start cursor-pointer ${
                  i < colleges.length - 1 ? "flex-1" : "flex-none"
                }`}
                onClick={() => goToCard(i)}
              >
                {/* Year Label */}
                <button
                  type="button"
                  className={`text-left text-[clamp(0.85rem,1.3vw,1.15rem)] transition-all duration-300 ${
                    on
                      ? "font-bold text-[#D23F12] scale-105"
                      : "font-normal text-[#5A6382] group-hover:text-[#0C1230]"
                  }`}
                >
                  {c.year}
                </button>

                {/* College Short Name */}
                <span
                  className={`hidden text-sm lg:text-[15px] transition-colors sm:block ${
                    on ? "font-semibold text-[#1F45D6]" : "text-[#5A6382]/80"
                  }`}
                >
                  {c.short}
                </span>

                {/* Timeline Node & Rail Segment */}
                <div className="relative mt-3 flex w-full items-center">
                  {/* Indicator Dot */}
                  <div
                    className={`relative flex items-center justify-center transition-all duration-300 ${
                      on ? "scale-125" : "scale-100 group-hover:scale-110"
                    }`}
                  >
                    <span
                      className={`h-3 w-3 rounded-full transition-all duration-300 ${
                        on
                          ? "bg-[#001546] ring-4 ring-[#D23F12]/40 shadow-md"
                          : "bg-[#FFE9C2] group-hover:bg-[#1F45D6]"
                      }`}
                    />
                  </div>

                  {/* Horizontal Connection Rail Line */}
                  {i < colleges.length - 1 && (
                    <span className="ml-2 h-[2px] flex-1 bg-[#FFE9C2] transition-colors group-hover:bg-[#1F45D6]/30" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <PixelButton
          href="/colleges/arts"
          className="w-fit shrink-0 py-2 pl-6 pr-2 text-xs font-semibold"
          background="#001546"
          pixelColor="#FFB21A"
          fontDefaultColor="#FFFFFF"
          fontHoverColor="#001546"
          pixelSize={14}
          staggerStep={0.02}
          reveal="random"
        >
          <span>Explore All 5 Constituent Colleges</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FFB21A] text-[#001546]">
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </PixelButton>
      </div>
    </section>
  );
}
