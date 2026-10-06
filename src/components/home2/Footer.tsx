"use client";

import React, { useState } from "react";
import Link from "next/link";
import OutlineWord from "./OutlineWord";

/* =========================================================
   Link Data
   ========================================================= */
const universityLinks = [
  { label: "Homepage", href: "/home2" },
  { label: "About Us", href: "/home2#about" },
  { label: "Insights", href: "/home2#insights" },
  { label: "Campus Life", href: "/home2#campus" },
  { label: "Contact Us", href: "/home2#contact" },
];

const academicLinks = [
  { label: "Colleges & Departments", href: "/home2#colleges" },
  { label: "Admissions & Programs", href: "/home2#admissions" },
  { label: "Research & Ph.D. Studies", href: "/home2#research" },
  { label: "Examinations & Results", href: "/home2#exams" },
  { label: "Community & Outreach", href: "/home2#community" },
];

const contactCells = [
  { label: "INFO@SVUNIVERSITY.EDU.IN", href: "mailto:info@svuniversity.edu.in" },
  { label: "FACEBOOK", href: "https://facebook.com" },
  { label: "X", href: "https://x.com" },
  { label: "LINKEDIN", href: "https://linkedin.com" },
];

/* Pixel arrow icon matching Image 2 */
function PixelArrowDiagonal() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      className="w-3.5 h-3.5 shrink-0 text-[#7A88C0] group-hover:text-white transition-colors"
      aria-hidden="true"
    >
      {/* 8-bit / pixel diagonal arrow ↗ */}
      <rect x="5" y="2" width="9" height="2" />
      <rect x="12" y="4" width="2" height="7" />
      <rect x="10" y="4" width="2" height="2" />
      <rect x="8" y="6" width="2" height="2" />
      <rect x="6" y="8" width="2" height="2" />
      <rect x="4" y="10" width="2" height="2" />
      <rect x="2" y="12" width="2" height="2" />
    </svg>
  );
}

/* Horizontal pixel arrow for the bottom wordmark */
function PixelArrowRight({ className = "w-6 h-6 sm:w-10 sm:h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`shrink-0 ${className}`} aria-hidden="true">
      <rect x="2" y="11" width="14" height="2" />
      <rect x="12" y="7" width="2" height="2" />
      <rect x="14" y="9" width="2" height="2" />
      <rect x="16" y="11" width="2" height="2" />
      <rect x="14" y="13" width="2" height="2" />
      <rect x="12" y="15" width="2" height="2" />
    </svg>
  );
}

/* Shield emblem matching Image 2 */
function IvyShieldEmblem({ className = "w-7 h-8 sm:w-10 sm:h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 42" fill="none" xmlns="http://www.w3.org/2000/svg" className={`shrink-0 ${className}`}>
      {/* Outer shield border */}
      <path
        d="M2 6C2 4 4 2 6 2H30C32 2 34 4 34 6V22C34 31 26 38 18 40C10 38 2 31 2 22V6Z"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      {/* Inner foliage / branching veins */}
      <path d="M18 10V32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 16C13 14 10 16 8 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 16C23 14 26 16 28 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 24C13 22 10 24 9 27" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 24C23 22 26 24 27 27" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubmitted(true);
  };

  return (
    <footer className="w-full bg-[#040323] text-[#CBD5E1] pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 overflow-hidden">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 md:px-14 lg:px-20">
        {/* =========================================================
            BORDERED PANEL WITH INDIGO CORNER BRACKETS
            ========================================================= */}
        <div className="relative">
          {/* Top-Right Corner Bracket (Luminous Indigo ┐) */}
          <span className="absolute -right-3 -top-3 sm:-right-4 sm:-top-4 w-7 h-7 sm:w-10 sm:h-10 border-t-[3px] border-r-[3px] border-[#818CF8] pointer-events-none z-20" />

          {/* Bottom-Left Corner Bracket (Luminous Indigo └) */}
          <span className="absolute -left-3 -bottom-3 sm:-left-4 sm:-bottom-4 w-7 h-7 sm:w-10 sm:h-10 border-b-[3px] border-l-[3px] border-[#818CF8] pointer-events-none z-20" />

          {/* Main Enclosed Card */}
          <div className="border border-[#181552] bg-[#080634]/90 backdrop-blur-xs">
            {/* ---------------------------------------------------
                ROW 1: Navigation Columns + Subscribe Form
                --------------------------------------------------- */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1.4fr]">
              {/* Column 1: Sri Venkateswara */}
              <div className="border-b border-[#181552] px-6 py-8 sm:px-9 sm:py-10 lg:border-b-0 lg:border-r">
                <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#8E9CCF]">
                  Sri Venkateswara
                </h3>
                <ul className="mt-5 space-y-3">
                  {universityLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm sm:text-[15px] text-[#B6C2EE] hover:text-white transition-colors duration-150 inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Academics */}
              <div className="border-b border-[#181552] px-6 py-8 sm:px-9 sm:py-10 lg:border-b-0 lg:border-r">
                <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#8E9CCF]">
                  Academics & Research
                </h3>
                <ul className="mt-5 space-y-3">
                  {academicLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm sm:text-[15px] text-[#B6C2EE] hover:text-white transition-colors duration-150 inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Subscribe Form */}
              <div className="px-6 py-8 sm:px-9 sm:py-10">
                <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#8E9CCF]">
                  Subscribe
                </h3>
                <p className="mt-4 text-xs sm:text-[13px] leading-relaxed text-[#8E9CCF]">
                  Join our newsletter to stay up to date on features and releases.
                </p>

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="mt-5 flex">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      aria-label="Email address"
                      className="min-w-0 flex-1 bg-[#0D0B44] border border-[#1C1866] px-4 py-3 text-xs sm:text-sm text-white placeholder-[#586498] focus:outline-none focus:border-[#818CF8]"
                    />
                    <button
                      type="submit"
                      className="bg-[#818CF8] hover:bg-[#A5B4FC] text-[#040323] font-bold text-xs sm:text-sm px-6 py-3 transition-colors shrink-0 cursor-pointer"
                    >
                      Subscribe
                    </button>
                  </form>
                ) : (
                  <p className="mt-5 bg-[#0D0B44] border border-[#1C1866] p-3 text-xs text-[#A5B4FC] font-medium">
                    Thank you! Updates will be sent to {email}.
                  </p>
                )}

                <p className="mt-3.5 text-[11px] leading-relaxed text-[#6A78AB]">
                  By subscribing you agree to with our Privacy Policy and provide consent to receive updates from our university.
                </p>
              </div>
            </div>

            {/* ---------------------------------------------------
                ROW 2: Contact Cells (Horizontal grid with pixel arrows)
                --------------------------------------------------- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-[#181552] divide-y sm:divide-y-0 sm:divide-x divide-[#181552]">
              {contactCells.map((cell) => {
                const external = cell.href.startsWith("http");
                return (
                  <a
                    key={cell.label}
                    href={cell.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="group flex items-center justify-between px-6 py-4 sm:px-8 text-xs font-bold uppercase tracking-[0.14em] text-[#B6C2EE] hover:text-white hover:bg-[#0D0B44] transition-colors"
                  >
                    <span className="truncate">{cell.label}</span>
                    <PixelArrowDiagonal />
                  </a>
                );
              })}
            </div>

            {/* ---------------------------------------------------
                ROW 3: Legal & Copyright Bar
                --------------------------------------------------- */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-[#181552] px-6 py-5 sm:px-9 text-xs text-[#8E9CCF] gap-3">
              <p>
                &copy; {new Date().getFullYear()} Sri Venkateswara University. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <Link href="/home2#privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/home2#terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            BOTTOM WORDMARK: Image 1 & 2 Style Oversized Brand Line
            "→ SV 🛡️ UNIVERSITY →" (Per user request: "make this sv university")
            ========================================================= */}
        <div className="mt-12 sm:mt-16 overflow-hidden select-none">
          <div className="flex items-center justify-center gap-[clamp(0.6rem,1.7vw,28px)] text-[#9AA8EE] flex-wrap sm:flex-nowrap">
            {/* Pixel arrow */}
            <PixelArrowRight className="w-[clamp(1.6rem,3.4vw,52px)] h-[clamp(1.6rem,3.4vw,52px)] text-[#9AA8EE]" />

            {/* SV — positive tracking: outlined glyphs need daylight between
                them, otherwise letters like R/V/Y visibly overlap */}
            <OutlineWord className="font-black text-[clamp(2.25rem,8vw,124px)] uppercase tracking-[0.02em] text-[#9AA8EE]">
              SV
            </OutlineWord>

            {/* Shield Emblem with leaf branches */}
            <IvyShieldEmblem className="w-[clamp(1.9rem,4.2vw,64px)] h-[clamp(2.3rem,5vw,76px)] text-[#9AA8EE]" />

            {/* UNIVERSITY */}
            <OutlineWord className="font-black text-[clamp(2.25rem,8vw,124px)] uppercase tracking-[0.02em] text-[#9AA8EE]">
              UNIVERSITY
            </OutlineWord>

            {/* Pixel arrow */}
            <PixelArrowRight className="w-[clamp(1.6rem,3.4vw,52px)] h-[clamp(1.6rem,3.4vw,52px)] text-[#9AA8EE] hidden sm:inline-block" />
          </div>
        </div>
      </div>
    </footer>
  );
}
