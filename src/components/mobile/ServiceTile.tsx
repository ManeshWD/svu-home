"use client";

import type { QuickService } from "@/data/services";
import { goToHref } from "./appEvents";

/** App-icon style tile: coloured rounded square + label, with a press-down tap */
export default function ServiceTile({ service, onSelect }: { service: QuickService; onSelect?: () => void }) {
  const { label, href, icon: Icon, tint, ink, external } = service;
  return (
    <button
      type="button"
      onClick={() => {
        onSelect?.();
        goToHref(href, external);
      }}
      className="group flex min-h-[44px] flex-col items-center gap-2 rounded-2xl p-1 text-center transition-transform duration-150 active:scale-[0.92]"
    >
      <span
        className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-[0_6px_16px_-6px_rgba(0,21,70,0.35)]"
        style={{ backgroundColor: tint, color: ink }}
      >
        <Icon className="h-6 w-6" strokeWidth={2} />
      </span>
      <span className="text-[11.5px] font-semibold leading-tight text-[#001546]">{label}</span>
    </button>
  );
}
