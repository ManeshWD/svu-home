"use client";

import React from "react";
import Image from "next/image";
import SquishyButton from "./SquishyButton";

const cards = [
  {
    badge: "Campus",
    src: "/hero-svu-2.webp",
    alt: "Sri Venkateswara University campus",
    rotate: -6,
    className: "mt-10",
  },
  {
    badge: "Administration",
    src: "/about_real_admin.webp",
    alt: "Sri Venkateswara University administrative building",
    rotate: 0,
    className: "z-10 -mx-4 sm:-mx-6",
  },
  {
    badge: "Library",
    src: "/about_real_library.webp",
    alt: "The Sri Venkateswara University library",
    rotate: 6,
    className: "mt-10",
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

export default function AboutUs() {
  return (
    <section id="about" className="bg-[#FFF9EE] px-6 py-[clamp(2.5rem,6vh,4.5rem)] lg:px-12 border-b border-[#FFE9C2]/60">
      <div className="mx-auto max-w-7xl">
        {/* Eyebrow */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FFE9C2] bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D23F12] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D23F12]" />
            About Us
          </span>
        </div>

        {/* Heading */}
        <h2 className="mx-auto mt-4 max-w-2xl text-center font-serif text-[clamp(1.5rem,4vw,2.75rem)] font-bold leading-tight tracking-tight text-[#0C1230]">
          A Place To Learn,
          <br />
          Discover, <em className="font-serif italic text-[#D23F12]">And Lead</em>
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-center text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed text-[#5A6382]">
          Sri Venkateswara University has shaped generations of scholars since
          1954 — open to every learner, whatever they are starting from.
        </p>

        {/* Overlapping photo cards */}
        <div className="mt-8 flex items-start justify-center gap-0 sm:gap-2">
          {cards.map((card) => (
            <div
              key={card.badge}
              style={{ transform: `rotate(${card.rotate}deg)` }}
              className={`relative aspect-[3/4] w-[33%] max-w-[145px] overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-[#001546]/10 transition-transform duration-300 hover:-translate-y-2 sm:w-[28%] sm:max-w-[170px] lg:max-w-[200px] ${card.className}`}
            >
              <Image
                src={card.src}
                alt={card.alt}
                fill
                sizes="(max-width: 640px) 35vw, 200px"
                className="object-cover"
              />
              <span className="absolute left-1/2 top-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/95 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.16em] text-[#001546] shadow-md backdrop-blur-sm sm:top-4 sm:px-3 sm:py-1.5 sm:text-[9px]">
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#0E8050] align-middle" />
                {card.badge}
              </span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 gap-6 border-t border-[#FFE9C2] pt-6 sm:grid-cols-3 sm:gap-0">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`px-0 text-center sm:px-8 ${
                i > 0 ? "sm:border-l sm:border-[#FFE9C2]" : ""
              }`}
            >
              <p className="font-serif text-[clamp(1.25rem,2.6vw,1.875rem)] font-bold text-[#001546]">
                {stat.value}
                <span className="text-[0.65em] align-top text-[#D23F12]">{stat.unit}</span>
              </p>
              <p className="mt-1 text-[clamp(0.75rem,1vw,0.875rem)] font-bold text-[#0C1230]">
                {stat.label}{" "}
                <em className="font-serif italic font-normal text-[#1F45D6]">
                  {stat.accent}
                </em>
              </p>
              <p className="mx-auto mt-2 max-w-[16rem] text-[clamp(0.65rem,0.9vw,0.75rem)] leading-relaxed text-[#5A6382]">
                {stat.body}
              </p>
            </div>
          ))}
        </div>

        {/* Learn more pill */}
        <div className="mt-8 flex justify-center">
          <SquishyButton variant="sand" href="#colleges">
            Learn More
            <svg
              className="h-3.5 w-3.5 text-[#001546]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h13M12 5l7 7-7 7" />
            </svg>
          </SquishyButton>
        </div>
      </div>
    </section>
  );
}
