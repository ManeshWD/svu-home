"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Volume2, VolumeX, Bell } from "lucide-react";
import { motion } from "motion/react";
import HoverImageLinks from "./HoverImageLinks";
import MenuToggleIcon from "./MenuToggleIcon";
import MobileMenu from "./mobile/MobileMenu";
import { APP_EVENTS, emitAppEvent, useUnreadCount } from "./mobile/appEvents";
import { REVEAL_NAV_EVENT, TubelightNavbar, type TubelightNavItem } from "./ui/tubelight-navbar";
import { megaMenuCategories, siteSearchEntries } from "@/data/megaMenu";
import PixelButton from "./PixelButton";
import NaacBadge from "./NaacBadge";

const MENU_CLOSE_MS = 300;

export default function Hero() {
  const [isMuted, setIsMuted] = useState(true);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const [activeCategory, setActiveCategory] = useState("admissions");
  const [expandedSubItem, setExpandedSubItem] = useState<string | null>(null);
  const [activeNavTab, setActiveNavTab] = useState("Home");
  const unreadAlerts = useUnreadCount();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sticky nav: show while scrolling up once the hero's own nav is off-screen
  const [showStickyNav, setShowStickyNav] = useState(false);
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (y < window.innerHeight * 0.6) setShowStickyNav(false);
      else if (delta < -4) setShowStickyNav(true);
      else if (delta > 4) setShowStickyNav(false);
      if (Math.abs(delta) > 4) lastY = y;
    };
    // Ctrl/⌘+K while neither nav copy is on screen slides the sticky one in
    const onReveal = () => {
      if (window.scrollY >= window.innerHeight * 0.6) setShowStickyNav(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener(REVEAL_NAV_EVENT, onReveal);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener(REVEAL_NAV_EVENT, onReveal);
    };
  }, []);

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Unmount (and unlock page scroll) only after the exit animation finishes
  const closeMegaMenu = () => {
    setIsMenuClosing(true);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
      setIsMenuClosing(false);
      setExpandedSubItem(null);
    }, MENU_CLOSE_MS);
  };

  const openMegaMenu = (categoryId?: string) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setIsMenuClosing(false);
    setIsMegaMenuOpen(true);
    if (categoryId) {
      setActiveCategory(categoryId);
    }
    setExpandedSubItem(null);
  };

  const toggleSubItem = (label: string) => {
    setExpandedSubItem((prev) => (prev === label ? null : label));
  };

  // The mobile tab bar / top bar ask the hero to open its mega menu
  useEffect(() => {
    const onOpen = () => openMegaMenu();
    window.addEventListener(APP_EVENTS.openMenu, onOpen);
    return () => window.removeEventListener(APP_EVENTS.openMenu, onOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (expandedSubItem) {
          setExpandedSubItem(null);
        } else {
          closeMegaMenu();
        }
      }
    };
    const unlock = () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
    // Unlock as soon as closing starts, not after the fade: the page
    // scrollbar then returns underneath the fading overlay instead of
    // leaving an empty strip that snaps back 300ms later
    if (isMegaMenuOpen && !isMenuClosing) {
      window.addEventListener("keydown", handleKeyDown);
      // Pad by the page scrollbar's width so hiding it doesn't shift the layout;
      // the overlay's own (identically styled) scrollbar fills that strip
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      unlock();
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      unlock();
    };
  }, [isMegaMenuOpen, isMenuClosing, expandedSubItem]);

  // Autoplay video setup — while muted, decoding pauses when the hero is
  // scrolled out of view (nothing visible changes) and resumes as it comes
  // back; unmuted playback keeps going so the audio isn't cut off
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const play = () =>
      video.play().catch((err) => {
        console.log("Autoplay waiting for user gesture:", err);
      });
    play();
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (video.paused) play();
      } else if (!video.paused && video.muted) {
        video.pause();
      }
    });
    io.observe(video);
    return () => io.disconnect();
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const currentCategoryData =
    megaMenuCategories.find((c) => c.id === activeCategory) ||
    megaMenuCategories[0];

  // Tubelight nav pill — rendered in the hero header and again as the
  // scroll-up sticky copy (each with its own lamp layoutId)
  const navItems: TubelightNavItem[] = [
    { name: "Home", url: "#hero" },
    { name: "About Us", url: "/about" },
    { name: "Colleges", url: "/colleges/arts" },
    { name: "Faculty", url: "/people/faculty" },
    { name: "Contact", url: "/contact" },
  ];
  const renderNav = (layoutId: string) => (
    <TubelightNavbar
      items={navItems}
      activeTab={activeNavTab}
      onActiveTabChange={setActiveNavTab}
      onMenuClick={() => openMegaMenu()}
      menuOpen={isMegaMenuOpen && !isMenuClosing}
      searchEntries={siteSearchEntries}
      layoutId={layoutId}
    />
  );

  return (
    <section id="hero" className="relative w-full min-h-[100svh] lg:h-screen lg:max-h-screen overflow-hidden bg-[#001546] text-white select-none flex flex-col">
      {/* ======================================================== */}
      {/* HOVER IMAGE LINKS MEGA MENU OVERLAY */}
      {/* ======================================================== */}
      {isMegaMenuOpen && (
        <motion.div
          // Full transform strings (not x/y) so Motion can run this on the GPU
          initial={{ opacity: 0, transform: "translateY(24px)" }}
          animate={
            isMenuClosing
              ? { opacity: 0, transform: "translateY(16px)" }
              : { opacity: 1, transform: "translateY(0px)" }
          }
          transition={{ duration: isMenuClosing ? MENU_CLOSE_MS / 1000 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={`svu-scroll fixed inset-0 z-50 bg-[#FFF9EE] lg:bg-neutral-950 text-white flex flex-col overflow-y-auto lg:overflow-y-scroll ${
            isMenuClosing ? "pointer-events-none" : ""
          }`}
          role="dialog"
          aria-modal="true"
        >
          {/* Phones/tablets: simple stacked menu; desktop keeps the hover-image menu */}
          <div className="lg:hidden">
            <MobileMenu
              categories={megaMenuCategories}
              searchEntries={siteSearchEntries}
              onClose={() => closeMegaMenu()}
            />
          </div>
          <div className="hidden lg:flex lg:flex-col">
            <HoverImageLinks onClose={() => closeMegaMenu()} />
          </div>
        </motion.div>
      )}

      {/* Mobile Top Header (Visible on small screens) with NO bg color and text in white */}
      <div className="lg:hidden flex items-center justify-between px-6 py-2.5 bg-[#001546] border-b border-white/10 z-40 relative flex-shrink-0">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/svu-color-crest.webp" unoptimized
            alt="Sri Venkateswara University Logo"
            width={48}
            height={48}
            className="h-11 w-auto object-contain"
            priority
          />
          <div>
            <span className="block text-xs font-serif font-black tracking-tight leading-none text-white uppercase">
              SRI VENKATESWARA
            </span>
            <span className="block text-[10px] font-sans font-semibold tracking-widest text-[#23B5E9] uppercase mt-0.5">
              UNIVERSITY
            </span>
          </div>
          {/* NAAC A+ badge beside the university name — on a white disc so
              its dark lettering stays legible on the navy header */}
          <NaacBadge className="h-12" />
        </Link>

        <div className="flex items-center gap-2">
        {/* Alerts (opens the mobile alerts sheet) */}
        <button
          onClick={() => emitAppEvent(APP_EVENTS.openAlerts)}
          className="relative flex h-10 w-10 items-center justify-center bg-[#001B54] text-white rounded-full border border-white/10 active:scale-95 transition-transform"
          aria-label={unreadAlerts ? `Alerts (${unreadAlerts} new)` : "Alerts"}
        >
          <Bell className="w-5 h-5" />
          {unreadAlerts > 0 && (
            <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-[#001546] bg-[#D23F12] px-1 text-[10px] font-bold leading-none text-white">
              {unreadAlerts > 9 ? "9+" : unreadAlerts}
            </span>
          )}
        </button>

        {/* Mobile Hamburger Button - Icon Only */}
        <button
          onClick={() => openMegaMenu()}
          className="flex h-10 w-10 items-center justify-center bg-[#001B54] text-white rounded-full border border-white/10 hover:bg-[#1F45D6] active:scale-95 transition-colors"
          aria-label="Open mega menu"
          aria-expanded={isMegaMenuOpen && !isMenuClosing}
        >
          <MenuToggleIcon open={isMegaMenuOpen && !isMenuClosing} />
        </button>
        </div>
      </div>

      {/* Same capsule pinned to the viewport — revealed only while scrolling
          back up past the hero, tucked away while scrolling down */}
      <div
        className={`fixed top-4 right-6 xl:right-10 z-40 hidden lg:block transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
          showStickyNav ? "translate-y-0" : "-translate-y-[calc(100%+4rem)] pointer-events-none"
        }`}
        aria-hidden={!showStickyNav}
        inert={!showStickyNav}
      >
        {renderNav("sticky-nav-lamp")}
      </div>

      {/* ======================================================== */}
      {/* MAIN SPLIT GRID (Takes available space above marquee) */}
      {/* ======================================================== */}
      <div className="flex-1 min-h-0 grid grid-cols-1 grid-rows-[auto_1fr] lg:grid-rows-1 lg:grid-cols-12 overflow-hidden">
        
        {/* ======================================================== */}
        {/* LEFT COLUMN: Deep Navy #001546 Hero */}
        {/* ======================================================== */}
        <div className="lg:col-span-5 bg-[#001546] flex flex-col justify-between px-6 sm:px-10 lg:px-12 xl:px-14 py-6 sm:py-8 lg:py-10 relative z-20 lg:h-full overflow-hidden">
          
          {/* Desktop University Logo (Transparent with pure white text, NO background color) */}
          <div className="hidden lg:block">
            <Link href="/" className="inline-flex items-center gap-3.5 group cursor-pointer">
              <Image
                src="/svu-color-crest.webp" unoptimized
                alt="Sri Venkateswara University"
                width={72}
                height={72}
                className="h-12 xl:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
                priority
              />
              <div className="flex flex-col">
                <span className="font-serif text-sm xl:text-lg font-bold tracking-tight text-white uppercase leading-snug">
                  Sri Venkateswara University
                </span>
                <span className="text-[10px] xl:text-[11px] font-sans font-semibold tracking-wider xl:tracking-widest text-[#FFE9C2] uppercase mt-0.5">
                  Tirupati, Andhra Pradesh • Est. 1954
                </span>
              </div>
              {/* NAAC A+ badge beside the university name — on a white disc so
                  its dark lettering stays legible on the navy header */}
              <NaacBadge className="ml-1 h-14 xl:h-16" />
            </Link>
          </div>

          {/* Hero Typography with typing animation. The block is a size
              container: the headline scales with the column width (cqi), so it is
              always exactly three lines — larger on wide screens, smaller on narrow */}
          <div className="@container my-auto py-4 lg:py-0 max-w-lg xl:max-w-xl 2xl:max-w-2xl">
            <h1 className="font-serif text-[clamp(1.5rem,9.4cqi,4.25rem)] font-bold text-white leading-[1.14] tracking-[-0.015em]">
              <span className="block whitespace-nowrap">World-class,</span>
              <span className="block whitespace-nowrap">modern university</span>
              <span className="block whitespace-nowrap">
                <TypingWord />
                <span className="inline-block w-[2.5px] h-[0.8em] bg-[#FFB21A] ml-1 animate-pulse align-middle" />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm lg:text-[15px] text-[#FFE9C2]/90 leading-relaxed font-normal max-w-md">
              NAAC A+ accredited premier institution empowering future leaders through groundbreaking research, world-class faculty, and global career opportunities.
            </p>

            {/* CTA Buttons */}
            <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3">
              <PixelButton
                href="#admissions"
                className="font-mono text-[11px] sm:text-xs font-black tracking-widest uppercase px-6 py-3 border-b-2 border-[#D23F12]"
                background="#FFB21A"
                pixelColor="#001546"
                fontDefaultColor="#001546"
                fontHoverColor="#FFB21A"
                pixelSize={14}
                staggerStep={0.02}
                reveal="random"
              >
                ADMISSIONS 2026
              </PixelButton>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: Full Bleed / Full Screen Video */}
        {/* ======================================================== */}
        <div className="lg:col-span-7 relative overflow-hidden bg-black min-h-[300px] sm:min-h-[420px] lg:min-h-0 lg:h-full">
          {/* Edge-to-edge video */}
          <video
            ref={videoRef}
            src="/svu-hero.mp4"
            poster="/svu-hero-poster.webp"
            preload="auto"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Subtle cinematic vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30 pointer-events-none" />

          {/* Top Desktop Navigation — Floating Capsule with Glass Blur */}
          <header className="absolute top-0 right-0 left-0 hidden lg:flex items-center justify-end px-6 xl:px-10 pt-4 pb-2 z-30 pointer-events-none">
            <div className="pointer-events-auto">
              {renderNav("hero-nav-lamp")}
            </div>
          </header>

          {/* Sound Toggle Control */}
          <button
            onClick={toggleSound}
            className="absolute bottom-4 right-4 z-30 p-2.5 rounded-full bg-[#001546]/85 hover:bg-[#001546] text-white backdrop-blur-md transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            title={isMuted ? "Unmute Video" : "Mute Video"}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        </div>

      </div>

      {/* ======================================================== */}
      {/* FULL-WIDTH ACCREDITATION MARQUEE AT BOTTOM */}
      {/* ======================================================== */}
      <AccreditationMarquee />
    </section>
  );
}

// Animated typing words for the university hero
const DYNAMIC_WORDS = [
  "education",
  "research",
  "innovation",
  "excellence",
  "leadership",
];

/**
 * Typing animation — its own component so each keystroke re-renders only
 * this span, not the whole hero (navbars, mega menu, video card)
 */
function TypingWord() {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetWord = DYNAMIC_WORDS[wordIndex];
    let timeoutId: NodeJS.Timeout;

    if (isDeleting) {
      if (currentText.length > 0) {
        timeoutId = setTimeout(() => {
          setCurrentText(targetWord.substring(0, currentText.length - 1));
        }, 50);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % DYNAMIC_WORDS.length);
        timeoutId = setTimeout(() => {}, 300);
      }
    } else {
      if (currentText.length < targetWord.length) {
        timeoutId = setTimeout(() => {
          setCurrentText(targetWord.substring(0, currentText.length + 1));
        }, 110);
      } else {
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [currentText, isDeleting, wordIndex]);

  return (
    <span className="capitalize text-[#FFB21A]">
      {currentText}
    </span>
  );
}

const HERO_ACCREDITATIONS = [
  "NAAC A+ Accredited",
  "Category-I University",
  "Est. 1954",
];

/** Accreditation marquee — runs edge to edge along the base of the entire hero section */
function AccreditationMarquee() {
  return (
    <div
      className="relative z-30 w-full flex-shrink-0 overflow-hidden border-y border-[#D23F12]/40 bg-[#FFB21A] py-2.5 sm:py-3"
      role="region"
      aria-label="Accreditations"
    >
      {/* Screen readers get the list once; the scrolling copy is decorative */}
      <ul className="sr-only">
        {HERO_ACCREDITATIONS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="animate-marquee motion-reduce:animate-none" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {Array.from({ length: 6 }, () => HERO_ACCREDITATIONS)
              .flat()
              .map((item, i) => (
                <span
                  key={`${copy}-${i}`}
                  className="flex items-center whitespace-nowrap text-xs sm:text-sm font-black uppercase tracking-[0.18em] text-[#001546]"
                >
                  <span className="px-6 sm:px-8">{item}</span>
                  <svg viewBox="0 0 480 480" className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#D23F12]" aria-hidden="true">
                    <path
                      d="M480 210H312.4L430.9 91.5l-42.4-42.4L270 167.6V0h-60v167.6L91.5 49.1 49.1 91.5 167.6 210H0v60h167.6L49.1 388.5l42.4 42.4L210 312.4V480h60V312.4l118.5 118.5 42.4-42.4L312.4 270H480v-60z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
