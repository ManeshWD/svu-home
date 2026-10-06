"use client";

import React, { useState, useEffect, useRef, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";

interface HeaderProps {
  currentPath?: string;
}

/* =========================================================
   University Collegiate Navigation Data (All English)
   ========================================================= */
interface ChildLink {
  label: string;
  href: string;
  external?: boolean;
}

interface ParentMenuItem {
  id: string;
  title: string;
  href: string;
  categoryLabel: string;
  badge: {
    iconBg: string;
    text: string;
    subText?: string;
  };
  children: ChildLink[];
}

const menuData: ParentMenuItem[] = [
  {
    id: "colleges",
    title: "Our Colleges",
    href: "/home2#colleges",
    categoryLabel: "ACADEMIC DIVISIONS",
    badge: {
      iconBg: "#4338CA",
      text: "SVU Constituent Colleges",
      subText: "Arts • Sciences • Engineering",
    },
    children: [
      { label: "Undergraduate Admissions", href: "/home2#admissions" },
      { label: "Postgraduate Studies", href: "/home2#admissions" },
      { label: "Affiliated Institutes", href: "/home2#colleges" },
      { label: "Student & Faculty Portal", href: "https://portal.example.com", external: true },
    ],
  },
  {
    id: "academics",
    title: "Academic Programs",
    href: "/home2#academics",
    categoryLabel: "CENTRES OF EXCELLENCE",
    badge: {
      iconBg: "#3A86FF",
      text: "Advanced Interdisciplinary Hub",
      subText: "Research & Innovation",
    },
    children: [
      { label: "Arts & Humanities", href: "/home2#colleges" },
      { label: "Sciences & Technology", href: "/home2#colleges" },
      { label: "Engineering & Computing", href: "/home2#colleges" },
      { label: "Ph.D. & Doctoral Studies", href: "/home2#research", external: true },
    ],
  },
  {
    id: "heritage",
    title: "University Heritage",
    href: "/home2#heritage",
    categoryLabel: "HISTORIC LEGACY",
    badge: {
      iconBg: "#6366F1",
      text: "Established 1954 • Tirupati",
      subText: "NAAC 'A+' Grade University",
    },
    children: [
      { label: "Vision & Mission", href: "/home2#vision" },
      { label: "Leadership & Council", href: "/home2#about" },
      { label: "Accreditation & Rankings", href: "/home2#about" },
      { label: "Global Institutional Impact", href: "/home2#impact", external: true },
    ],
  },
  {
    id: "campus-life",
    title: "Campus Life",
    href: "/home2#campus",
    categoryLabel: "STUDENT COMMUNITY",
    badge: {
      iconBg: "#E76F51",
      text: "50,000+ Alumni Worldwide",
      subText: "Tirumala Foothills Campus",
    },
    children: [
      { label: "Central University Library", href: "/home2#campus" },
      { label: "Hostels & Campus Dining", href: "/home2#campus" },
      { label: "Sports & Cultural Clubs", href: "/home2#campus" },
      { label: "Global Alumni Association", href: "/home2#alumni", external: true },
    ],
  },
  {
    id: "careers",
    title: "Careers & Placements",
    href: "/home2#careers",
    categoryLabel: "CAREER ADVANCEMENT",
    badge: {
      iconBg: "#7B2CBF",
      text: "University Placement Cell",
      subText: "Top Global Recruiters",
    },
    children: [
      { label: "Campus Recruitment Drives", href: "/home2#employers" },
      { label: "Faculty Appointments", href: "/home2#careers" },
      { label: "Research Fellowships", href: "/home2#research" },
      { label: "Internship Opportunities", href: "/home2#placements", external: true },
    ],
  },
];

export default function Header({ currentPath = "/home2" }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [, startTransition] = useTransition();

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const parentItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Gradient fade overlay states
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);

  // Synchronize active parent on scroll of the left column
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const { scrollTop, scrollHeight, clientHeight } = container;

    setCanScrollUp(scrollTop > 8);
    setCanScrollDown(scrollHeight - scrollTop - clientHeight > 12);

    const containerCenter = scrollTop + clientHeight * 0.38;
    let closestIndex = 0;
    let minDistance = Infinity;

    parentItemRefs.current.forEach((el, index) => {
      if (!el) return;
      const itemCenter = el.offsetTop + el.clientHeight / 2;
      const distance = Math.abs(containerCenter - itemCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    startTransition(() => {
      setActiveIndex(closestIndex);
    });
  };

  // Hover on left parent item updates right side immediately with animation
  const handleParentHover = (index: number) => {
    setActiveIndex(index);
  };

  // When menu opens, reset scroll and calculate states
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      setActiveIndex(0);
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = 0;
          handleScroll();
        }
      }, 50);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const activeParent = menuData[activeIndex] || menuData[0];

  return (
    <>
      {/* =========================================================
          MAIN TOP BAR (Normal / Closed State)
          ========================================================= */}
      <header className="w-full bg-[#F3F0E6] text-[#040323] relative z-40 transition-colors duration-300 border-b border-[#040323]/5">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20 h-24 md:h-28 flex items-center justify-between">
          {/* Left: Brand Logo & University Name */}
          <Link
            href="/home2"
            className="flex items-center gap-3.5 group cursor-pointer select-none"
            aria-label="Sri Venkateswara University Home"
          >
            <div className="relative transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/SV-logo.webp"
                alt="Sri Venkateswara University Emblem"
                width={56}
                height={56}
                priority
                className="h-12 sm:h-13 md:h-14 w-auto object-contain drop-shadow-xs"
              />
            </div>

            <div className="flex flex-col justify-center">
              <span className="text-base sm:text-lg md:text-[21px] font-black uppercase tracking-tight text-[#040323] font-heading leading-tight">
                Sri Venkateswara
              </span>
              <span className="text-[11px] sm:text-xs md:text-sm font-extrabold uppercase tracking-[0.18em] text-[#4F46E5] leading-none mt-0.5">
                University
              </span>
            </div>
          </Link>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Our Colleges Pill Button */}
            <Link
              href="/home2#colleges"
              className="group bg-white hover:bg-white/90 text-[#040323] text-sm sm:text-base font-semibold px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-black/5 flex items-center gap-2.5 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-98"
            >
              <span className="w-5 h-5 rounded-full bg-[#040323] flex items-center justify-center text-white flex-shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5"
                >
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span className="tracking-tight">Our Colleges</span>
            </Link>

            {/* Menu Button */}
            <button
              onClick={() => setMenuOpen(true)}
              className="bg-[#040323] hover:bg-[#0D0A48] text-white text-sm sm:text-base font-semibold px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full shadow-sm flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-98 cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================
          FULLSCREEN NAVIGATION OVERLAY (Menu Opened State)
          ========================================================= */}
      <div
        className={`fixed inset-0 z-50 bg-[#F3F0E6] text-[#040323] flex flex-col overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen
            ? "opacity-100 pointer-events-auto visible"
            : "opacity-0 pointer-events-none invisible"
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Top Fixed Header Bar of Overlay */}
        <div className="relative z-40 w-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20 h-24 md:h-28 flex items-center justify-between bg-[#F3F0E6] shrink-0 border-b border-[#040323]/5">
          {/* Logo & University Name */}
          <Link
            href="/home2"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3.5 group cursor-pointer select-none"
          >
            <div className="relative transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/SV-logo.webp"
                alt="Sri Venkateswara University Emblem"
                width={56}
                height={56}
                priority
                className="h-12 sm:h-13 md:h-14 w-auto object-contain drop-shadow-xs"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-base sm:text-lg md:text-[21px] font-black uppercase tracking-tight text-[#040323] font-heading leading-tight">
                Sri Venkateswara
              </span>
              <span className="text-[11px] sm:text-xs md:text-sm font-extrabold uppercase tracking-[0.18em] text-[#4F46E5] leading-none mt-0.5">
                University
              </span>
            </div>
          </Link>

          {/* Close Button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="group flex items-center gap-2.5 text-[#040323] hover:text-[#4F46E5] font-semibold text-lg sm:text-xl transition-all duration-200 cursor-pointer p-2 -mr-2"
            aria-label="Close Navigation Menu"
          >
            <X className="w-6 h-6 transition-transform duration-200 group-hover:rotate-90" />
            <span className="tracking-tight">Close</span>
          </button>
        </div>

        {/* =======================================================
            ARTISTIC BACKGROUND SHAPES
            NO CROPPING: Ample padding/margin from all edges!
            STRICTLY BELOW HEADER: top-24 md:top-28
            ======================================================= */}
        <div className="absolute top-24 md:top-28 left-0 right-0 bottom-0 pointer-events-none overflow-hidden select-none z-0">
          {/* 1. Royal Indigo Triangle */}
          <div
            className={`menu-shape-drop absolute bottom-8 left-6 sm:left-10 w-[130px] sm:w-[170px] md:w-[210px] h-[150px] sm:h-[190px] md:h-[240px] z-[1] ${
              menuOpen ? "is-dropped" : ""
            }`}
            style={
              {
                "--drop-rotate": "-4deg",
                "--drop-delay": "60ms",
                "--drop-duration": "950ms",
              } as React.CSSProperties
            }
          >
            <svg
              viewBox="0 0 210 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-[0_4px_14px_rgba(99,102,241,0.25)]"
              preserveAspectRatio="xMidYMid meet"
            >
              <polygon points="10,230 200,230 105,20" fill="#6366F1" opacity="1" />
            </svg>
          </div>

          {/* 2. Soft Lavender-Periwinkle Circle */}
          <div
            className={`menu-shape-drop absolute bottom-8 left-[32%] sm:left-[38%] w-[180px] sm:w-[230px] md:w-[290px] h-[180px] sm:h-[230px] md:h-[290px] z-[2] ${
              menuOpen ? "is-dropped" : ""
            }`}
            style={
              {
                "--drop-rotate": "8deg",
                "--drop-delay": "200ms",
                "--drop-duration": "1000ms",
              } as React.CSSProperties
            }
          >
            <div className="w-full h-full rounded-full bg-[#A5B4FC] opacity-90 shadow-[0_8px_24px_rgba(165,180,252,0.28)]" />
          </div>

          {/* 3. Solid Sky Blue Cloud */}
          <div
            className={`menu-shape-drop absolute bottom-[160px] sm:bottom-[200px] left-[10%] sm:left-[14%] w-[160px] sm:w-[200px] md:w-[250px] h-[120px] sm:h-[150px] md:h-[190px] z-[3] ${
              menuOpen ? "is-dropped" : ""
            }`}
            style={
              {
                "--drop-rotate": "-5deg",
                "--drop-delay": "340ms",
                "--drop-duration": "1050ms",
              } as React.CSSProperties
            }
          >
            <svg
              viewBox="0 0 320 250"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full opacity-95 drop-shadow-[0_6px_16px_rgba(199,210,254,0.3)]"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d="M110 65C130 35 170 25 200 50C225 35 265 50 270 85C295 95 305 135 285 160C300 190 275 225 245 230C215 250 180 245 160 225C130 240 95 230 85 200C50 195 40 155 65 130C50 95 70 65 110 65Z"
                fill="#C7D2FE"
              />
            </svg>
          </div>
        </div>

        {/* Dynamic Top & Bottom Gradient Fade Overlays */}
        <div
          className={`pointer-events-none absolute top-24 md:top-28 left-0 right-0 h-16 sm:h-20 bg-gradient-to-b from-[#F3F0E6] via-[#F3F0E6]/90 to-transparent z-30 transition-opacity duration-300 ${
            canScrollUp ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />
        <div
          className={`pointer-events-none absolute bottom-0 left-0 right-0 h-24 sm:h-28 bg-gradient-to-t from-[#F3F0E6] via-[#F3F0E6]/90 to-transparent z-30 transition-opacity duration-300 ${
            canScrollDown ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />

        {/* =======================================================
            MAIN MASTER-DETAIL WORKSPACE
            Left: Collegiate Serif Parent Menu (Hover & Scroll Animated)
            Right: Dynamic Child Menu with Smooth Cascade Transitions
            ======================================================= */}
        <div className="relative z-20 flex-1 overflow-hidden">
          <div className="max-w-[1440px] mx-auto h-full px-6 sm:px-10 md:px-14 lg:px-20 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 lg:gap-20">
            {/* ---------------------------------------------------
                LEFT COLUMN: Collegiate Serif Parent Menus
                Interactive hover animations with forward slide & diamond indicator
                --------------------------------------------------- */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="md:col-span-7 h-full overflow-y-auto overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pt-6 sm:pt-10 pb-28 md:pb-36 pr-4 space-y-3 sm:space-y-5"
            >
              {menuData.map((parent, index) => {
                const isActive = activeIndex === index;
                return (
                  <div
                    key={parent.id}
                    ref={(el) => {
                      parentItemRefs.current[index] = el;
                    }}
                    onMouseEnter={() => handleParentHover(index)}
                    className="relative py-1"
                  >
                    <Link
                      href={parent.href}
                      onClick={() => setMenuOpen(false)}
                      className={`group flex items-center font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[66px] font-black tracking-tight leading-tight transition-all duration-300 ease-out cursor-pointer ${
                        isActive
                          ? "text-[#040323] translate-x-3 sm:translate-x-5 opacity-100"
                          : "text-[#040323]/40 hover:text-[#040323] hover:translate-x-2 opacity-60"
                      }`}
                    >
                      <span className="flex items-center gap-3 sm:gap-4">
                        {/* Collegiate diamond bullet indicator */}
                        <span
                          className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rotate-45 bg-[#6366F1] shrink-0 transition-all duration-300 ${
                            isActive
                              ? "scale-100 opacity-100"
                              : "scale-0 opacity-0 group-hover:scale-75 group-hover:opacity-70"
                          }`}
                        />
                        <span className="relative inline-block">
                          {parent.title}
                          {/* Animated indigo underline */}
                          <span
                            className={`absolute -bottom-1 left-0 h-[2.5px] rounded-full bg-[#6366F1] transition-all duration-300 ${
                              isActive ? "w-full" : "w-0 group-hover:w-10"
                            }`}
                          />
                        </span>
                      </span>
                    </Link>
                  </div>
                );
              })}

              {/* English University Action Button */}
              <div className="pt-6 sm:pt-8 flex items-center gap-3">
                <Link
                  href="/home2#admissions"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center justify-center bg-[#040323] hover:bg-[#0D0A48] text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all duration-200 active:scale-95 shadow-xs"
                >
                  Campus Directory
                </Link>
                <Link
                  href="https://portal.example.com"
                  target="_blank"
                  className="inline-flex items-center justify-center bg-white hover:bg-white/80 text-[#040323] border border-[#040323]/15 font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all duration-200 shadow-2xs"
                >
                  Student Login ↗
                </Link>
              </div>
            </div>

            {/* ---------------------------------------------------
                RIGHT COLUMN: Smooth Transitioning Child Menus
                Silk-smooth cascading transition when active parent changes!
                --------------------------------------------------- */}
            <div className="md:col-span-5 h-full flex flex-col justify-start md:justify-center pt-4 md:pt-0 pb-16 md:pb-24 md:pl-6 lg:pl-12">
              <div
                key={activeParent.id}
                className="animate-smoothMenu flex flex-col space-y-7 sm:space-y-9"
              >
                {/* Active Category Header */}
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#4F46E5]">
                  <span className="w-2 h-2 rounded-full bg-[#6366F1]" />
                  <span>{activeParent.title}</span>
                </div>

                {/* Cascading Child Links */}
                <div className="flex flex-col space-y-4 sm:space-y-5">
                  {activeParent.children.map((child, cIdx) => (
                    <div
                      key={child.label}
                      style={{
                        animation: `smoothMenuReveal 380ms cubic-bezier(0.16, 1, 0.3, 1) ${
                          cIdx * 50
                        }ms both`,
                      }}
                    >
                      {child.external ? (
                        <a
                          href={child.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-2xl sm:text-3xl md:text-[30px] font-bold text-[#040323] hover:text-[#4338CA] transition-all leading-tight group hover:translate-x-1.5 duration-200"
                        >
                          <span>{child.label}</span>
                          <span className="text-xl sm:text-2xl font-normal leading-none transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 text-[#6366F1] group-hover:text-[#040323]">
                            ↗
                          </span>
                        </a>
                      ) : (
                        <Link
                          href={child.href}
                          onClick={() => setMenuOpen(false)}
                          className="inline-block text-2xl sm:text-3xl md:text-[30px] font-bold text-[#040323] hover:text-[#4338CA] transition-all leading-tight hover:translate-x-1.5 duration-200"
                        >
                          {child.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                {/* Division / Centre of Excellence Pill Badge */}
                <div
                  style={{
                    animation: `smoothMenuReveal 380ms cubic-bezier(0.16, 1, 0.3, 1) ${
                      activeParent.children.length * 50 + 20
                    }ms both`,
                  }}
                  className="pt-2"
                >
                  <p className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#64748B] uppercase mb-4">
                    {activeParent.categoryLabel}
                  </p>

                  <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#EEF2FF] text-[#040323] border border-[#818CF8]/30 shadow-2xs hover:bg-[#E0E7FF] transition-all cursor-pointer">
                    <span
                      style={{ backgroundColor: activeParent.badge.iconBg }}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 shadow-xs"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                        <path d="M2 17L12 22L22 17V12L12 17L2 12V17Z" />
                      </svg>
                    </span>
                    <div className="flex flex-col text-left">
                      <span className="font-bold text-sm sm:text-base tracking-tight text-[#040323] leading-tight">
                        {activeParent.badge.text}
                      </span>
                      {activeParent.badge.subText && (
                        <span className="text-[11px] text-[#040323]/65 font-medium">
                          {activeParent.badge.subText}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
