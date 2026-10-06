"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  X,
  ArrowLeft,
  ArrowUpRight,
  ChevronRight,
  Award,
  BadgeCheck,
  BedDouble,
  BookOpen,
  Bus,
  ChartColumn,
  ClipboardList,
  FileSignature,
  FileText,
  HeartPulse,
  Library,
  ShieldCheck,
  Theater,
  Trophy,
  UserCheck,
  UserRound,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AboutChildMenuProps {
  onBack: () => void;
  onClose?: () => void;
}

interface LeafLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface LinkGroup {
  title: string;
  items: LeafLink[];
}

interface MenuEntry {
  label: string;
  /** Plain link — or groups, which open the next menu level */
  href?: string;
  groups?: LinkGroup[];
}

// Two columns of About links; entries with `groups` open a second level
const menuColumns: MenuEntry[][] = [
  [
    { label: "Overview", href: "#about" },
    {
      label: "Administration",
      groups: [
        {
          title: "Leadership",
          items: [
            { label: "Vice-Chancellor", href: "#leadership", icon: UserRound },
            { label: "Rector", href: "#leadership", icon: UserCheck },
            { label: "Registrar", href: "#leadership", icon: FileSignature },
          ],
        },
        {
          title: "Offices",
          items: [
            { label: "Examinations", href: "#notifications", icon: ClipboardList },
            { label: "Academic Affairs", href: "#colleges", icon: BookOpen },
            { label: "Finance", href: "#contact", icon: Wallet },
          ],
        },
      ],
    },
    {
      label: "Accreditation",
      groups: [
        {
          title: "Rankings",
          items: [
            { label: "NAAC A+", href: "#about", icon: Award },
            { label: "NIRF Ranking", href: "#about", icon: ChartColumn },
            { label: "UGC Category-I", href: "#about", icon: BadgeCheck },
          ],
        },
        {
          title: "Quality",
          items: [
            { label: "IQAC", href: "#about", icon: ShieldCheck },
            { label: "AQAR Reports", href: "#about", icon: FileText },
          ],
        },
      ],
    },
  ],
  [
    { label: "History", href: "#about" },
    {
      label: "Campus Life",
      groups: [
        {
          title: "Living",
          items: [
            { label: "Hostels", href: "#gallery", icon: BedDouble },
            { label: "Health Centre", href: "#gallery", icon: HeartPulse },
            { label: "Sports", href: "#gallery", icon: Trophy },
          ],
        },
        {
          title: "Facilities",
          items: [
            { label: "Library", href: "#centres", icon: Library },
            { label: "Auditorium", href: "#events", icon: Theater },
            { label: "Transport", href: "#contact", icon: Bus },
          ],
        },
      ],
    },
    { label: "Contact", href: "#contact" },
  ],
];

const bigLinkClass =
  "group flex items-center gap-3 font-sans text-3xl sm:text-4xl lg:text-[42px] whitespace-nowrap font-bold tracking-tight text-white hover:text-[#23B5E9] transition-colors leading-none cursor-pointer";

const levelMotion = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
  transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
};

export default function AboutChildMenu({ onBack, onClose }: AboutChildMenuProps) {
  const [openEntry, setOpenEntry] = useState<MenuEntry | null>(null);

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="relative min-h-screen w-full shrink-0 bg-[#080B0D] text-white flex flex-col z-50 select-none"
    >
      {/* Top Header with Back (one level up) & Close Button */}
      <div className="w-full px-6 sm:px-12 py-5 flex items-center justify-between z-30 sticky top-0 bg-[#080B0D]/90 backdrop-blur-md border-b border-white/10">
        <button
          onClick={() => (openEntry ? setOpenEntry(null) : onBack())}
          className="p-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white transition-all cursor-pointer shadow-sm active:scale-95 flex items-center justify-center"
          aria-label={openEntry ? "Back to About menu" : "Back to menu"}
        >
          <ArrowLeft className="w-5 h-5 text-[#23B5E9]" />
        </button>

        <button
          onClick={onClose}
          className="p-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white transition-all cursor-pointer shadow-sm active:scale-95 flex items-center justify-center"
          aria-label="Close menu"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="mx-auto max-w-7xl w-full px-6 sm:px-10 lg:px-12 py-6 lg:py-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
        {/* ======================================================== */}
        {/* LEFT: campus card — stays put while the right side changes level */}
        {/* ======================================================== */}
        <div className="lg:col-span-4 xl:col-span-3">
          <div className="relative w-full max-w-[280px] mx-auto lg:mx-0 rounded-[28px] border-2 border-white/20 bg-gradient-to-b from-[#14191E] to-[#0A0D10] p-4 shadow-2xl overflow-hidden group hover:border-[#23B5E9]/50 transition-all duration-300">
            <div className="relative rounded-[22px] overflow-hidden bg-black aspect-[4/5] border border-white/10 flex flex-col justify-between p-5">
              <div className="relative z-10">
                <span className="text-xs font-mono font-bold text-[#FFB21A] tracking-widest uppercase">
                  SVU Campus
                </span>
                <p className="mt-3 text-xs sm:text-sm text-white/90 font-light leading-relaxed">
                  Seven decades of learning at the foothills of Tirumala — a NAAC A+ campus of
                  colleges, research centres and student life.
                </p>
              </div>

              <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500">
                <Image src="/megamenu/about.webp" alt="Sri Venkateswara University campus" fill className="object-cover" />
              </div>

              <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-[10px] font-mono text-white/60">Est. 1954 · Tirupati</span>
                <Link
                  href="#gallery"
                  onClick={handleNavClick}
                  className="w-6 h-6 rounded-full bg-white text-[#001546] flex items-center justify-center shadow-md"
                  aria-label="Explore the campus gallery"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="mt-4 px-1">
              <h4 className="text-xs sm:text-sm font-semibold text-white tracking-tight leading-snug">
                Sri Venkateswara University — Campus Tour
              </h4>
              <div className="mt-3 flex items-center gap-3 text-[11px] font-mono font-bold text-white/60">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFB21A]" />
                  NAAC A+
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#23B5E9]" />
                  UGC Category-I
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT: menu levels */}
        {/* ======================================================== */}
        <div className="lg:col-span-8 xl:col-span-9">
          <AnimatePresence mode="wait" initial={false}>
            {openEntry?.groups ? (
              <motion.div key={openEntry.label} {...levelMotion} className="lg:border-l lg:border-white/10 lg:pl-8 py-2">
                <button
                  onClick={() => setOpenEntry(null)}
                  className="group inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-white/50 hover:text-[#23B5E9] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
                  About
                </button>
                <h3 className="mt-3 font-sans text-3xl sm:text-4xl lg:text-[42px] whitespace-nowrap font-bold tracking-tight leading-none text-white">
                  {openEntry.label}
                </h3>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
                  {openEntry.groups.map((group) => (
                    <div key={group.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                      <span className="block text-sm font-medium text-white/50">{group.title}</span>
                      <ul className="mt-3 space-y-1">
                        {group.items.map(({ label, href, icon: Icon }) => (
                          <li key={label}>
                            <Link
                              href={href}
                              onClick={handleNavClick}
                              className="group flex items-center gap-3 rounded-lg py-1.5 text-[15px] text-white/90 hover:text-[#23B5E9] transition-colors"
                            >
                              <Icon className="w-[18px] h-[18px] text-white/60 group-hover:text-[#23B5E9] transition-colors" />
                              {label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="root" {...levelMotion} className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-6">
                {menuColumns.map((column, ci) => (
                  <div key={ci} className="py-2 lg:border-l lg:border-white/10 lg:pl-8 space-y-4 sm:space-y-5">
                    {column.map((entry) =>
                      entry.groups ? (
                        <button
                          key={entry.label}
                          onClick={() => setOpenEntry(entry)}
                          className={bigLinkClass}
                          aria-haspopup="menu"
                        >
                          <span className="inline-block transition-transform duration-200 group-hover:translate-x-2">
                            {entry.label}
                          </span>
                          {/* Child-menu indicator */}
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#23B5E9]/40 bg-[#23B5E9]/10 text-[#23B5E9] transition-all duration-200 group-hover:translate-x-2 group-hover:bg-[#23B5E9] group-hover:text-[#080B0D]">
                            <ChevronRight className="h-4 w-4" />
                          </span>
                        </button>
                      ) : (
                        <Link key={entry.label} href={entry.href ?? "#"} onClick={handleNavClick} className={bigLinkClass}>
                          <span className="inline-block transition-transform duration-200 group-hover:translate-x-2">
                            {entry.label}
                          </span>
                        </Link>
                      ),
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
