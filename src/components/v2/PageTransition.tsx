"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ThinkingOrb } from "thinking-orbs";

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();

  const [isVisible, setIsVisible] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const navigatingRef = useRef(false);

  // Global capture-phase click interceptor: starts navigation immediately
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      // Don't intercept if already navigating
      if (navigatingRef.current) return;

      // Find closest anchor tag
      let target = e.target as HTMLElement | null;
      while (target && target.tagName !== "A") {
        target = target.parentElement;
      }

      if (!target || !(target instanceof HTMLAnchorElement)) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Skip external protocols, anchor-only hashes, blank targets, downloads, or explicitly skipped links
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:") ||
        target.target === "_blank" ||
        target.hasAttribute("download") ||
        target.getAttribute("data-no-transition") === "true"
      ) {
        return;
      }

      // Allow modifier keys (cmd/ctrl/shift/middle-click for new tab)
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      try {
        const targetUrl = new URL(target.href, window.location.href);
        const currentUrl = new URL(window.location.href);

        // Same origin only
        if (targetUrl.origin !== currentUrl.origin) return;

        // Skip files (e.g. .pdf, .docx, .png, etc.)
        const hasFileExtension = /\.[a-zA-Z0-9]{2,4}$/.test(targetUrl.pathname);
        if (hasFileExtension) return;

        // Same page with same search params (hash-only or exact same URL)
        if (
          targetUrl.pathname === currentUrl.pathname &&
          targetUrl.search === currentUrl.search
        ) {
          return;
        }

        // Home page hash anchor jumps (e.g. href="/#about" when already on "/")
        if (
          currentUrl.pathname === "/" &&
          targetUrl.pathname === "/" &&
          targetUrl.hash
        ) {
          return;
        }

        // Intercept navigation
        e.preventDefault();
        e.stopPropagation();

        const destination = targetUrl.pathname + targetUrl.search + targetUrl.hash;
        navigatingRef.current = true;
        setPendingPath(destination);
        setIsVisible(true);

        // Determine if navigating across different root layouts ((home) <-> (pages))
        const isCrossingRootLayout =
          (currentUrl.pathname === "/" || currentUrl.pathname === "/home2") !==
          (targetUrl.pathname === "/" || targetUrl.pathname === "/home2");

        // Start loading the destination page immediately (no artificial wait)
        requestAnimationFrame(() => {
          if (isCrossingRootLayout) {
            window.location.href = destination;
          } else {
            router.push(destination);
          }
        });

        // Fallback: if client-side router is delayed, force browser navigation
        const fallbackTimer = setTimeout(() => {
          if (window.location.pathname !== targetUrl.pathname) {
            window.location.href = destination;
          }
        }, 1800);

        return () => clearTimeout(fallbackTimer);
      } catch (err) {
        // Fallback on parse failure
      }
    };

    // Use capture phase to catch navigation clicks before default prevention
    document.addEventListener("click", handleLinkClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleLinkClick, { capture: true });
    };
  }, [router]);

  // When pathname changes (route arrived), dismiss loader immediately
  useEffect(() => {
    if (isVisible && pendingPath) {
      const destinationPathname = pendingPath.split(/[?#]/)[0];
      if (pathname === destinationPathname) {
        navigatingRef.current = false;
        setIsVisible(false);
        setPendingPath(null);
      }
    }
  }, [pathname, isVisible, pendingPath]);

  // Reset on browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      navigatingRef.current = false;
      setIsVisible(false);
      setPendingPath(null);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Safety timeout: auto-hide loader if route takes longer than 6s
  useEffect(() => {
    let safetyTimer: NodeJS.Timeout;
    if (isVisible) {
      safetyTimer = setTimeout(() => {
        navigatingRef.current = false;
        setIsVisible(false);
        setPendingPath(null);
      }, 6000);
    }
    return () => clearTimeout(safetyTimer);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#001546] select-none transition-opacity duration-150"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center max-w-md px-6 text-center">
        {/* Clean university crest — no blur, glow, or dashed rings */}
        <div className="relative mb-5 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
          <img
            src="/svu-color-crest.webp"
            alt="Sri Venkateswara University"
            className="w-full h-full object-contain"
          />
        </div>

        {/* University Name in Telugu */}
        <h2 className="text-base sm:text-lg font-serif font-bold text-white leading-relaxed">
          శ్రీ వేంకటేశ్వర విశ్వవిద్యాలయం
        </h2>

        {/* English Subtitle */}
        <p className="mt-1 text-[11px] sm:text-xs font-mono font-medium uppercase tracking-[0.2em] text-[#FFE9C2]/90">
          Sri Venkateswara University • Tirupati
        </p>

        {/* Dotted orb loader, tinted in the theme gold */}
        <div className="relative mt-6 flex items-center justify-center">
          <ThinkingOrb state="breathing" size={64} theme="dark" color="#FFB21A" aria-label="Loading page" />
        </div>
      </div>
    </div>
  );
}
