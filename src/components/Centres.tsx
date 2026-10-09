"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MotionConfig, animate, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import PixelButton from "./PixelButton";

// ============================================================================
// EXACT HOVER.DEV SPRING CARD COMPONENT
// Source: https://www.hover.dev/components/cards#spring-cards
// ============================================================================

interface SpringCardProps {
  title: string;
  subtitle: string;
  className?: string;
  containerClassName?: string;
  id: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const SpringCard = ({
  title,
  subtitle,
  className,
  containerClassName,
  id,
  buttonText = "LET'S GO",
}: SpringCardProps) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0.5 }}>
      <motion.div
        whileHover="hovered"
        animate={isClicked ? "hovered" : "rest"}
        onClick={() => setIsClicked((prev) => !prev)}
        className={cn(
          "group w-full border-2 border-black cursor-pointer select-none",
          containerClassName,
          className
        )}
      >
        {/* Layer 2 (Middle Layer) */}
        <motion.div
          initial={{ x: 0, y: 0 }}
          variants={{ hovered: { x: -8, y: -8 }, rest: { x: 0, y: 0 } }}
          className={cn("-m-0.5 border-2 border-black", className)}
        >
          {/* Layer 1 (Front Card) */}
          <motion.div
            initial={{ x: 0, y: 0 }}
            variants={{ hovered: { x: -8, y: -8 }, rest: { x: 0, y: 0 } }}
            className={cn(
              // Desktop height compacts with --dk-ui, but never below what the
              // text needs at this width (narrower cards wrap to more lines)
              "relative -m-0.5 flex h-72 sm:h-80 lg:h-[max(calc(320*var(--dk-ui)),clamp(240px,calc(320px-(100vw-1024px)*0.3),320px))] flex-col justify-between overflow-hidden border-2 border-black p-6 sm:p-8 lg:p-[calc(32*var(--dk-ui))]",
              className
            )}
          >
            {/* Title with sliding arrow on hover or click */}
            <p className="flex items-center text-xl sm:text-2xl font-bold uppercase tracking-tight text-black">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn(
                  "mr-2 transition-all duration-300 ease-in-out shrink-0 h-6 w-6 text-black",
                  isClicked
                    ? "ml-0 opacity-100"
                    : "-ml-8 opacity-0 group-hover:ml-0 group-hover:opacity-100"
                )}
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
              <span>{title}</span>
            </p>

            {/* Description + Slide-up button on hover or click */}
            <div>
              <p
                className={cn(
                  "text-xs sm:text-sm font-medium leading-relaxed text-black/90 transition-[margin] duration-300 ease-in-out",
                  // Lifts the text clear of the slide-up button
                  isClicked
                    ? "mb-12 lg:mb-[calc(48*var(--dk-ui))]"
                    : "group-hover:mb-12 lg:group-hover:mb-[calc(48*var(--dk-ui))]"
                )}
              >
                {subtitle}
              </p>
              <Link
                href={`/centers?tab=${id}`}
                className={cn(
                  "absolute bottom-2.5 left-2.5 right-2.5 text-center border-2 border-black bg-white px-4 py-2 font-mono text-xs sm:text-sm font-black uppercase tracking-wider text-black transition-all duration-300 ease-in-out hover:bg-black hover:text-white cursor-pointer active:scale-[0.99] shadow-sm",
                  isClicked
                    ? "translate-y-0 opacity-100"
                    : "translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                )}
              >
                {buttonText}
              </Link>
            </div>

            {/* Top-Right Circular Rotating Text (Learned from Hover.dev Spring Cards) */}
            {/* Spun by a CSS keyframe (svu-spring-card-spin) so it runs on the
                compositor instead of a per-frame JS loop */}
            <svg
              style={{ top: "0", right: "0" }}
              width="200"
              height="200"
              className="svu-spring-card-spin pointer-events-none absolute z-10 rounded-full"
            >
              <path
                id={`circlePath-${id}`}
                d="M100,100 m-100,0 a100,100 0 1,0 200,0 a100,100 0 1,0 -200,0"
                fill="none"
              />
              <text>
                <textPath
                  href={`#circlePath-${id}`}
                  fill="black"
                  className="fill-black text-2xl font-black uppercase opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 tracking-wider"
                >
                  LEARN MORE • LEARN MORE • LEARN MORE • LEARN MORE •
                </textPath>
              </text>
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
};

// ============================================================================
// COUNT-UP NUMBER — runs once when scrolled into view
// ============================================================================

function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  // Not once: the count restarts from 0 every time the stats scroll back into view
  const inView = useInView(ref, { margin: "-60px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!inView) {
      // Out of view: reset, so the next entry counts up again
      el.textContent = `${prefix}${reduceMotion ? to : 0}${suffix}`;
      return;
    }
    if (reduceMotion) {
      el.textContent = `${prefix}${to}${suffix}`;
      return;
    }
    // Write straight to the DOM — no re-render per frame
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = `${prefix}${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, to, prefix, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}0{suffix}
    </span>
  );
}

// ============================================================================
// DATA DEFINITIONS
// ============================================================================

interface FeaturedCentre {
  id: string;
  badge: string;
  fullName: string;
  description: string;
  bgClass: string;
  containerClass?: string;
}

const featuredCentres: FeaturedCentre[] = [
  {
    id: "acas",
    badge: "DYNAMIC",
    fullName: "Advanced Centre for Atmospheric Studies",
    description:
      "Advanced Centre for Atmospheric Studies (ACAS). ISRO-collaborative atmospheric radar research, satellite meteorological analytics, and high-altitude ionospheric modeling.",
    bgClass: "bg-[#5EEAD4]", // Mint Green (Matches hover.dev dynamic card)
  },
  {
    id: "bif",
    badge: "DATA DRIVEN",
    fullName: "Bioinformatics Infrastructure Facility",
    description:
      "Bioinformatics Infrastructure Facility (BIF). High-throughput genomic sequencing, molecular docking simulations, and scientific supercomputing clusters funded by DBT.",
    bgClass: "bg-[#93C5FD]", // Periwinkle Blue (Matches hover.dev data driven card)
    containerClass: "sm:-translate-y-4 lg:-translate-y-6",
  },
  {
    id: "cerdat",
    badge: "DUTIFUL",
    fullName: "Centre for Extension & Rural Development",
    description:
      "Centre for Extension & Rural Development (CERDAT). Grassroots agro-ecological research, community skill empowerment, and sustainable rural technology transfer.",
    bgClass: "bg-[#FFA099]", // Coral / Salmon Pink (Matches hover.dev dutiful card)
  },
  {
    id: "ori",
    badge: "DEMURE",
    fullName: "Oriental Research Institute",
    description:
      "Oriental Research Institute (ORI). World-renowned Indological treasure preserving 14,000+ ancient palm-leaf manuscripts and rare Sanskrit scriptures.",
    bgClass: "bg-[#FFD13B]", // Bright Saffron / Yellow (Matches hover.dev demure card)
    containerClass: "sm:-translate-y-4 lg:-translate-y-6",
  },
];

export default function Centres() {
  return (
    <section
      id="centres"
      className="relative w-full bg-[#FFF9EE] text-[#0C1230]"
    >
        {/* Main 2-Column Split: content on the left, 4 Spring Cards on the right */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* ======================================================== */}
          {/* LEFT COLUMN: Section Description & CTA Buttons */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-between px-6 sm:px-10 lg:pl-16 lg:pr-12 xl:pl-[max(4rem,calc((100vw-80rem)/2+2rem))] pt-12 pb-4 sm:py-16 lg:py-[calc(96*var(--dk-space))]">
            <div>
              {/* Eyebrow Pill */}
              <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[#D23F12] mb-4">
                Centres of Excellence
              </span>

              {/* Serif Headline */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-(length:--dk-h2) font-bold text-[#001546] leading-[1.15] tracking-tight">
                Pioneering Research That Powers National Breakthroughs
              </h2>

              {/* Detailed Paragraph */}
              <p className="mt-5 lg:mt-[calc(20*var(--dk-space))] text-sm sm:text-base text-[#5A6382] leading-relaxed font-normal">
                Sri Venkateswara University operates 13 specialized multidisciplinary centres and national research facilities. Supported by DST, DBT, ISRO, and global academic councils, our laboratories accelerate translational science, patent filings, and grassroots regional development.
              </p>

              {/* Research Metrics Grid — count up on scroll */}
              <div className="mt-8 grid grid-cols-3 gap-4 border-y border-[#001546]/15 py-6 lg:mt-[calc(32*var(--dk-space))] lg:py-[calc(24*var(--dk-space))]">
                <div>
                  <div className="font-mono text-2xl sm:text-3xl font-black text-[#001546]">
                    <Counter to={13} suffix="+" />
                  </div>
                  <div className="text-xs font-semibold text-[#5A6382] uppercase tracking-wider mt-1">Specialized Centres</div>
                </div>
                <div>
                  <div className="font-mono text-2xl sm:text-3xl font-black text-[#1F45D6]">
                    <Counter to={70} suffix="+" />
                  </div>
                  <div className="text-xs font-semibold text-[#5A6382] uppercase tracking-wider mt-1">Active Patents</div>
                </div>
                <div>
                  <div className="font-mono text-2xl sm:text-3xl font-black text-[#D23F12]">
                    <Counter to={45} prefix="₹" suffix="+ Cr" />
                  </div>
                  <div className="text-xs font-semibold text-[#5A6382] uppercase tracking-wider mt-1">Research Grants</div>
                </div>
              </div>
            </div>

            {/* "Show All Centres" Button (Desktop only here) */}
            <div className="hidden lg:block mt-8 pt-2 lg:mt-[calc(32*var(--dk-space))]">
              <PixelButton
                href="/centers"
                className="px-7 py-3.5 font-mono text-xs sm:text-sm font-bold tracking-widest uppercase"
                background="#001546"
                pixelColor="#FFB21A"
                fontDefaultColor="#FFFFFF"
                fontHoverColor="#001546"
                pixelSize={14}
                staggerStep={0.02}
                reveal="random"
              >
                <span>SHOW ALL CENTRES</span>
                <ArrowRight className="w-4 h-4 text-[#FFB21A]" />
              </PixelButton>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: 4 Spring Cards matching Hover.dev Implementation */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 content-center gap-6 sm:gap-7 lg:gap-[calc(28*var(--dk-ui))] px-6 sm:px-10 lg:pl-12 lg:pr-16 xl:pr-[max(4rem,calc((100vw-80rem)/2+2rem))] pt-2 pb-14 sm:py-16 lg:py-[calc(96*var(--dk-space))]">
            {featuredCentres.map((centre) => (
              <SpringCard
                key={centre.id}
                id={centre.id}
                title={centre.badge}
                subtitle={centre.description}
                className={centre.bgClass}
                containerClassName={centre.containerClass}
                buttonText="LET'S GO"
              />
            ))}

            {/* Mobile "Show All Centres" Button - positioned after cards */}
            <div className="lg:hidden mt-2 flex justify-center sm:col-span-2">
              <PixelButton
                href="/centers"
                className="w-full sm:w-auto px-7 py-3.5 font-mono text-xs sm:text-sm font-bold tracking-widest uppercase"
                background="#001546"
                pixelColor="#FFB21A"
                fontDefaultColor="#FFFFFF"
                fontHoverColor="#001546"
                pixelSize={14}
                staggerStep={0.02}
                reveal="random"
              >
                <span>SHOW ALL CENTRES</span>
                <ArrowRight className="w-4 h-4 text-[#FFB21A]" />
              </PixelButton>
            </div>
          </div>
        </div>

    </section>
  );
}
