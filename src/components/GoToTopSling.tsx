"use client";

import React, { useEffect, useState } from "react";
import SlingButton from "./SlingButton";

export default function GoToTopSling() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 180px
      if (window.scrollY > 180) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    const hero = document.getElementById("hero");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div
      className={`fixed bottom-[calc(env(safe-area-inset-bottom)+119px)] right-4 lg:bottom-14 lg:right-8 z-50 flex flex-col items-center gap-1.5 transition-all duration-300 pointer-events-auto select-none ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <SlingButton
        onSend={handleScrollToTop}
        size={44}
        padColor="#FFFFFF"
        iconColor="#001546"
        accentColor="#23B5E9"
        wellColor="#001546"
        bandColor="#23B5E9"
        strokeWidth={1.5}
        particles={20}
        flight={140}
        ariaLabel="Scroll to top"
      >
        {/* Slingshot arrow in theme color (#23B5E9 on hover / #001546 default) */}
        <svg
          width={18}
          height={18}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#001546"
          strokeWidth={2.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-colors group-hover:stroke-[#23B5E9]"
        >
          <line x1="12" y1="19" x2="12" y2="5" />
          <polyline points="5 12 12 5 19 12" />
        </svg>
      </SlingButton>

      {/* "DRAG" label - NO BORDER, smaller, elevated position */}
      <span className="text-[10px] font-mono font-bold tracking-widest text-[#001546] bg-white/95 px-2 py-0.5 rounded-full shadow-md uppercase border-none">
        Drag
      </span>
    </div>
  );
}
