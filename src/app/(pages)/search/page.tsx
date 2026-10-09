import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Search as SearchIcon, FileQuestion } from "lucide-react";
import Header from "@/components/InnerHeader";
import Footer from "@/components/InnerFooter";
import SearchBox from "@/components/v2/SearchBox";
import { searchSite, type SearchCategory } from "@/lib/searchIndex";

export const metadata: Metadata = {
  title: "Search — Sri Venkateswara University",
  description: "Search pages, notifications, news and people across the SVU website.",
};

const CATEGORY_STYLES: Record<SearchCategory, string> = {
  Page: "bg-slate-100 text-slate-700",
  Admissions: "bg-rose-100 text-rose-700",
  Academics: "bg-emerald-100 text-emerald-700",
  Research: "bg-violet-100 text-violet-700",
  Administration: "bg-sky-100 text-sky-700",
  Colleges: "bg-amber-100 text-amber-800",
  People: "bg-teal-100 text-teal-700",
  News: "bg-blue-100 text-blue-700",
  Notification: "bg-fuchsia-100 text-fuchsia-700",
  Gallery: "bg-lime-100 text-lime-700",
};

const POPULAR = ["Admissions", "Ph.D.", "Convocation", "Time table", "Scholarship", "Faculty"];

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlight(text: string, terms: string[]): React.ReactNode {
  if (!terms.length) return text;
  const re = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "ig");
  return text.split(re).map((part, i) =>
    terms.some((t) => t.toLowerCase() === part.toLowerCase()) ? (
      <mark key={i} className="bg-[#faa61a]/30 text-inherit rounded px-0.5">
        {part}
      </mark>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const raw = (await searchParams).q;
  const query = (Array.isArray(raw) ? raw[0] : raw ?? "").trim();
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const results = query ? searchSite(query) : [];

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] text-slate-800">
      <Header />

      {/* ─── Hero band ─── */}
      <section className="relative w-full bg-gradient-to-br from-[#001730] via-[#002147] to-[#0a3a63] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]" />
        <div className="relative max-w-4xl mx-auto px-6 py-14 md:py-20">
          <p className="text-[#faa61a] text-xs font-bold uppercase tracking-[0.25em] mb-3">
            Site Search
          </p>
          {query ? (
            <>
              <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight leading-tight">
                Results for <span className="text-[#faa61a]">“{query}”</span>
              </h1>
              <p className="mt-3 text-white/70 text-sm md:text-base">
                {results.length === 0
                  ? "No matching pages or posts found."
                  : `${results.length} matching ${results.length === 1 ? "result" : "results"}`}
              </p>
            </>
          ) : (
            <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight leading-tight">
              What are you looking for?
            </h1>
          )}

          <div className="mt-7 max-w-2xl">
            <SearchBox
              initialQuery={query}
              size="lg"
              autoFocus={!query}
              placeholder="Search courses, notifications, people…"
            />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-white/50 text-xs uppercase tracking-wider mr-1">Popular:</span>
            {POPULAR.map((p) => (
              <Link
                key={p}
                href={`/search?q=${encodeURIComponent(p)}`}
                className="rounded-full border border-white/20 hover:border-[#faa61a] hover:text-[#faa61a] text-white/80 text-xs font-medium px-3 py-1.5 transition-colors"
              >
                {p}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Results ─── */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-12 md:py-16">
        {query && results.length > 0 && (
          <ul className="space-y-4">
            {results.map((r) => (
              <li key={`${r.href}-${r.title}`}>
                <Link
                  href={r.href}
                  className="group block rounded-2xl border border-gray-200 bg-white p-5 md:p-6 shadow-sm hover:shadow-md hover:border-[#faa61a]/50 transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${CATEGORY_STYLES[r.category]}`}
                    >
                      {r.category}
                    </span>
                    {r.date && (
                      <span className="text-xs text-gray-400 font-medium">
                        {new Date(r.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-[#002147] group-hover:text-[#faa61a] transition-colors flex items-center gap-2">
                    {highlight(r.title, terms)}
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                  </h2>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                    {highlight(r.description, terms)}
                  </p>
                  <p className="mt-2 text-xs text-[#0a3a63]/70 font-medium">
                    svu.edu.in{r.href}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* Empty state */}
        {query && results.length === 0 && (
          <div className="text-center py-10">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-[#faa61a]/10 flex items-center justify-center mb-5">
              <FileQuestion className="w-8 h-8 text-[#faa61a]" />
            </div>
            <h2 className="text-xl font-bold text-[#002147]">
              We couldn&apos;t find anything for “{query}”
            </h2>
            <p className="mt-2 text-slate-500 text-sm max-w-md mx-auto">
              Try a different keyword, check your spelling, or browse one of the sections below.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {["Admissions", "Colleges", "Faculty", "Research Centers", "Contact"].map((s) => (
                <Link
                  key={s}
                  href={`/search?q=${encodeURIComponent(s)}`}
                  className="rounded-full border border-gray-200 bg-white hover:border-[#faa61a] hover:text-[#faa61a] text-slate-600 text-xs font-semibold px-3.5 py-2 transition-colors"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* No query yet */}
        {!query && (
          <div className="text-center py-10">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-[#002147]/5 flex items-center justify-center mb-5">
              <SearchIcon className="w-8 h-8 text-[#002147]" />
            </div>
            <h2 className="text-xl font-bold text-[#002147]">Start typing to search</h2>
            <p className="mt-2 text-slate-500 text-sm max-w-md mx-auto">
              Search across pages, admissions info, notifications, exam schedules, news and faculty.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
