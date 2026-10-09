"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, ChevronRight, Clock, MapPin, Search, X } from "lucide-react";
import Header from "@/components/InnerHeader";
import Footer from "@/components/InnerFooter";
import { categoryColor, events, type EventCategory, type UniversityEvent } from "@/data/events";

type When = "upcoming" | "past" | "all";

const WHEN_TABS: { id: When; label: string }[] = [
  { id: "upcoming", label: "Upcoming" },
  { id: "past", label: "Past events" },
  { id: "all", label: "All" },
];

const CATEGORIES = Object.keys(categoryColor) as EventCategory[];

const toDate = (iso: string) => new Date(`${iso}T00:00:00`);
const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export default function EventsPage() {
  const [today] = useState(todayISO);
  const [when, setWhen] = useState<When>("upcoming");
  const [category, setCategory] = useState<EventCategory | "All">("All");
  const [query, setQuery] = useState("");

  const upcomingCount = events.filter((e) => e.date >= today).length;

  // Filtered, sorted (upcoming: soonest first; otherwise newest first) and grouped by month
  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = events
      .filter((e) => (when === "upcoming" ? e.date >= today : when === "past" ? e.date < today : true))
      .filter((e) => category === "All" || e.category === category)
      .filter((e) => !q || `${e.title} ${e.description} ${e.venue}`.toLowerCase().includes(q))
      .sort((a, b) => (when === "upcoming" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)));

    const byMonth = new Map<string, UniversityEvent[]>();
    for (const e of list) {
      const key = toDate(e.date).toLocaleString("en-US", { month: "long", year: "numeric" });
      byMonth.set(key, [...(byMonth.get(key) ?? []), e]);
    }
    return [...byMonth.entries()];
  }, [when, category, query, today]);

  const resultCount = groups.reduce((n, [, list]) => n + list.length, 0);

  return (
    <div className="flex min-h-screen flex-col bg-[#FFF9EE]">
      <Header />

      <main className="svu-chrome flex-1 text-[#0C1230]">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-[#001546] px-6 pb-28 pt-10 text-white lg:px-12">
          <div
            className="pointer-events-none absolute -top-40 right-0 h-[420px] w-[720px] rounded-full bg-[#1F45D6]/20 blur-[120px]"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-6xl">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#FFE9C2]/70">
              <Link href="/" className="hover:text-[#FFB21A]">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-[#FFB21A]">Events</span>
            </nav>

            <div className="mt-8 grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#23B5E9]">Events archive</span>
                <h1 className="mt-3 font-serif text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.08] tracking-tight">
                  What&apos;s happening at SVU
                </h1>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#FFE9C2]/85">
                  Placement drives, symposiums, festivals, sports meets and convocations — every date on the
                  university calendar, past and upcoming.
                </p>
              </div>

              <dl className="grid grid-cols-3 gap-3 lg:col-span-4">
                {[
                  { label: "Events", value: events.length },
                  { label: "Upcoming", value: upcomingCount },
                  { label: "Categories", value: CATEGORIES.length },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center">
                    <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#FFE9C2]/70">{s.label}</dt>
                    <dd className="mt-1 font-serif text-3xl font-bold text-[#FFB21A]">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ── Filters (lifted over the hero) ── */}
        <section className="relative -mt-16 px-6 lg:px-12">
          <div className="mx-auto max-w-6xl rounded-[24px] border border-[#001546]/10 bg-white p-4 shadow-[0_24px_60px_-24px_rgba(0,21,70,0.35)] sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="inline-flex w-fit rounded-full bg-[#FFF9EE] p-1" role="tablist" aria-label="When">
                {WHEN_TABS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={when === t.id}
                    onClick={() => setWhen(t.id)}
                    className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                      when === t.id ? "bg-[#001546] text-white shadow-sm" : "text-[#5A6382] hover:text-[#001546]"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <label className="flex h-11 w-full items-center gap-2 rounded-full border border-[#001546]/15 bg-[#FFF9EE] px-4 lg:w-80">
                <Search className="h-4 w-4 shrink-0 text-[#5A6382]" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search events, venues…"
                  className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#001546] outline-none placeholder:text-[#5A6382]/70"
                />
                {query && (
                  <button type="button" onClick={() => setQuery("")} aria-label="Clear search">
                    <X className="h-4 w-4 text-[#5A6382]" />
                  </button>
                )}
              </label>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 border-t border-[#001546]/10 pt-4">
              {(["All", ...CATEGORIES] as const).map((c) => {
                const on = category === c;
                const color = c === "All" ? "#001546" : categoryColor[c];
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                      on ? "text-white" : "border-[#001546]/15 bg-white text-[#001546] hover:border-[#001546]/40"
                    }`}
                    style={on ? { backgroundColor: color, borderColor: color } : undefined}
                  >
                    {c !== "All" && (
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: on ? "#FFFFFF" : color }} />
                    )}
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Event list, grouped by month ── */}
        <section className="px-6 pb-20 pt-10 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5A6382]">
              {resultCount} {resultCount === 1 ? "event" : "events"}
            </p>

            {groups.length === 0 ? (
              <div className="mt-6 rounded-[24px] border border-dashed border-[#001546]/20 bg-white px-6 py-16 text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FFE9C2] text-[#D23F12]">
                  <CalendarDays className="h-6 w-6" />
                </span>
                <h2 className="mt-4 font-serif text-2xl font-bold text-[#001546]">No events found</h2>
                <p className="mt-2 text-sm text-[#5A6382]">Try another category, clear the search, or look at past events.</p>
                <button
                  type="button"
                  onClick={() => {
                    setWhen("all");
                    setCategory("All");
                    setQuery("");
                  }}
                  className="mt-6 rounded-full bg-[#001546] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#1F45D6]"
                >
                  Show all events
                </button>
              </div>
            ) : (
              groups.map(([month, list]) => (
                <div key={month} className="mt-8">
                  <h2 className="flex items-center gap-3 font-serif text-2xl font-bold text-[#001546]">
                    {month}
                    <span className="h-px flex-1 bg-[#001546]/10" />
                  </h2>
                  <ul className="mt-4 space-y-4">
                    {list.map((e) => (
                      <EventRow key={e.slug} event={e} past={e.date < today} />
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function EventRow({ event, past }: { event: UniversityEvent; past: boolean }) {
  const d = toDate(event.date);
  const color = categoryColor[event.category];

  return (
    <li
      id={event.slug}
      className="group flex scroll-mt-28 flex-col overflow-hidden rounded-[20px] border border-[#001546]/10 bg-white transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-20px_rgba(0,21,70,0.35)] sm:flex-row"
    >
      {/* Date block */}
      <div
        className={`flex shrink-0 items-center gap-3 px-6 py-4 text-white sm:w-36 sm:flex-col sm:justify-center sm:gap-0 ${past ? "opacity-70" : ""}`}
        style={{ backgroundColor: color }}
      >
        <span className="font-[family-name:var(--font-heading)] text-4xl font-black leading-none sm:text-5xl">
          {String(d.getDate()).padStart(2, "0")}
        </span>
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/85 sm:mt-1">
          {d.toLocaleString("en-US", { month: "short" })} {d.getFullYear()}
        </span>
        <span className="text-[11px] font-semibold text-white/75 sm:mt-1">{d.toLocaleString("en-US", { weekday: "long" })}</span>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-center lg:gap-8">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]"
              style={{ backgroundColor: `${color}1A`, color }}
            >
              {event.category}
            </span>
            {past ? (
              <span className="rounded-full bg-[#5A6382]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#5A6382]">
                Past
              </span>
            ) : (
              <span className="rounded-full bg-[#FFB21A]/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#9A6400]">
                Upcoming
              </span>
            )}
          </div>
          <h3 className="mt-2 text-xl font-bold leading-snug text-[#001546]">{event.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-[#5A6382]">{event.description}</p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 text-sm text-[#0C1230] lg:w-64">
          <span className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D23F12]" />
            {event.venue}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4 shrink-0 text-[#1F45D6]" />
            {event.time}
          </span>
        </div>
      </div>
    </li>
  );
}
