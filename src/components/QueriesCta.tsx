"use client";

import { useEffect, useRef, useState } from "react";
import EyeFollowButton from "./EyeFollowButton";
import FolderFloat, { type FolderItem } from "./FolderFloat";

// Common questions shown as pills when the folder opens. Each pill gets its
// own theme colour.
const questions: FolderItem[] = [
  { label: "Criteria to join SVU?", color: "#FFB21A", ink: "#001546" },
  { label: "When do admissions open?", color: "#1F45D6", ink: "#FFFFFF" },
  { label: "What are the fees?", color: "#D23F12", ink: "#FFFFFF" },
  { label: "Hostels on campus?", color: "#0E8050", ink: "#FFFFFF" },
  { label: "Scholarships available?", color: "#23B5E9", ink: "#001546" },
  { label: "How to apply for Ph.D.?", color: "#001546", ink: "#FFE9C2" },
];

export default function QueriesCta() {
  // Pills spread to fit the right column: wider on desktop, tighter on phones
  const colRef = useRef<HTMLDivElement>(null);
  const [spread, setSpread] = useState(155);
  // Phones: two pills per row, allowed to reach into the card's side padding
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const el = colRef.current;
    if (!el) return;
    const apply = (w: number) => {
      if (w <= 0) return;
      const isNarrow = w < 480;
      setNarrow(isNarrow);
      setSpread(Math.round(isNarrow ? w / 2 + 14 : Math.min(260, Math.max(130, w / 2 - 8))));
    };
    apply(el.getBoundingClientRect().width);
    const ro = new ResizeObserver(([entry]) => apply(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <section id="queries" className="bg-[#FFF9EE] px-4 py-[clamp(3rem,7vh,5rem)] sm:px-6 lg:px-12">
      {/* Translucent card (z-10, above the background fan) so the fan shows
          faintly through it and the glass button can blur it */}
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center lg:items-end gap-8 overflow-hidden rounded-[28px] bg-[#FFE9C2]/60 px-6 py-8 sm:px-10 sm:py-12 lg:grid-cols-2 lg:gap-6 lg:px-14 lg:py-[calc(56*var(--dk-space))]">
        {/* Left — copy + the single CTA */}
        <div className="self-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D23F12]">
            Have queries?
          </span>
          <h2 className="mt-3 font-serif text-[clamp(2rem,4.5vw,3.25rem)] lg:text-(length:--dk-h2-lg) font-bold leading-[1.08] tracking-tight text-[#001546]">
            Questions about joining SVU? Let&apos;s talk.
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#5A6382]">
            Admissions, fees, hostels or research programmes — our team will help you find the
            right answer and the right course.
          </p>
          <div className="mt-8 lg:mt-[calc(32*var(--dk-space))]">
            {/* Frosted navy glass — the rotating fan blurs through it */}
            <EyeFollowButton
              href="/contact"
              buttonColor="rgba(0, 21, 70, 0.8)"
              className="border border-white/20 backdrop-blur-md backdrop-saturate-200 [box-shadow:inset_0_1px_0_rgba(255,255,255,0.22),10px_10px_14px_-1.25px_rgba(0,21,70,0.19)]"
            >
              Contact us
            </EyeFollowButton>
          </div>
        </div>

        {/* Right — folder of common questions */}
        <div ref={colRef} className="flex justify-center">
          <FolderFloat
            items={questions}
            label="Admission queries"
            sublabel={`${questions.length} common questions`}
            closeOnSelect={false}
            spread={spread}
            perRow={narrow ? 2 : undefined}
            reach={narrow ? undefined : 160}
            folderColor="#0B2463"
            frontColor="#1F45D6"
            paperColor="#FFF9EE"
            labelColor="#FFFFFF"
            width={220}
            height={160}
          />
        </div>
      </div>
    </section>
  );
}
