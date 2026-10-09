"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { CornerDownLeft, Search, Send, X, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import MenuToggleIcon from "@/components/MenuToggleIcon";

/* Ctrl/⌘+K — one shared listener for every mounted navbar (the home page
   renders a hero copy and a sticky copy). It toggles search on whichever
   copy is on screen; if none is, it asks the page to reveal its sticky
   copy (REVEAL_NAV_EVENT) and opens that once it's interactive. */
export const REVEAL_NAV_EVENT = "svu:reveal-nav";

type SearchHost = { el: HTMLElement; toggle: () => void };
const searchHosts = new Set<SearchHost>();

const isUsable = (el: HTMLElement) => el.getClientRects().length > 0 && !el.closest("[inert]");
const isOnScreen = (el: HTMLElement) => {
  const r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < window.innerHeight;
};

function onSearchShortcut(e: KeyboardEvent) {
  if (e.key.toLowerCase() !== "k" || !(e.ctrlKey || e.metaKey) || e.altKey || e.shiftKey) return;
  const hosts = [...searchHosts];
  const visible = hosts.find((h) => isUsable(h.el) && isOnScreen(h.el));
  if (!visible && !hosts.some((h) => h.el.getClientRects().length > 0)) return; // e.g. mobile: no pill rendered
  e.preventDefault();
  if (visible) return visible.toggle();
  window.dispatchEvent(new Event(REVEAL_NAV_EVENT));
  // Give the page a frame or two to lift `inert` off the sticky copy
  window.setTimeout(() => [...searchHosts].find((h) => isUsable(h.el))?.toggle(), 60);
}

function registerSearchHost(host: SearchHost) {
  if (searchHosts.size === 0) document.addEventListener("keydown", onSearchShortcut);
  searchHosts.add(host);
  return () => {
    searchHosts.delete(host);
    if (searchHosts.size === 0) document.removeEventListener("keydown", onSearchShortcut);
  };
}

// Search panel: height/opacity reveal with the rows staggering in after it
const SEARCH_VARIANTS = {
  container: {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: "auto",
      transition: { height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }, staggerChildren: 0.06, delayChildren: 0.05 },
    },
    exit: { opacity: 0, height: 0, transition: { height: { duration: 0.3 }, opacity: { duration: 0.2 } } },
  },
  item: {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
  },
} as const;

export interface TubelightNavItem {
  name: string;
  /** Anchor/route to follow — or use onClick for items that open a panel */
  url?: string;
  onClick?: () => void;
}

export interface SearchEntry {
  title: string;
  description: string;
  url: string;
  /** Coloured icon + tag shown in the search panel */
  icon?: LucideIcon;
  color?: string;
  tag?: string;
}

interface TubelightNavbarProps {
  items: TubelightNavItem[];
  activeTab: string;
  onActiveTabChange: (name: string) => void;
  onMenuClick: () => void;
  /** Mega menu is open — the hamburger shows as an X */
  menuOpen?: boolean;
  searchEntries: SearchEntry[];
  /** Unique per rendered copy so the lamp's shared-layout animation stays in its own pill */
  layoutId: string;
  className?: string;
}

/**
 * Theme take on the "tubelight" navbar: a navy glass pill whose active item
 * carries a saffron lamp that glides between tabs. The search button drops a
 * search panel just below the pill instead of opening the mega menu.
 */
export function TubelightNavbar({
  items,
  activeTab,
  onActiveTabChange,
  onMenuClick,
  menuOpen = false,
  searchEntries,
  layoutId,
  className,
}: TubelightNavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  // Keyboard-highlighted result (-1 = none); reset whenever the query changes
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return searchEntries;
    return searchEntries.filter(
      (e) => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q),
    );
  }, [query, searchEntries]);

  const closeSearch = () => {
    setIsSearchOpen(false);
    setQuery("");
    setActiveIndex(-1);
  };

  // Register for the shared Ctrl/⌘+K shortcut
  const toggleRef = useRef<() => void>(() => {});
  useEffect(() => {
    toggleRef.current = () => (isSearchOpen ? closeSearch() : setIsSearchOpen(true));
  });
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    return registerSearchHost({ el, toggle: () => toggleRef.current() });
  }, []);

  // Shortcut label for the platform (⌘K on Apple devices, Ctrl K elsewhere)
  const [isMac, setIsMac] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only platform check
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
  }, []);
  const shortcut = isMac ? "⌘K" : "Ctrl K";

  const onSearchKeyDown =(e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i < results.length - 1 ? i + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i > 0 ? i - 1 : results.length - 1));
    }
  };

  // Close on outside click / Escape
  useEffect(() => {
    if (!isSearchOpen) return;
    inputRef.current?.focus();
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) closeSearch();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [isSearchOpen]);

  const goTo = (url: string) => {
    closeSearch();
    // Same-page anchors just jump; anything else (e.g. "/#about") navigates
    if (url.startsWith("#")) window.location.hash = url.slice(1);
    else window.location.href = url;
  };

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <div className="flex items-center gap-1 rounded-full border border-[#23B5E9]/35 bg-[#001546]/80 p-1.5 shadow-[0_8px_32px_rgba(0,21,70,0.28)] ring-1 ring-white/10 backdrop-blur-xl">
        <nav className="flex items-center gap-0.5 xl:gap-1">
          {items.map((item) => {
            const isActive = activeTab === item.name;
            const itemClass = cn(
              "relative cursor-pointer whitespace-nowrap rounded-full px-2 xl:px-4 py-2 font-mono text-[13px] xl:text-sm font-semibold uppercase tracking-wider transition-colors",
              isActive ? "text-[#FFB21A]" : "text-[#FFE9C2]/80 hover:text-[#FFB21A]",
            );
            const lamp = isActive && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 -z-10 w-full rounded-full bg-[#FFB21A]/10"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Saffron "( )" brackets hugging both sides of the active tab */}
                <span className="absolute inset-y-0.5 left-0 w-2.5 rounded-l-full border-2 border-r-0 border-[#FFB21A] drop-shadow-[0_0_4px_rgba(255,178,26,0.75)]" />
                <span className="absolute inset-y-0.5 right-0 w-2.5 rounded-r-full border-2 border-l-0 border-[#FFB21A] drop-shadow-[0_0_4px_rgba(255,178,26,0.75)]" />
              </motion.span>
            );
            const handleClick = () => {
              onActiveTabChange(item.name);
              closeSearch();
              item.onClick?.();
            };

            return item.url ? (
              <Link key={item.name} href={item.url} onClick={handleClick} className={itemClass}>
                {item.name}
                {lamp}
              </Link>
            ) : (
              <button key={item.name} type="button" onClick={handleClick} className={itemClass}>
                {item.name}
                {lamp}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => (isSearchOpen ? closeSearch() : setIsSearchOpen(true))}
          className={cn(
            "cursor-pointer rounded-full p-2 transition-colors",
            isSearchOpen ? "bg-white/10 text-[#FFB21A]" : "text-[#23B5E9] hover:bg-white/10 hover:text-white",
          )}
          aria-label={isSearchOpen ? "Close search" : "Search site"}
          aria-keyshortcuts="Control+K Meta+K"
          title={`Search (${shortcut})`}
          aria-expanded={isSearchOpen}
        >
          {isSearchOpen ? <X className="h-3.5 w-3.5" /> : <Search className="h-3.5 w-3.5" />}
        </button>

        <button
          type="button"
          onClick={() => {
            closeSearch();
            onMenuClick();
          }}
          className="ml-1 flex cursor-pointer items-center justify-center rounded-full border border-white/20 bg-[#001546] p-1.5 text-white transition-colors duration-200 hover:border-white/40 hover:bg-[#0B2463] active:scale-95"
          aria-label={menuOpen ? "Close mega menu" : "Open mega menu"}
          aria-expanded={menuOpen}
        >
          <MenuToggleIcon open={menuOpen} />
        </button>
      </div>

      {/* Search panel — drops below the pill: label + input, then results
          that stagger in, with arrow-key navigation and a hint footer */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            variants={SEARCH_VARIANTS.container}
            initial="hidden"
            animate="show"
            exit="exit"
            className="absolute right-0 top-full z-50 mt-3 w-full min-w-[24rem] overflow-hidden rounded-2xl border border-[#23B5E9]/35 bg-[#001546]/95 shadow-[0_16px_40px_rgba(0,21,70,0.45)] ring-1 ring-white/10 backdrop-blur-xl"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const target = results[activeIndex] ?? results[0];
                if (target) goTo(target.url);
              }}
              className="border-b border-white/10 px-4 pb-3 pt-3.5"
            >
              <label
                htmlFor={`${layoutId}-search`}
                className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#23B5E9]"
              >
                Search SVU
              </label>
              <div className="relative">
                <input
                  ref={inputRef}
                  id={`${layoutId}-search`}
                  type="text"
                  role="combobox"
                  aria-expanded={results.length > 0}
                  aria-controls={`${layoutId}-results`}
                  aria-autocomplete="list"
                  aria-activedescendant={activeIndex >= 0 ? `${layoutId}-result-${activeIndex}` : undefined}
                  autoComplete="off"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActiveIndex(-1);
                  }}
                  onKeyDown={onSearchKeyDown}
                  placeholder="Search colleges, notices, events…"
                  className="h-10 w-full rounded-xl border border-white/10 bg-white/[0.06] pl-3.5 pr-10 text-sm text-white placeholder:text-[#FFE9C2]/45 outline-none transition-colors focus:border-[#FFB21A]/60 focus:bg-white/[0.09]"
                />
                {/* Search icon swaps to a send arrow once there's a query */}
                <div className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={query ? "send" : "search"}
                      initial={{ y: -16, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 16, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {query ? (
                        <Send className="h-4 w-4 text-[#FFB21A]" />
                      ) : (
                        <Search className="h-4 w-4 text-[#23B5E9]" />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </form>

            <motion.ul id={`${layoutId}-results`} role="listbox" aria-label="Search results" className="svu-scroll max-h-80 overflow-y-auto p-1.5">
              {results.length ? (
                results.map((r, i) => {
                  const Icon = r.icon ?? Search;
                  const color = r.color ?? "#23B5E9";
                  const active = i === activeIndex;
                  return (
                    <motion.li
                      key={r.url}
                      layout
                      variants={SEARCH_VARIANTS.item}
                      id={`${layoutId}-result-${i}`}
                      role="option"
                      aria-selected={active}
                    >
                      <button
                        type="button"
                        onClick={() => goTo(r.url)}
                        onMouseEnter={() => setActiveIndex(i)}
                        className={cn(
                          "group flex w-full cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors",
                          active ? "bg-white/[0.08]" : "hover:bg-white/[0.06]",
                        )}
                      >
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ring-1"
                          style={{ backgroundColor: `${color}22`, color, ["--tw-ring-color" as string]: `${color}55` }}
                          aria-hidden="true"
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className={cn("block truncate text-sm font-semibold", active ? "text-[#FFB21A]" : "text-white")}>
                            {r.title}
                          </span>
                          <span className="block truncate text-xs text-[#FFE9C2]/55">{r.description}</span>
                        </span>
                        {active ? (
                          <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-[#FFB21A]" aria-hidden="true" />
                        ) : (
                          r.tag && (
                            <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-[#FFE9C2]/40">
                              {r.tag}
                            </span>
                          )
                        )}
                      </button>
                    </motion.li>
                  );
                })
              ) : (
                <motion.li variants={SEARCH_VARIANTS.item} className="px-3 py-4 text-sm text-[#FFE9C2]/60">
                  No matches for “{query}”
                </motion.li>
              )}
            </motion.ul>

            <div className="flex items-center justify-between border-t border-white/10 px-4 py-2.5 text-[11px] text-[#FFE9C2]/45">
              <span>
                <kbd className="font-sans text-[#FFE9C2]/70">↑↓</kbd> to navigate ·{" "}
                <kbd className="font-sans text-[#FFE9C2]/70">Enter</kbd> to open
              </span>
              <span>
                <kbd className="font-sans text-[#FFE9C2]/70">{shortcut}</kbd> or{" "}
                <kbd className="font-sans text-[#FFE9C2]/70">Esc</kbd> to close
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TubelightNavbar;
