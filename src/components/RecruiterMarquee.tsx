"use client";

import React from "react";
import Image from "next/image";

interface Recruiter {
  name: string;
  src: string;
  width: number;
  height: number;
}

// Line 1: Top global tech & recruiting giants (moves left)
const line1Recruiters: Recruiter[] = [
  { name: "Google", src: "/recruiters/google.png", width: 194, height: 64 },
  { name: "Microsoft", src: "/recruiters/microsoft.png", width: 299, height: 64 },
  { name: "Infosys", src: "/recruiters/infosys.png", width: 163, height: 64 },
  { name: "Wipro", src: "/recruiters/wipro.png", width: 159, height: 64 },
  { name: "Amazon", src: "/recruiters/amazon.png", width: 212, height: 64 },
  { name: "Cisco", src: "/recruiters/cisco.png", width: 121, height: 64 },
  { name: "Deloitte", src: "/recruiters/deloitte.png", width: 339, height: 64 },
  { name: "TATA / TCS", src: "/recruiters/tcs.png", width: 267, height: 64 },
  { name: "Intel", src: "/recruiters/intel.png", width: 165, height: 64 },
  { name: "Adobe", src: "/recruiters/adobe.png", width: 246, height: 64 },
];

// Line 2: Leading enterprise & technology partners (moves right in opposite direction)
const line2Recruiters: Recruiter[] = [
  { name: "Accenture", src: "/recruiters/accenture.png", width: 242, height: 64 },
  { name: "Dell Technologies", src: "/recruiters/dell.png", width: 210, height: 64 },
  { name: "Oracle", src: "/recruiters/oracle.png", width: 492, height: 64 },
  { name: "IBM", src: "/recruiters/ibm.png", width: 171, height: 64 },
  { name: "HCLTech", src: "/recruiters/hcl.png", width: 348, height: 64 },
  { name: "Qualcomm", src: "/recruiters/qualcomm.png", width: 348, height: 64 },
  { name: "Samsung", src: "/recruiters/samsung.png", width: 189, height: 64 },
  { name: "Capgemini", src: "/recruiters/capgemini.png", width: 284, height: 64 },
  { name: "NVIDIA", src: "/recruiters/nvidia.png", width: 340, height: 64 },
];

/**
 * One marquee row. The track holds two identical copies with no gap between
 * them — each copy carries its own trailing spacing (pr-*) — so translating
 * by exactly -50% lands the second copy where the first began, with no jump.
 */
function MarqueeRow({
  items,
  reverse = false,
  className = "",
}: {
  items: Recruiter[];
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] ${className}`}
    >
      <div
        className={`recruiter-track flex w-max py-1 hover:[animation-play-state:paused] ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center gap-4 sm:gap-6 pr-4 sm:pr-6"
            aria-hidden={copy === 1 ? true : undefined}
          >
            {items.map((item) => (
              <div
                key={item.name}
                className="shrink-0 h-12 sm:h-14 min-w-[130px] sm:min-w-[150px] px-5 sm:px-7 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-[#FFB21A]/50 transition-colors duration-300 flex items-center justify-center"
                title={item.name}
              >
                <Image
                  src={item.src}
                  alt={copy === 1 ? "" : `${item.name} official logo`}
                  width={item.width}
                  height={item.height}
                  className="h-6 sm:h-7 w-auto object-contain max-w-[130px] sm:max-w-[160px] select-none pointer-events-none"
                  draggable={false}
                  unoptimized
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RecruiterMarquee() {
  return (
    <section className="relative w-full bg-[#001546] text-[#FFE9C2] py-7 sm:py-10 border-y border-white/10 overflow-hidden select-none">
      {/* Top Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-5 sm:mb-7 text-center">
        <p className="text-[11px] sm:text-xs font-bold tracking-[0.25em] text-[#FFB21A] uppercase">
          FEATURED RECRUITERS &bull; SVU PLACEMENT PARTNERS
        </p>
      </div>

      {/* Row 1: Marquee moving Left */}
      <MarqueeRow items={line1Recruiters} />

      {/* Row 2: Marquee moving Right in Opposite Direction */}
      <MarqueeRow items={line2Recruiters} reverse className="mt-3 sm:mt-4" />
    </section>
  );
}
