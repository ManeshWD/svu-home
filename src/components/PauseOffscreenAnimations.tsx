"use client";

import { useEffect } from "react";

/** Sections whose endless CSS loops (fans, marquees, orbit…) can rest off-screen */
const SECTION_SELECTOR = ".svu-fan-section, footer";

/**
 * Flags page sections that are scrolled well out of view with
 * `data-offscreen`; globals.css pauses their infinite animations there.
 * The margin wakes a section up before it reaches the viewport, so a
 * paused loop is never seen standing still.
 */
export default function PauseOffscreenAnimations() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.toggleAttribute("data-offscreen", !entry.isIntersecting);
        }
      },
      { rootMargin: "300px 0px" }
    );
    document.querySelectorAll(SECTION_SELECTOR).forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      document
        .querySelectorAll("[data-offscreen]")
        .forEach((el) => el.removeAttribute("data-offscreen"));
    };
  }, []);

  return null;
}
