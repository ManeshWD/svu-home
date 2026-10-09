"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import PixelButton from "./PixelButton";

const cards = [
  {
    badge: "Campus",
    src: "/hero-svu-2.webp",
    alt: "Sri Venkateswara University campus",
    href: "/about",
    rotate: -6,
    className: "mt-10 lg:mt-[calc(40*var(--dk-space))]",
  },
  {
    badge: "Administration",
    src: "/about_real_admin.webp",
    alt: "Sri Venkateswara University administrative building",
    href: "/administration/vice-chancellor",
    rotate: 0,
    className: "z-10 -mx-4 sm:-mx-6",
  },
  {
    badge: "Library",
    src: "/about_real_library.webp",
    alt: "The Sri Venkateswara University library",
    href: "/about",
    rotate: 6,
    className: "mt-10 lg:mt-[calc(40*var(--dk-space))]",
  },
];

const stats = [
  {
    value: "70",
    unit: "+",
    label: "Programmes Across",
    accent: "Disciplines",
    body: "Arts, sciences, engineering, commerce and pharmaceutical sciences under one campus.",
  },
  {
    value: "1954",
    unit: "",
    label: "Serving Students",
    accent: "Since",
    body: "Seven decades of teaching, heritage and research in the temple city of Tirupati.",
  },
  {
    value: "A",
    unit: "+",
    label: "NAAC Accredited",
    accent: "Grade",
    body: "Recognised as a Category-I university for academic quality and autonomy.",
  },
];

const learnMore = (
  <PixelButton
    href="/about"
    className="px-6 py-3 text-xs sm:text-sm font-bold tracking-wide"
    background="#001546"
    pixelColor="#FFB21A"
    fontDefaultColor="#FFFFFF"
    fontHoverColor="#001546"
    pixelSize={14}
    staggerStep={0.02}
    reveal="random"
  >
    <span>Learn More</span>
    <ArrowRight className="h-4 w-4" />
  </PixelButton>
);

export default function AboutUs() {
  const cardsRef = useRef<HTMLDivElement>(null);
  // Re-evaluated both ways, so the cards tuck away whenever the row scrolls
  // out (up or down) and fan out again when it returns
  const inView = useInView(cardsRef, { amount: 0.5 });
  const [linedUp, setLinedUp] = useState(false);

  return (
    <section id="about" className="bg-[#FFF9EE] px-6 py-[clamp(2.5rem,6vh,4.5rem)] lg:py-[clamp(1.5rem,6vh,4.5rem)] lg:px-12 border-b border-[#FFE9C2]/60">
      <div className="mx-auto max-w-7xl">
        {/* Eyebrow */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FFE9C2] bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D23F12] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D23F12]" />
            About Us
          </span>
        </div>

        {/* Heading */}
        <h2 className="mx-auto mt-4 max-w-2xl text-center font-serif text-[clamp(1.5rem,4vw,2.75rem)] lg:mt-[calc(16*var(--dk-space))] lg:text-(length:--dk-h2) font-bold leading-tight tracking-tight text-[#0C1230]">
          A Place To Learn,
          <br />
          Discover, <em className="font-serif italic text-[#D23F12]">And Lead</em>
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-center text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed text-[#5A6382]">
          Sri Venkateswara University has shaped generations of scholars since
          1954 — open to every learner, whatever they are starting from.
        </p>

        {/* Overlapping photo cards. The side cards sit tucked behind the
            centre one, fan out while the row is in view and tuck back once
            it scrolls away; hovering lines all three up side by side.
            Pure CSS transform transitions — compositor-run, no per-frame JS. */}
        <div
          ref={cardsRef}
          className="mx-auto mt-8 lg:mt-[calc(32*var(--dk-space))] flex max-w-[720px] items-start justify-center gap-0 sm:gap-2"
          onPointerEnter={(e) => {
            if (e.pointerType !== "touch") setLinedUp(true);
          }}
          onPointerLeave={() => setLinedUp(false)}
        >
          {cards.map((card, i) => {
            // -1 = left, 0 = centre, 1 = right
            const side = i - 1;
            // Same function list in every state so each part interpolates cleanly
            const transform =
              side === 0 || (inView && !linedUp)
                ? `translate(0px, 0px) rotate(${card.rotate}deg) scale(1)`
                : inView
                  ? // Side by side: undo the overlap plus a small gap, lift to the centre card's top
                    `translate(${side * 28}px, calc(-40 * var(--dk-space))) rotate(0deg) scale(1)`
                  : // Behind the centre card
                    `translate(${-side * 90}%, calc(-40 * var(--dk-space))) rotate(0deg) scale(0.9)`;
            return (
              <div
                key={card.badge}
                style={{ transform }}
                className={`relative w-[33%] max-w-[145px] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none sm:w-[28%] sm:max-w-[170px] lg:max-w-[calc(200*var(--dk-ui))] ${card.className}`}
              >
                <Link
                  href={card.href}
                  aria-label={card.badge}
                  className="relative block aspect-[3/4] w-full overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-[#001546]/10 outline-none transition-transform duration-300 hover:-translate-y-2 focus-visible:ring-2 focus-visible:ring-[#D23F12]"
                >
                  <Image
                    src={card.src}
                    alt={card.alt}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <span className="absolute left-1/2 top-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/95 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.16em] text-[#001546] shadow-md backdrop-blur-sm sm:top-4 sm:px-3 sm:py-1.5 sm:text-[9px]">
                    <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#0E8050] align-middle" />
                    {card.badge}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Stats — phones: 2×2, left-aligned, Learn More in the 4th cell;
            sm and up: three centred columns with the button below */}
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-7 border-t border-[#FFE9C2] pt-6 sm:grid-cols-3 sm:gap-0 lg:mt-[calc(32*var(--dk-space))] lg:pt-[calc(24*var(--dk-space))]">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`px-0 text-left sm:px-8 sm:text-center ${
                i > 0 ? "sm:border-l sm:border-[#FFE9C2]" : ""
              }`}
            >
              <p className="font-serif text-[clamp(1.25rem,2.6vw,1.875rem)] lg:text-[calc(30*var(--dk-type))] font-bold text-[#001546]">
                {stat.value}
                <span className="text-[0.65em] align-top text-[#D23F12]">{stat.unit}</span>
              </p>
              <p className="mt-1 text-[clamp(0.75rem,1vw,0.875rem)] font-bold text-[#0C1230]">
                {stat.label}{" "}
                <em className="font-serif italic font-normal text-[#1F45D6]">
                  {stat.accent}
                </em>
              </p>
              <p className="mt-2 max-w-[19rem] text-sm lg:text-[15px] leading-relaxed text-[#5A6382] sm:mx-auto">
                {stat.body}
              </p>
            </div>
          ))}

          {/* Phones: the button fills the empty 4th grid cell */}
          <div className="flex items-center sm:hidden">{learnMore}</div>
        </div>

        {/* Learn more pill (sm and up) */}
        <div className="mt-8 hidden justify-center sm:flex lg:mt-[calc(32*var(--dk-space))]">{learnMore}</div>
      </div>
    </section>
  );
}
