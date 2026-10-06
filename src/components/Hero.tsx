"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Volume2, VolumeX, Menu, Bell } from "lucide-react";
import { motion } from "motion/react";
import HoverImageLinks from "./HoverImageLinks";
import { APP_EVENTS, emitAppEvent, useUnreadCount } from "./mobile/appEvents";
import { TubelightNavbar, type SearchEntry, type TubelightNavItem } from "./ui/tubelight-navbar";

const MENU_CLOSE_MS = 300;

// Sections the header search can jump to
const siteSearchEntries: SearchEntry[] = [
  { title: "About the University", description: "History, vision & NAAC A+ accreditation", url: "#about" },
  { title: "Leadership", description: "Vice-Chancellor, Rector & Registrar messages", url: "#leadership" },
  { title: "Colleges", description: "Constituent colleges & programmes", url: "#colleges" },
  { title: "Notifications", description: "Circulars, exam notifications & announcements", url: "#notifications" },
  { title: "Centres & Institutes", description: "Research centres of excellence", url: "#centres" },
  { title: "Events", description: "What's happening on campus", url: "#events" },
  { title: "Gallery", description: "Capturing SVU moments", url: "#gallery" },
  { title: "Admission Queries", description: "Criteria, fees, hostels & scholarships", url: "#queries" },
  { title: "Contact", description: "Address, phone & campus location", url: "#contact" },
];

interface GrandchildItem {
  label: string;
  href: string;
}

interface SubMenuItem {
  label: string;
  href: string;
  subItems?: GrandchildItem[];
}

interface MegaCategoryItem {
  id: string;
  label: string;
  href: string;
  subItems: SubMenuItem[];
}

const megaMenuCategories: MegaCategoryItem[] = [
  {
    id: "admissions",
    label: "Admissions",
    href: "#admissions",
    subItems: [
      {
        label: "Undergraduate",
        href: "#admissions",
        subItems: [
          { label: "Courses & Programmes", href: "#admissions" },
          { label: "College life & Campus", href: "#about" },
          { label: "Fees and funding", href: "#admissions" },
          { label: "Applying & Eligibility", href: "#admissions" },
        ],
      },
      {
        label: "Graduate & Master's",
        href: "#admissions",
        subItems: [
          { label: "Post-Graduate Degrees", href: "#admissions" },
          { label: "SVUCET Admissions", href: "#admissions" },
          { label: "Doctoral Research", href: "#centres" },
          { label: "Hostels & Funding", href: "#admissions" },
        ],
      },
      {
        label: "Lifelong learning & Ph.D.",
        href: "#admissions",
        subItems: [
          { label: "Distance Education (DDE)", href: "#admissions" },
          { label: "Executive Diplomas", href: "#admissions" },
          { label: "Skill Certifications", href: "#admissions" },
        ],
      },
      {
        label: "International Admissions",
        href: "#admissions",
        subItems: [
          { label: "Global Admissions Cell", href: "#admissions" },
          { label: "Visa & Accommodation", href: "#contact" },
        ],
      },
      {
        label: "Scholarships & Financial Aid",
        href: "#admissions",
        subItems: [
          { label: "State Merit Scholarships", href: "#admissions" },
          { label: "Endowment Awards", href: "#admissions" },
        ],
      },
    ],
  },
  {
    id: "news",
    label: "News",
    href: "#news",
    subItems: [
      {
        label: "University Press Releases",
        href: "#news",
        subItems: [
          { label: "Official Statements", href: "#news" },
          { label: "Media Coverage & Articles", href: "#news" },
        ],
      },
      {
        label: "Academic Circulars & Exams",
        href: "#news",
        subItems: [
          { label: "Semester Time Tables", href: "#news" },
          { label: "Controller of Exams", href: "#news" },
          { label: "Results Portal", href: "#news" },
        ],
      },
      {
        label: "Faculty Achievements",
        href: "#news",
        subItems: [
          { label: "National Awards", href: "#news" },
          { label: "Research Publications", href: "#centres" },
        ],
      },
      {
        label: "Student Spotlight & Awards",
        href: "#news",
        subItems: [
          { label: "Campus Competitions", href: "#news" },
          { label: "Placement Success Stories", href: "#career-centers" },
        ],
      },
    ],
  },
  {
    id: "research",
    label: "Research",
    href: "#centres",
    subItems: [
      {
        label: "Centres of Excellence",
        href: "#centres",
        subItems: [
          { label: "DST-PURSE Centre", href: "#centres" },
          { label: "Bioinformatics Centre", href: "#centres" },
          { label: "Instrumentation Facility", href: "#centres" },
        ],
      },
      {
        label: "DST & DBT Funded Projects",
        href: "#centres",
        subItems: [
          { label: "Active Project Grants", href: "#centres" },
          { label: "UGC / CSIR Fellowships", href: "#centres" },
          { label: "ISRO Research Collaborations", href: "#centres" },
        ],
      },
      {
        label: "Patents & Innovations",
        href: "#centres",
        subItems: [
          { label: "SVU Incubation Centre", href: "#centres" },
          { label: "Patents & Technology Transfer", href: "#centres" },
        ],
      },
      {
        label: "Doctoral Fellowships",
        href: "#centres",
        subItems: [
          { label: "Ph.D. Programmes", href: "#centres" },
          { label: "Post-Doctoral Fellowships", href: "#centres" },
        ],
      },
    ],
  },
  {
    id: "about",
    label: "About",
    href: "#about",
    subItems: [
      {
        label: "About the University",
        href: "#about",
        subItems: [
          { label: "Foundation & Vision (1954)", href: "#about" },
          { label: "Emblem & Motto Meaning", href: "#about" },
        ],
      },
      {
        label: "Chancellor & Leadership",
        href: "#about",
        subItems: [
          { label: "Hon'ble Governor & Chancellor", href: "#about" },
          { label: "Vice-Chancellor's Desk", href: "#about" },
          { label: "Executive Council & Senate", href: "#about" },
        ],
      },
      {
        label: "Vision, Mission & Heritage",
        href: "#about",
        subItems: [
          { label: "70 Years of Legacy", href: "#about" },
          { label: "Strategic Plan 2030", href: "#about" },
        ],
      },
      {
        label: "Accreditation & NAAC A+",
        href: "#about",
        subItems: [
          { label: "NAAC Assessment Report", href: "#about" },
          { label: "NIRF & QS Rankings", href: "#about" },
        ],
      },
      {
        label: "Campus 1,000-Acre Tour",
        href: "#campus-tour",
        subItems: [
          { label: "Administrative Heritage Building", href: "#about" },
          { label: "Central Library", href: "#about" },
        ],
      },
    ],
  },
  {
    id: "events",
    label: "Events",
    href: "#career-centers",
    subItems: [
      {
        label: "Tarangini Youth Festival",
        href: "#career-centers",
        subItems: [
          { label: "Cultural Competitions", href: "#career-centers" },
          { label: "Folk Dance Derbies", href: "#career-centers" },
        ],
      },
      {
        label: "Swarotsav Live Concerts",
        href: "#career-centers",
        subItems: [
          { label: "Vocal & Instrumental Fest", href: "#career-centers" },
          { label: "Stage Theatre Productions", href: "#career-centers" },
        ],
      },
      {
        label: "Inter-Collegiate Sports Derby",
        href: "#career-centers",
        subItems: [
          { label: "Cricket Championship", href: "#career-centers" },
          { label: "Football & Track Events", href: "#career-centers" },
        ],
      },
      {
        label: "Annual Convocation Ceremony",
        href: "#career-centers",
        subItems: [
          { label: "Chief Guest Addresses", href: "#career-centers" },
          { label: "Gold Medal Roll of Honour", href: "#career-centers" },
        ],
      },
    ],
  },
  {
    id: "colleges",
    label: "Colleges",
    href: "#colleges",
    subItems: [
      {
        label: "College of Arts & Humanities",
        href: "#colleges",
        subItems: [
          { label: "Languages & Literature", href: "#colleges" },
          { label: "Social Sciences", href: "#colleges" },
          { label: "Humanities & Philosophy", href: "#colleges" },
        ],
      },
      {
        label: "College of Sciences & Labs",
        href: "#colleges",
        subItems: [
          { label: "Physical & Mathematical Sciences", href: "#colleges" },
          { label: "Chemical & Biological Sciences", href: "#colleges" },
          { label: "Computer Science & AI", href: "#colleges" },
        ],
      },
      {
        label: "College of Engineering (SVUCE)",
        href: "#colleges",
        subItems: [
          { label: "Civil, Mechanical & Electrical", href: "#colleges" },
          { label: "Computer Science Engineering", href: "#colleges" },
          { label: "Electronics & Communication", href: "#colleges" },
        ],
      },
      {
        label: "College of Commerce & Management",
        href: "#colleges",
        subItems: [
          { label: "Master of Business Admin (MBA)", href: "#colleges" },
          { label: "M.Com & Finance Studies", href: "#colleges" },
        ],
      },
      {
        label: "College of Pharmaceutical Sciences",
        href: "#colleges",
        subItems: [
          { label: "B.Pharm & M.Pharm", href: "#colleges" },
          { label: "Pharmaceutical Chemistry", href: "#colleges" },
        ],
      },
    ],
  },
  {
    id: "giving",
    label: "Giving",
    href: "#contact",
    subItems: [
      {
        label: "Global Alumni Chapters",
        href: "#contact",
        subItems: [
          { label: "US & International Chapters", href: "#contact" },
          { label: "Annual Alumni Reunion", href: "#contact" },
        ],
      },
      {
        label: "Student Scholarships & Grants",
        href: "#contact",
        subItems: [
          { label: "Merit-Cum-Means Fund", href: "#contact" },
          { label: "Women Scholars Endowment", href: "#contact" },
        ],
      },
      {
        label: "Campus Modernization Fund",
        href: "#contact",
        subItems: [
          { label: "Advanced Lab Infrastructure", href: "#contact" },
          { label: "Smart Classroom Initiative", href: "#contact" },
        ],
      },
      {
        label: "Corporate CSR Partnerships",
        href: "#contact",
        subItems: [
          { label: "Industry Research Cells", href: "#contact" },
          { label: "Placement Incubation Labs", href: "#contact" },
        ],
      },
    ],
  },
];

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
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
    if (isMegaMenuOpen) {
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
  }, [isMegaMenuOpen, expandedSubItem]);

  // Animated typing words for the university hero
  const dynamicWords = [
    "education",
    "research",
    "innovation",
    "excellence",
    "leadership",
  ];
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing animation effect
  useEffect(() => {
    const targetWord = dynamicWords[wordIndex];
    let timeoutId: NodeJS.Timeout;

    if (isDeleting) {
      if (currentText.length > 0) {
        timeoutId = setTimeout(() => {
          setCurrentText(targetWord.substring(0, currentText.length - 1));
        }, 50);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % dynamicWords.length);
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

  // Autoplay video setup
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay waiting for user gesture:", err);
      });
    }
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
    // Static for now — only the menu button opens the mega menu
    { name: "About Us" },
    { name: "Colleges" },
    { name: "Faculty" },
    { name: "Contact", url: "#contact" },
  ];
  const renderNav = (layoutId: string) => (
    <TubelightNavbar
      items={navItems}
      activeTab={activeNavTab}
      onActiveTabChange={setActiveNavTab}
      onMenuClick={() => openMegaMenu()}
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
          initial={{ opacity: 0, y: 24 }}
          animate={isMenuClosing ? { opacity: 0, y: 16 } : { opacity: 1, y: 0 }}
          transition={{ duration: isMenuClosing ? MENU_CLOSE_MS / 1000 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={`svu-scroll fixed inset-0 z-50 bg-neutral-950 text-white flex flex-col overflow-y-scroll ${
            isMenuClosing ? "pointer-events-none" : ""
          }`}
          role="dialog"
          aria-modal="true"
        >
          <HoverImageLinks onClose={() => closeMegaMenu()} />
        </motion.div>
      )}

      {/* Mobile Top Header (Visible on small screens) with NO bg color and text in white */}
      <div className="lg:hidden flex items-center justify-between px-6 py-2.5 bg-[#001546] border-b border-white/10 z-40 relative flex-shrink-0">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/svu-color-crest.webp"
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
        >
          <Menu className="w-5 h-5" />
        </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MAIN SPLIT GRID (Strictly 100vh / Full Viewport Height) */}
      {/* ======================================================== */}
      {/* Mobile: the text row takes its natural height and the video fills the
          rest (min 240px), so short screens grow the hero instead of clipping it */}
      <div className="flex-1 grid grid-cols-1 grid-rows-[auto_1fr] lg:grid-rows-1 lg:grid-cols-12 lg:h-full overflow-hidden">
        
        {/* ======================================================== */}
        {/* LEFT COLUMN: Deep Navy #001546 Hero */}
        {/* ======================================================== */}
        <div className="lg:col-span-5 bg-[#001546] flex flex-col justify-between px-6 sm:px-10 lg:px-12 xl:px-14 pb-6 pt-0 relative z-20 lg:h-full overflow-hidden">
          
          {/* Desktop University Logo (Transparent with pure white text, NO background color) */}
          <div className="hidden lg:block pt-3">
            <Link href="/" className="inline-flex items-center gap-3.5 group cursor-pointer">
              <Image
                src="/svu-color-crest.webp"
                alt="Sri Venkateswara University"
                width={72}
                height={72}
                className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
                priority
              />
              <div className="flex flex-col">
                <span className="font-serif text-base xl:text-lg font-bold tracking-tight text-white uppercase leading-snug">
                  Sri Venkateswara University
                </span>
                <span className="text-[11px] font-sans font-semibold tracking-widest text-[#FFE9C2] uppercase mt-0.5">
                  Tirupati, Andhra Pradesh • Est. 1954
                </span>
              </div>
            </Link>
          </div>

          {/* Hero Typography with reduced font size & typing animation */}
          <div className="my-auto py-4 lg:py-0 max-w-lg">
            {/* Reduced Serif Headline */}
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-[34px] xl:text-[40px] font-bold text-white leading-[1.18] tracking-[-0.015em]">
              World-class, modern
              <span className="block mt-1 sm:mt-1.5 text-white">
                university{" "}
                <span className="capitalize text-[#FFB21A] underline decoration-[#FFB21A]/40 underline-offset-4">
                  {currentText}
                </span>
                <span className="inline-block w-[2.5px] h-[0.8em] bg-[#FFB21A] ml-1 animate-pulse align-middle" />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm lg:text-[15px] text-[#FFE9C2]/90 leading-relaxed font-normal max-w-md">
              NAAC A+ accredited premier institution empowering future leaders through groundbreaking research, world-class faculty, and global career opportunities.
            </p>

            {/* CTA Buttons */}
            <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="#admissions"
                className="bg-[#FFB21A] hover:bg-[#FFE9C2] text-[#001546] font-mono text-[11px] sm:text-xs font-black tracking-widest uppercase px-5 py-3 rounded-none transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 border-b-2 border-[#D23F12]"
              >
                ADMISSIONS 2026
              </Link>
            </div>
          </div>

          <AccreditationMarquee />
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: Ivory #FFF9EE Page Background + Taller Video */}
        {/* ======================================================== */}
        <div className="lg:col-span-7 bg-[#FFF9EE] flex flex-col justify-between relative overflow-hidden text-[#001546] lg:h-full">
          
          {/* Top Desktop Navigation — Floating Capsule with Glass Blur in Blue Theme */}
          <header className="relative hidden lg:flex items-center justify-end px-6 xl:px-10 pt-4 pb-2 z-30 flex-shrink-0">
            {renderNav("hero-nav-lamp")}
          </header>

          {/* Same capsule pinned to the viewport — revealed only while scrolling
              back up past the hero, tucked away while scrolling down */}
          <div
            className={`fixed top-4 right-6 xl:right-10 z-40 hidden lg:block transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              showStickyNav ? "translate-y-0 opacity-100" : "-translate-y-[calc(100%+1rem)] opacity-0 pointer-events-none"
            }`}
            aria-hidden={!showStickyNav}
            inert={!showStickyNav}
          >
            {renderNav("sticky-nav-lamp")}
          </div>

          {/* Center Stage: video fills the whole column below the nav */}
          <div className="relative flex-1 min-h-0 flex p-4 sm:p-6 lg:px-6 lg:pt-3 lg:pb-6 z-20 overflow-hidden">
            {/* Video Card with prominent dark navy border and sapphire accent ring */}
            <div className="relative w-full h-full min-h-[240px] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#001546] ring-2 ring-[#1F45D6]/70 bg-black/10">
              <video
                ref={videoRef}
                src="/svu-hero.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Subtle cinematic vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10 pointer-events-none" />

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

        </div>

      </div>
    </section>
  );
}

const HERO_ACCREDITATIONS = [
  "NAAC A+ Accredited",
  "Category-I University",
  "Est. 1954",
];

/** Accreditation marquee — runs edge to edge along the base of the navy column */
function AccreditationMarquee() {
  return (
    <div
      className="relative z-30 -mx-6 sm:-mx-10 lg:-mx-12 xl:-mx-14 -mb-6 mt-4 flex-shrink-0 overflow-hidden border-y border-[#D23F12]/40 bg-[#FFB21A] py-2.5 sm:py-3"
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
            {Array.from({ length: 3 }, () => HERO_ACCREDITATIONS)
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
