"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
}

interface TubelightNavbarProps {
  items: TubelightNavItem[];
  activeTab: string;
  onActiveTabChange: (name: string) => void;
  onMenuClick: () => void;
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
  searchEntries,
  layoutId,
  className,
}: TubelightNavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
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
    window.location.hash = url.replace(/^#/, "");
  };

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <div className="flex items-center gap-1 rounded-full border border-[#23B5E9]/35 bg-[#001546]/80 p-1.5 shadow-[0_8px_32px_rgba(0,21,70,0.28)] ring-1 ring-white/10 backdrop-blur-xl">
        <nav className="flex items-center gap-0.5 xl:gap-1">
          {items.map((item) => {
            const isActive = activeTab === item.name;
            const itemClass = cn(
              "relative cursor-pointer rounded-full px-3.5 xl:px-4 py-2 font-mono text-[11px] xl:text-xs font-semibold uppercase tracking-wider transition-colors",
              isActive ? "text-[#FFB21A]" : "text-[#FFE9C2]/80 hover:text-[#FFB21A]",
            );
            const lamp = isActive && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 -z-10 w-full rounded-full bg-[#FFB21A]/10"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Saffron tube + glow on top of the active tab */}
                <span className="absolute -top-1.5 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-[#FFB21A]">
                  <span className="absolute -left-2 -top-2 h-6 w-12 rounded-full bg-[#FFB21A]/25 blur-md" />
                  <span className="absolute -top-1 h-6 w-8 rounded-full bg-[#FFB21A]/25 blur-md" />
                  <span className="absolute left-2 top-0 h-4 w-4 rounded-full bg-[#FFB21A]/25 blur-sm" />
                </span>
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
          className="ml-1 flex cursor-pointer items-center justify-center rounded-full bg-[#1F45D6] p-2.5 text-white shadow-md transition-colors duration-200 hover:bg-[#23B5E9] hover:text-[#001546] active:scale-95"
          aria-label="Open mega menu"
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>

      {/* Search panel — drops below the pill */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full z-50 mt-3 w-full min-w-[22rem] overflow-hidden rounded-2xl border border-[#23B5E9]/35 bg-[#001546]/90 shadow-[0_16px_40px_rgba(0,21,70,0.35)] ring-1 ring-white/10 backdrop-blur-xl"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (results[0]) goTo(results[0].url);
              }}
              className="flex items-center gap-3 border-b border-white/10 px-4 py-3"
            >
              <Search className="h-4 w-4 shrink-0 text-[#23B5E9]" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search colleges, notices, events…"
                className="w-full bg-transparent text-sm text-white placeholder:text-[#FFE9C2]/45 outline-none [&::-webkit-search-cancel-button]:hidden"
                aria-label="Search the site"
              />
            </form>

            <ul className="svu-scroll max-h-72 overflow-y-auto py-1.5">
              {results.length ? (
                results.map((r) => (
                  <li key={r.url}>
                    <button
                      type="button"
                      onClick={() => goTo(r.url)}
                      className="group flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors hover:bg-white/[0.06]"
                    >
                      <span>
                        <span className="block text-sm font-semibold text-white group-hover:text-[#FFB21A]">
                          {r.title}
                        </span>
                        <span className="block text-xs text-[#FFE9C2]/60">{r.description}</span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-[#FFE9C2]/40 transition-[color,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:translate-x-0.5 group-hover:text-[#FFB21A]" />
                    </button>
                  </li>
                ))
              ) : (
                <li className="px-4 py-4 text-sm text-[#FFE9C2]/60">No matches for “{query}”</li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TubelightNavbar;
