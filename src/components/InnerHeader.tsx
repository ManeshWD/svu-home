"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import HoverImageLinks from "./HoverImageLinks";
import MenuToggleIcon from "./MenuToggleIcon";
import MobileMenu from "./mobile/MobileMenu";
import NaacBadge from "./NaacBadge";
import { TubelightNavbar, type TubelightNavItem } from "./ui/tubelight-navbar";
import { megaMenuCategories, siteSearchEntries } from "@/data/megaMenu";

const MENU_CLOSE_MS = 300;

// The homepage menus point at its own sections (#about…); from an inner
// page those anchors live on "/"
const toHome = (href: string) => (href.startsWith("#") ? `/${href}` : href);

const innerCategories = megaMenuCategories.map((c) => ({
  ...c,
  href: toHome(c.href),
  subItems: c.subItems.map((s) => ({
    ...s,
    href: toHome(s.href),
    subItems: s.subItems?.map((g) => ({ ...g, href: toHome(g.href) })),
  })),
}));

const innerSearchEntries = siteSearchEntries.map((e) => ({ ...e, url: toHome(e.url) }));

const navItems: TubelightNavItem[] = [
  { name: "Home", url: "/" },
  { name: "About Us", url: "/about" },
  { name: "Colleges", url: "/colleges/arts" },
  { name: "Contact", url: "/contact" },
];

// Faculty and Gallery live in the mega menu, so their pages light no tab
function tabForPath(pathname: string) {
  if (pathname.startsWith("/administration/faculty") || pathname.startsWith("/colleges/faculty")) return "";
  if (pathname.startsWith("/about") || pathname.startsWith("/administration/")) return "About Us";
  if (pathname.startsWith("/colleges")) return "Colleges";
  if (pathname.startsWith("/contact")) return "Contact";
  return "";
}

/**
 * Header for the inner pages — the homepage hero's logo and nav/mega menu,
 * set on a solid navy strip pinned to the top of the page.
 */
export default function InnerHeader() {
  const pathname = usePathname();
  const [activeNavTab, setActiveNavTab] = useState(() => tabForPath(pathname));
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Unmount (and unlock page scroll) only after the exit animation finishes
  const closeMegaMenu = () => {
    setIsMenuClosing(true);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
      setIsMenuClosing(false);
    }, MENU_CLOSE_MS);
  };

  const openMegaMenu = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setIsMenuClosing(false);
    setIsMegaMenuOpen(true);
  };

  // Keyboard close & page scroll lock (same as the homepage hero). The inner
  // pages give <html> its own overflow (globals.css), so a lock on <body>
  // never reaches the page scroller — lock <html> instead, or the page
  // scrollbar stays beside the menu overlay's own
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMegaMenu();
    };
    const html = document.documentElement;
    const unlock = () => {
      html.style.overflow = "";
      document.body.style.paddingRight = "";
    };
    if (isMegaMenuOpen && !isMenuClosing) {
      window.addEventListener("keydown", handleKeyDown);
      // Pad by the page scrollbar's width so hiding it doesn't shift the layout;
      // the overlay's own (identically styled) scrollbar fills that strip
      const scrollbarWidth = window.innerWidth - html.clientWidth;
      html.style.overflow = "hidden";
      if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      unlock();
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      unlock();
    };
  }, [isMegaMenuOpen, isMenuClosing]);

  return (
    <header className="svu-chrome sticky top-0 z-[100] w-full bg-[#001546] text-white border-b border-white/10 shadow-md select-none">
      {/* Mega menu overlay — mobile stacked menu / desktop hover-image menu */}
      {isMegaMenuOpen && (
        <motion.div
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
          <div className="lg:hidden">
            <MobileMenu
              categories={innerCategories}
              searchEntries={innerSearchEntries}
              onClose={() => closeMegaMenu()}
            />
          </div>
          <div className="hidden lg:flex lg:flex-col">
            <HoverImageLinks onClose={() => closeMegaMenu()} />
          </div>
        </motion.div>
      )}

      <div className="flex items-center justify-between gap-6 px-6 sm:px-10 lg:px-12 xl:px-14 py-2.5 lg:py-3">
        {/* Logo with text */}
        <Link href="/" className="inline-flex items-center gap-3 lg:gap-3.5 group cursor-pointer shrink-0">
          <Image
            src="/svu-color-crest.webp" unoptimized
            alt="Sri Venkateswara University"
            width={72}
            height={72}
            className="h-11 lg:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
            priority
          />
          <div className="flex flex-col">
            <span className="font-serif text-xs sm:text-base lg:text-sm xl:text-lg font-bold tracking-tight text-white uppercase leading-snug">
              Sri Venkateswara University
            </span>
            <span className="text-[10px] sm:text-[11px] lg:text-[9px] xl:text-[11px] font-sans font-semibold tracking-widest text-[#FFE9C2] uppercase mt-0.5">
              Tirupati, Andhra Pradesh • Est. 1954
            </span>
          </div>
          {/* NAAC A+ badge beside the university name — on a white disc so
              its dark lettering stays legible on the navy header */}
          <NaacBadge className="ml-0.5 sm:ml-1 h-11 sm:h-12 lg:h-14 xl:h-16" />
        </Link>

        {/* Desktop: the homepage nav pill */}
        <div className="hidden lg:block">
          <TubelightNavbar
            items={navItems}
            activeTab={activeNavTab}
            onActiveTabChange={setActiveNavTab}
            onMenuClick={() => openMegaMenu()}
            menuOpen={isMegaMenuOpen && !isMenuClosing}
            searchEntries={innerSearchEntries}
            layoutId="inner-nav-lamp"
          />
        </div>

        {/* Mobile: menu button */}
        <button
          onClick={() => openMegaMenu()}
          className="lg:hidden flex h-10 w-10 shrink-0 items-center justify-center bg-[#001B54] text-white rounded-full border border-white/10 hover:bg-[#1F45D6] active:scale-95 transition-colors"
          aria-label="Open mega menu"
          aria-expanded={isMegaMenuOpen && !isMenuClosing}
        >
          <MenuToggleIcon open={isMegaMenuOpen && !isMenuClosing} />
        </button>
      </div>
    </header>
  );
}
