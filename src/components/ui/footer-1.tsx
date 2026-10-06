"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface Footer1Props {
  brandName?: string;
  tagline?: string;
  description?: string;
  sinceYear?: string;
  backgroundWatermark?: string;
  columns?: FooterColumn[];
  copyright?: string;
}

const defaultColumns: FooterColumn[] = [
  {
    title: "Academic Programs",
    links: [
      { label: "Undergraduate Admissions", href: "/home2#admissions" },
      { label: "Postgraduate Studies", href: "/home2#admissions" },
      { label: "Constituent Colleges", href: "/home2#colleges" },
      { label: "Engineering & Computing", href: "/home2#colleges" },
      { label: "Ph.D. & Doctoral Studies", href: "/home2#research", external: true },
    ],
  },
  {
    title: "Research & Campus",
    links: [
      { label: "Central University Library", href: "/home2#campus" },
      { label: "Centres of Excellence", href: "/home2#academics" },
      { label: "Advanced Innovation Hub", href: "/home2#research" },
      { label: "Campus Life & Hostels", href: "/home2#campus" },
      { label: "Global Research Partnerships", href: "/home2#impact", external: true },
    ],
  },
  {
    title: "University Portals",
    links: [
      { label: "Student & Faculty Portal", href: "https://portal.example.com", external: true },
      { label: "Examinations & Results", href: "/home2#exams" },
      { label: "Placement & Career Cell", href: "/home2#careers" },
      { label: "Global Alumni Association", href: "/home2#alumni", external: true },
      { label: "RTI & Governance", href: "/home2#governance" },
    ],
  },
];

export function Footer1({
  brandName = "Sri Venkateswara University",
  tagline = "Shaping Minds, Inspiring Generations",
  description = "A premier NAAC 'A+' accredited state university established in 1954 in the holy temple city of Tirupati, fostering academic excellence and transformative research.",
  sinceYear = "Estd. 1954 • Tirupati, Andhra Pradesh",
  backgroundWatermark = "SV UNIVERSITY",
  columns = defaultColumns,
  copyright = `© ${new Date().getFullYear()} Sri Venkateswara University. All rights reserved.`,
}: Footer1Props) {
  return (
    <footer className="relative w-full bg-[#040323] text-white pt-20 pb-12 overflow-hidden border-t border-[#181552]">
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20">
        {/* =========================================================
            FOUR-COLUMN GRID (Branding + 3 Outlined Link Columns)
            ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#181552] bg-[#080634]/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl">
          {/* Column 1: Branding (4 cols) */}
          <div className="lg:col-span-4 p-8 sm:p-10 lg:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#181552]">
            <div>
              {/* Brand Logo & Name */}
              <Link href="/home2" className="inline-flex items-center gap-3.5 group select-none">
                <div className="relative transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/SV-logo.webp"
                    alt={`${brandName} Emblem`}
                    width={48}
                    height={48}
                    className="h-11 sm:h-12 w-auto object-contain drop-shadow-md"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-base sm:text-lg font-black uppercase tracking-tight text-white leading-tight font-heading">
                    {brandName}
                  </span>
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#818CF8] mt-0.5">
                    Tirupati • NAAC A+
                  </span>
                </div>
              </Link>

              {/* Tagline */}
              <h3 className="mt-8 text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight font-heading">
                {tagline}
              </h3>

              {/* Description */}
              <p className="mt-4 text-sm text-[#A5B4FC]/80 leading-relaxed font-normal">
                {description}
              </p>
            </div>

            {/* Establishment / Subtitle */}
            <div className="mt-10 pt-6 border-t border-[#181552]/70 flex items-center justify-between text-xs text-[#8E9CCF]">
              <span className="font-semibold tracking-wide uppercase">{sinceYear}</span>
            </div>
          </div>

          {/* Columns 2, 3, 4: Outlined Link Cards (8 cols -> 3 equal sub-columns) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#181552]">
            {columns.map((col, idx) => (
              <div key={idx} className="p-8 sm:p-10 flex flex-col justify-between group/col">
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#181552]">
                    <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#818CF8]">
                      {col.title}
                    </span>
                    <span className="text-[10px] font-mono text-[#6A78AB]">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Outlined Link List */}
                  <ul className="space-y-3.5">
                    {col.links.map((link, lIdx) => (
                      <li key={lIdx}>
                        {link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/link flex items-center justify-between text-sm sm:text-[15px] text-[#CBD5E1] hover:text-white transition-colors duration-150 py-1"
                          >
                            <span className="group-hover/link:translate-x-1 transition-transform duration-150">
                              {link.label}
                            </span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#818CF8] opacity-70 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="group/link flex items-center justify-between text-sm sm:text-[15px] text-[#CBD5E1] hover:text-white transition-colors duration-150 py-1"
                          >
                            <span className="group-hover/link:translate-x-1 transition-transform duration-150">
                              {link.label}
                            </span>
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sub-card decorative footer */}
                <div className="mt-8 pt-4 border-t border-[#181552]/40 text-[11px] text-[#6A78AB]">
                  <span>Explore section ↗</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================
            BOTTOM LEGAL & SOCIAL BAR
            ========================================================= */}
        <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E9CCF]">
          <p>{copyright}</p>

          <div className="flex items-center gap-6">
            <Link href="/home2#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/home2#terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/home2#contact" className="hover:text-white transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* =========================================================
          LARGE SUBTLE BACKGROUND WATERMARK TEXT
          Matches React Bits Pro Footer 1 design signature
          ========================================================= */}
      <div
        className="pointer-events-none select-none absolute bottom-0 left-0 right-0 flex items-end justify-center overflow-hidden z-0 opacity-100"
        aria-hidden="true"
      >
        <span className="font-heading font-black text-[clamp(4.5rem,15vw,220px)] leading-[0.78] tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-[#818CF8]/[0.12] to-transparent whitespace-nowrap translate-y-3 sm:translate-y-6">
          {backgroundWatermark}
        </span>
      </div>
    </footer>
  );
}

export default Footer1;
