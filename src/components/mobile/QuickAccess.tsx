"use client";

import { LayoutGrid } from "lucide-react";
import { quickServices } from "@/data/services";
import ServiceTile from "./ServiceTile";
import { APP_EVENTS, emitAppEvent } from "./appEvents";

/** Mobile-only grid of the most-used services, right under the hero */
export default function QuickAccess() {
  return (
    <section id="quick-access" className="bg-[#FFF9EE] px-4 pb-2 pt-8 sm:px-6 lg:hidden" aria-labelledby="quick-access-heading">
      <div className="rounded-[26px] border border-[#001546]/[0.08] bg-white/70 p-4 shadow-[0_10px_30px_-18px_rgba(0,21,70,0.35)] backdrop-blur-sm sm:p-6">
        <div className="mb-4 flex items-end justify-between gap-4 px-1">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D23F12]">Quick access</span>
            <h2 id="quick-access-heading" className="mt-1 font-serif text-[22px] font-bold leading-tight text-[#001546]">
              Frequently used services
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-x-1 gap-y-4 sm:grid-cols-8">
          {quickServices.slice(0, 7).map((s) => (
            <ServiceTile key={s.label} service={s} />
          ))}
          {/* Opens the full services sheet */}
          <button
            type="button"
            onClick={() => emitAppEvent(APP_EVENTS.openServices)}
            className="flex min-h-[44px] flex-col items-center gap-2 rounded-2xl p-1 text-center transition-transform duration-150 active:scale-[0.92]"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-dashed border-[#001546]/25 text-[#001546]">
              <LayoutGrid className="h-6 w-6" />
            </span>
            <span className="text-[11.5px] font-semibold leading-tight text-[#001546]">All services</span>
          </button>
        </div>
      </div>
    </section>
  );
}
