"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  Bell,
  BookOpenCheck,
  Building2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  GraduationCap,
  HandHeart,
  Landmark,
  LayoutGrid,
  Newspaper,
  Phone,
  Search,
  type LucideIcon,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { APP_EVENTS, emitAppEvent, goToHref } from "./appEvents";
import MenuToggleIcon from "../MenuToggleIcon";

interface MenuLink {
  label: string;
  href: string;
}

export interface MobileMenuCategory {
  id: string;
  label: string;
  href: string;
  subItems: (MenuLink & { subItems?: MenuLink[] })[];
}

export interface MobileMenuSearchEntry {
  title: string;
  description: string;
  url: string;
}

interface MobileMenuProps {
  categories: MobileMenuCategory[];
  searchEntries: MobileMenuSearchEntry[];
  onClose: () => void;
}

/** Icon + one-line caption per top-level category (by id) */
const categoryMeta: Record<string, { icon: LucideIcon; caption: string }> = {
  admissions: { icon: GraduationCap, caption: "UG, PG, Ph.D. & scholarships" },
  news: { icon: Newspaper, caption: "Press, circulars & results" },
  research: { icon: FlaskConical, caption: "Centres, projects & patents" },
  about: { icon: Landmark, caption: "History, leadership & NAAC A+" },
  events: { icon: CalendarDays, caption: "Fests, sports & convocation" },
  colleges: { icon: Building2, caption: "Five constituent colleges" },
  giving: { icon: HandHeart, caption: "Alumni, grants & CSR" },
};

const socials = [
  { label: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
  { label: "X (Twitter)", href: "https://twitter.com", icon: FaXTwitter },
  { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { label: "YouTube", href: "https://youtube.com", icon: FaYoutube },
];

/**
 * Phone/tablet mega menu: one full-height ivory panel. Top level is a list
 * of icon rows; a category slides in its own list, where items with
 * children open as dropdowns. Quick actions fill the bottom, and the Search
 * pill swaps the list for a site search. Animations are transform/opacity
 * (plus a small grid-row expand for dropdowns) so it stays smooth on phones.
 */
export default function MobileMenu({ categories, searchEntries, onClose }: MobileMenuProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  // The close icon morphs back into the hamburger while the menu fades out
  const [closing, setClosing] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const openCategory = categories.find((c) => c.id === openId) ?? null;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return searchEntries;
    return searchEntries.filter(
      (e) => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q),
    );
  }, [query, searchEntries]);

  useEffect(() => {
    if (searching) inputRef.current?.focus();
  }, [searching]);

  const go = (href: string) => {
    onClose();
    goToHref(href);
  };

  const showCategory = (id: string | null) => {
    setOpenId(id);
    setExpanded(null);
  };

  const toggleSearch = () => {
    setSearching((s) => !s);
    setQuery("");
    showCategory(null);
  };

  const quickActions: { label: string; caption: string; icon: LucideIcon; onPress: () => void; accent?: boolean }[] = [
    { label: "Admissions", caption: "2026 · Ask a question", icon: BookOpenCheck, onPress: () => go("#queries"), accent: true },
    { label: "Alerts", caption: "Latest notices", icon: Bell, onPress: () => { onClose(); emitAppEvent(APP_EVENTS.openAlerts); } },
    { label: "Services", caption: "Results, fees & more", icon: LayoutGrid, onPress: () => { onClose(); emitAppEvent(APP_EVENTS.openServices); } },
    { label: "Call us", caption: "+91 877 2289544", icon: Phone, onPress: () => { window.location.href = "tel:+918772289544"; } },
  ];

  // Which panel is showing — keyed so each swap replays its entrance
  const view = searching ? "search" : openCategory ? `cat-${openCategory.id}` : "root";

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-[#FFF9EE] text-[#001546]">
      {/* Turning SVU watermark (same art as the page sections), half off the right edge */}
      <div
        className="pointer-events-none absolute -right-[38%] top-[42%] h-[min(110vw,520px)] w-[min(110vw,520px)] -translate-y-1/2 text-[#001546] opacity-[0.06]"
        aria-hidden="true"
      >
        <div className="svu-fan-watermark-art" />
      </div>

      {/* ---------------- Header: crest · Search · Close ---------------- */}
      <div className="relative z-10 flex shrink-0 items-center justify-between gap-3 border-b border-[#001546]/10 px-5 pb-3 pt-[calc(env(safe-area-inset-top)+14px)]">
        <button type="button" onClick={() => go(window.location.pathname === "/" ? "#hero" : "/")} className="flex min-w-0 items-center gap-2.5 text-left">
          <Image
            src="/SV-logo.webp"
            unoptimized
            priority
            alt="Sri Venkateswara University crest"
            width={256}
            height={297}
            className="h-11 w-auto shrink-0 object-contain"
          />
          <span className="min-w-0">
            <span className="block whitespace-nowrap font-serif text-[12px] max-[380px]:text-[11px] font-black uppercase leading-none tracking-tight">
              Sri Venkateswara
            </span>
            <span className="mt-0.5 block text-[9.5px] font-semibold uppercase tracking-[0.2em] text-[#D23F12]">
              University
            </span>
          </span>
        </button>

        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={toggleSearch}
            aria-pressed={searching}
            className="flex h-10 items-center gap-1.5 rounded-full bg-[#FFB21A] px-4 text-[11px] font-black uppercase tracking-[0.12em] text-[#001546] transition-transform active:scale-95"
          >
            {searching ? <ChevronLeft className="h-4 w-4" /> : <Search className="h-4 w-4" />}
            {searching ? "Menu" : "Search"}
          </button>
          <button
            type="button"
            onClick={() => {
              setClosing(true);
              onClose();
            }}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#001546] text-[#FFF9EE] transition-transform active:scale-95"
          >
            <MenuToggleIcon open={!closing} morphOnMount className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* ---------------- Body ---------------- */}
      <nav
        key={view}
        aria-label="Main menu"
        className="svu-menu-panel relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5 pb-5 pt-4"
      >
        {/* ----- Search ----- */}
        {view === "search" && (
          <>
            <label className="flex h-12 shrink-0 items-center gap-2.5 border-b-2 border-[#001546] pb-1">
              <Search className="h-5 w-5 shrink-0 text-[#5A6382]" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the university…"
                className="h-full min-w-0 flex-1 bg-transparent text-lg font-semibold text-[#001546] outline-none placeholder:font-normal placeholder:text-[#5A6382]/70"
              />
            </label>
            <ul className="mt-3">
              {results.map((r, i) => (
                <li key={r.url + r.title} className="svu-menu-item" style={{ animationDelay: `${i * 30}ms` }}>
                  <button
                    type="button"
                    onClick={() => go(r.url)}
                    className="flex w-full items-center gap-3 border-b border-[#001546]/10 py-3.5 text-left active:bg-[#001546]/[0.04]"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-[16px] font-bold leading-snug">{r.title}</span>
                      <span className="mt-0.5 block text-[13px] leading-snug text-[#5A6382]">{r.description}</span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-[#D23F12]" />
                  </button>
                </li>
              ))}
              {results.length === 0 && (
                <li className="py-6 text-sm text-[#5A6382]">No matches for &ldquo;{query}&rdquo;.</li>
              )}
            </ul>
          </>
        )}

        {/* ----- Top level ----- */}
        {view === "root" && (
          <>
            <ul className="divide-y divide-[#001546]/[0.08]">
              {categories.map((c, i) => {
                const meta = categoryMeta[c.id];
                return (
                  <li key={c.id} className="svu-menu-item" style={{ animationDelay: `${i * 30}ms` }}>
                    <MenuRow
                      icon={meta?.icon ?? Landmark}
                      label={c.label}
                      caption={meta?.caption}
                      onPress={() => (c.subItems.length ? showCategory(c.id) : go(c.href))}
                    />
                  </li>
                );
              })}
              <li className="svu-menu-item" style={{ animationDelay: `${categories.length * 30}ms` }}>
                <MenuRow icon={Phone} label="Contact" caption="Address, phone & email" onPress={() => go("/contact")} />
              </li>
            </ul>
            <QuickActions actions={quickActions} />
          </>
        )}

        {/* ----- Category: sub-links, with dropdowns for their children ----- */}
        {openCategory && view !== "search" && (
          <>
            <button
              type="button"
              onClick={() => showCategory(null)}
              className="flex w-fit items-center gap-1.5 rounded-full border border-[#001546]/20 bg-[#001546]/[0.06] py-2 pl-2 pr-3.5 text-[12px] font-extrabold uppercase tracking-[0.16em] text-[#001546] transition-colors active:bg-[#001546] active:text-[#FFF9EE]"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FFB21A] text-[#001546]">
                <ChevronLeft className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              All menus
            </button>

            <CategoryHeader category={openCategory} onPress={() => go(openCategory.href)} />

            <ul className="mt-2">
              {openCategory.subItems.map((s, i) => {
                const children = s.subItems ?? [];
                const isOpen = expanded === s.label;
                return (
                  <li
                    key={s.label}
                    className="svu-menu-item border-b border-[#001546]/10"
                    style={{ animationDelay: `${i * 35}ms` }}
                  >
                    <button
                      type="button"
                      onClick={() => (children.length ? setExpanded(isOpen ? null : s.label) : go(s.href))}
                      aria-expanded={children.length ? isOpen : undefined}
                      className={`flex w-full items-center justify-between gap-3 py-3.5 text-left text-[17px] font-bold leading-snug transition-colors ${
                        isOpen ? "text-[#D23F12]" : "active:text-[#D23F12]"
                      }`}
                    >
                      {s.label}
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-[transform,background-color] duration-300 ${
                          isOpen ? "rotate-90 bg-[#D23F12] text-white" : "bg-[#001546]/[0.06] text-[#D23F12]"
                        }`}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </span>
                    </button>

                    {children.length > 0 && (
                      <div className={`svu-menu-dropdown ${isOpen ? "is-open" : ""}`} inert={!isOpen}>
                        <div className="overflow-hidden">
                          <ul className="mb-3 ml-1 border-l-2 border-[#FFB21A] pl-4">
                            {children.map((g) => (
                              <li key={g.label}>
                                <button
                                  type="button"
                                  onClick={() => go(g.href)}
                                  className="flex w-full items-center justify-between gap-3 py-2 text-left text-[15px] font-medium text-[#5A6382] active:text-[#001546]"
                                >
                                  {g.label}
                                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#5A6382]/60" />
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
            <QuickActions actions={quickActions} />
          </>
        )}
      </nav>

      {/* ---------------- Footer: socials · NAAC A+ ---------------- */}
      <div className="relative z-10 flex shrink-0 items-center gap-2 border-t border-[#001546]/10 px-5 pb-[calc(env(safe-area-inset-bottom)+16px)] pt-3">
        {socials.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="flex h-10 w-10 items-center justify-center border border-[#001546]/25 bg-[#FFF9EE] text-[#001546] active:bg-[#001546] active:text-[#FFF9EE]"
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}
        <span className="ml-auto flex flex-col items-end leading-none">
          <span className="bg-[#FFB21A] px-2.5 py-1.5 text-[12px] font-black uppercase tracking-[0.12em] text-[#001546] shadow-[0_4px_12px_-4px_rgba(255,178,26,0.8)]">
            NAAC A+
          </span>
          <span className="mt-1 text-[9.5px] font-bold uppercase tracking-[0.18em] text-[#5A6382]">Est. 1954</span>
        </span>
      </div>
    </div>
  );
}

/* ========================================================================== */

function MenuRow({ icon: Icon, label, caption, onPress }: { icon: LucideIcon; label: string; caption?: string; onPress: () => void }) {
  return (
    <button type="button" onClick={onPress} className="group flex w-full items-center gap-3.5 py-2.5 text-left">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#001546] text-[#FFB21A] transition-colors group-active:bg-[#D23F12] group-active:text-white">
        <Icon className="h-5 w-5" strokeWidth={2.2} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-[family-name:var(--font-heading)] text-[22px] font-extrabold uppercase leading-none tracking-tight group-active:text-[#D23F12]">
          {label}
        </span>
        {caption && <span className="mt-1 block truncate text-[12.5px] text-[#5A6382]">{caption}</span>}
      </span>
      <ChevronRight className="h-5 w-5 shrink-0 text-[#D23F12]" strokeWidth={2.6} />
    </button>
  );
}

function CategoryHeader({ category, onPress }: { category: MobileMenuCategory; onPress: () => void }) {
  const meta = categoryMeta[category.id];
  const Icon = meta?.icon ?? Landmark;
  return (
    <button type="button" onClick={onPress} className="mt-3 flex items-center gap-3.5 rounded-2xl bg-[#001546] p-4 text-left text-white">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFB21A] text-[#001546]">
        <Icon className="h-6 w-6" strokeWidth={2.2} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-[family-name:var(--font-heading)] text-[26px] font-extrabold uppercase leading-none tracking-tight">
          {category.label}
        </span>
        {meta && <span className="mt-1 block text-[12.5px] text-[#FFE9C2]/80">{meta.caption}</span>}
      </span>
    </button>
  );
}

function QuickActions({
  actions,
}: {
  actions: { label: string; caption: string; icon: LucideIcon; onPress: () => void; accent?: boolean }[];
}) {
  return (
    // mt-auto pins the grid to the bottom when the list is short
    <div className="svu-menu-item mt-auto pt-5" style={{ animationDelay: "220ms" }}>
      <p className="mb-2.5 text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#5A6382]">Quick access</p>
      <div className="grid grid-cols-2 gap-2.5">
        {actions.map(({ label, caption, icon: Icon, onPress, accent }) => (
          <button
            key={label}
            type="button"
            onClick={onPress}
            className={`flex items-center gap-2.5 rounded-2xl border p-3 text-left transition-transform active:scale-[0.97] ${
              accent ? "border-[#FFB21A] bg-[#FFB21A] text-[#001546]" : "border-[#001546]/15 bg-white/70 text-[#001546]"
            }`}
          >
            <Icon className={`h-5 w-5 shrink-0 ${accent ? "text-[#001546]" : "text-[#D23F12]"}`} strokeWidth={2.2} />
            <span className="min-w-0">
              <span className="block truncate text-[13.5px] font-extrabold leading-tight">{label}</span>
              <span className={`block truncate text-[11px] ${accent ? "text-[#001546]/75" : "text-[#5A6382]"}`}>{caption}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
