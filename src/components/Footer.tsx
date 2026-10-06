"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import RotatingGlobe from "@/components/RotatingGlobe";
import VectorWordmark from "@/components/VectorWordmark";
import { FanWatermark } from "@/components/FanWatermark";

const quickLinks = [
  { label: "Admissions 2026", href: "#admissions" },
  { label: "Colleges & Faculties", href: "#colleges" },
  { label: "Centres & Institutes", href: "#centres" },
  { label: "Research & Ph.D.", href: "#" },
  { label: "Campus Placements", href: "#employers" },
  { label: "Student Life & Hostels", href: "#gallery" },
  { label: "Contact Administration", href: "#contact" },
];

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Twitter", href: "https://twitter.com" },
  { label: "YouTube", href: "https://youtube.com" },
];

const legalLinks = [
  { label: "Terms of service", href: "#" },
  { label: "Privacy policy", href: "#" },
  { label: "Cookie policy", href: "#" },
  { label: "RTI & Governance", href: "#" },
  { label: "NAAC Accreditation", href: "#" },
];

const DURATION = 0.25;
const STAGGER = 0.025;

interface FlipLinkProps {
  children: string;
  href: string;
  target?: string;
  rel?: string;
}

const FlipLink = ({ children, href, target, rel }: FlipLinkProps) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      target={target}
      rel={rel}
      className="relative inline-block overflow-hidden whitespace-nowrap text-xs sm:text-[13px] font-medium text-[#FFE9C2]/70 hover:text-white transition-colors duration-150"
      style={{ lineHeight: 1.25 }}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block text-[#FFB21A]"
            key={i}
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};

export default function Footer() {
  const [emailSubscribed, setEmailSubscribed] = useState(false);

  return (
    <footer className="relative bg-[#001546] text-[#FFE9C2] pt-6 sm:pt-10 pb-14 overflow-hidden">
      {/* Background Ambient Glows */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-[#1F45D6]/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-[#23B5E9]/5 blur-[100px]"
        aria-hidden="true"
      />

      {/* ========================================================
          WHERE WE ARE LOCATED: SACRED TIRUPATI FOOTHILLS & 3D GLOBE
         ======================================================== */}
      <div className="relative pb-12 sm:pb-16 border-b border-white/10">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="relative grid grid-cols-1 lg:grid-cols-12 items-center min-h-[360px] sm:min-h-[400px] lg:min-h-[420px]">
            {/* Left Side: Headline, Subtitle, Devotional Touch, CTAs */}
            <div className="z-10 py-6 sm:py-8 lg:col-span-6 lg:pr-6 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#FFB21A] animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFB21A]">
                  Where We Are Located • Tirupati
                </span>
              </div>

              <h2 className="font-serif text-[28px] sm:text-[38px] lg:text-[44px] font-bold leading-[1.15] tracking-tight text-white">
                Nestled in the Sacred Foothills of Tirumala
              </h2>

              <p className="mt-3.5 text-sm sm:text-base text-[#FFE9C2]/85 max-w-lg leading-relaxed">
                Situated at the sacred foothills of Tirumala in the holy city of Tirupati, our campus thrives under divine inspiration — uniting timeless spiritual serenity with academic pursuit.
              </p>

              {/* Location Badges */}
              <div className="mt-5 flex flex-wrap items-center gap-2.5 text-xs text-[#FFE9C2]/75 font-mono">
                <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                  Alipiri Bypass Road, Tirupati, AP 517502
                </span>
                <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                  Holy Seshachalam Foothills
                </span>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <a
                  href="https://maps.google.com/?q=Sri+Venkateswara+University+Tirupati"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#001546] shadow-md transition-all duration-200 hover:bg-[#FFB21A] hover:text-[#001546] hover:shadow-lg hover:shadow-[#FFB21A]/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  Get Directions
                </a>
                <Link
                  href="#about"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10 hover:border-white/40 cursor-pointer"
                >
                  Explore Campus
                </Link>
              </div>
            </div>

            {/* Right Side: Interactive 3D Dotted Rotating Globe */}
            <div className="relative lg:col-span-6 h-[320px] sm:h-[390px] lg:h-[450px] w-full flex items-center justify-center overflow-hidden">
              <RotatingGlobe />
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* ========================================================
            FOOTER BOTTOM CONTENT (Exact Reference Layout)
           ======================================================== */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 pt-2 pb-14 border-b border-white/10">
          {/* Left Column: Brand Logo, Address, Contact Info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              {/* University crest — the white-scroll version reads on navy */}
              <div className="flex items-center gap-3.5">
                <Image
                  src="/svu-logo.webp"
                  alt="Sri Venkateswara University crest"
                  width={1166}
                  height={1349}
                  className="h-14 w-auto shrink-0"
                />
                <div className="flex flex-col">
                  <span className="font-serif text-lg font-bold tracking-tight text-white leading-none">
                    Sri Venkateswara University
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#23B5E9] mt-0.5">
                    Tirupati &middot; Est. 1954
                  </span>
                </div>
              </div>

              {/* Physical Address */}
              <address className="mt-5 not-italic text-xs sm:text-[13px] leading-relaxed text-[#FFE9C2]/70 max-w-sm space-y-0.5">
                <p>Alipiri Bypass Road, SVU Campus</p>
                <p>Tirupati, Chittoor District</p>
                <p>Andhra Pradesh 517502</p>
                <p>India</p>
              </address>
            </div>

            {/* Contact Details (Phone & Email) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#5A6382]">
                  Phone number
                </p>
                <a
                  href="tel:+918772289544"
                  className="mt-1 inline-block text-xs sm:text-[13px] font-medium text-[#FFE9C2] hover:text-[#FFB21A] transition-colors"
                >
                  +91 877 2289544
                </a>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#5A6382]">
                  Email
                </p>
                <a
                  href="mailto:registrar@svuniversity.edu.in"
                  className="mt-1 inline-block text-xs sm:text-[13px] font-medium text-[#FFE9C2] hover:text-[#FFB21A] transition-colors"
                >
                  registrar@svuniversity.edu.in
                </a>
              </div>
            </div>
          </div>

          {/* Right Columns: Quick links, Social, Legal (Clean Columns matching Reference) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:pl-10">
            {/* Quick links */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Quick links
              </h3>
              <ul className="mt-5 space-y-3">
                {quickLinks.map((item) => (
                  <li key={item.label}>
                    <FlipLink href={item.href}>
                      {item.label}
                    </FlipLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Social
              </h3>
              <ul className="mt-5 space-y-3">
                {socialLinks.map((item) => (
                  <li key={item.label}>
                    <FlipLink href={item.href} target="_blank" rel="noreferrer">
                      {item.label}
                    </FlipLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Legal
              </h3>
              <ul className="mt-5 space-y-3">
                {legalLinks.map((item) => (
                  <li key={item.label}>
                    <FlipLink href={item.href}>
                      {item.label}
                    </FlipLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ========================================================
            SV UNIVERSITY WORDMARK (Originkit Vector Wordmark)
           ======================================================== */}
        <div className="pt-10 sm:pt-14" aria-hidden="true">
          <VectorWordmark
            text="SV UNIVERSITY"
            font={{
              fontFamily: "Plus Jakarta Sans",
              fontWeight: 800,
              fontSize: "155px",
              letterSpacing: "-0.02em",
            }}
            background="transparent"
            textColor="#FFB21A"
            shade="#1F45D6"
            accent="rgba(35, 181, 233, 0.55)"
            style={{ minWidth: 0, minHeight: 0, height: "auto", aspectRatio: "1200 / 190" }}
          />
        </div>

        {/* ========================================================
            BOTTOM BAR (Copyright on left, Made with love on right)
           ======================================================== */}
        <div className="pt-8 pb-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8F9CAE] sm:text-[#FFE9C2]/60 font-medium">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} Sri Venkateswara University. All rights reserved.
          </p>

          <div className="flex items-center gap-1.5 text-center sm:text-right">
            <span>Made with love</span>
            <Heart
              className="w-3.5 h-3.5 text-[#FFB21A] fill-[#FFB21A] svu-heartbeat drop-shadow-[0_0_6px_rgba(255,178,26,0.6)] shrink-0"
              aria-label="love"
            />
            <span>by</span>
            <a
              href="https://flyingstars.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#23B5E9] hover:text-[#FFB21A] font-semibold tracking-wide transition-colors underline-offset-4 hover:underline cursor-pointer"
            >
              flyingstars
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

