"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

interface SearchBoxProps {
  initialQuery?: string;
  placeholder?: string;
  autoFocus?: boolean;
  size?: "md" | "lg";
  className?: string;
  onNavigate?: () => void;
}

export default function SearchBox({
  initialQuery = "",
  placeholder = "Search courses, notifications, people…",
  autoFocus = false,
  size = "md",
  className = "",
  onNavigate,
}: SearchBoxProps) {
  const router = useRouter();
  const [value, setValue] = useState(initialQuery);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    onNavigate?.();
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  const pad = size === "lg" ? "px-5 py-4 text-base" : "px-4 py-2.5 text-sm";
  const icon = size === "lg" ? "w-5 h-5" : "w-4 h-4";

  return (
    <form
      onSubmit={submit}
      className={`flex items-center gap-3 rounded-full border border-gray-200 bg-white shadow-sm focus-within:border-[#002147] focus-within:ring-2 focus-within:ring-[#002147]/10 transition-all ${pad} ${className}`}
      role="search"
    >
      <Search className={`${icon} text-[#002147] shrink-0`} />
      <input
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={autoFocus}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 min-w-0 bg-transparent text-[#002147] placeholder-gray-400 outline-none"
        aria-label="Search the site"
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          className="text-gray-400 hover:text-gray-600 shrink-0"
          aria-label="Clear search"
        >
          <X className={icon} />
        </button>
      )}
      <button
        type="submit"
        className="shrink-0 rounded-full bg-[#001730] hover:bg-[#002855] text-white font-semibold px-4 py-1.5 text-xs uppercase tracking-wider transition-colors"
      >
        Search
      </button>
    </form>
  );
}
