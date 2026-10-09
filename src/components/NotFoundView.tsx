import Link from "next/link";
import { ArrowRight, Building2, CalendarDays, GraduationCap, Home, Images, Landmark, Mail, Users } from "lucide-react";
import InnerHeader from "./InnerHeader";
import InnerFooter from "./InnerFooter";
import SearchBox from "./v2/SearchBox";

const QUICK_LINKS = [
  { label: "About SVU", caption: "History, vision & NAAC A+", href: "/about", icon: Landmark, color: "#1F45D6" },
  { label: "Colleges", caption: "Five constituent colleges", href: "/colleges/arts", icon: GraduationCap, color: "#D23F12" },
  { label: "Centres", caption: "13 research centres", href: "/centers", icon: Building2, color: "#0E8050" },
  { label: "Faculty", caption: "Directory & profiles", href: "/people/faculty", icon: Users, color: "#1F45D6" },
  { label: "Events", caption: "Upcoming & past events", href: "/events", icon: CalendarDays, color: "#D23F12" },
  { label: "Gallery", caption: "Campus moments", href: "/gallery", icon: Images, color: "#0E8050" },
];

/** Themed 404 — used for unmatched URLs (global-not-found) and notFound() on inner pages */
export default function NotFoundView() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FFF9EE]">
      <InnerHeader />

      <main className="svu-chrome flex-1">
        {/* Warm Ivory hero with the turning SVU sacred chakra */}
        <section className="relative overflow-hidden bg-[#FFF9EE] px-6 pb-24 pt-16 text-center text-[#001546] sm:pt-20 lg:pb-28 border-b border-[#001546]/10">
          {/* Turning SVU Sacred Chakra Watermark in Dark Blue */}
          <div
            className="pointer-events-none absolute left-1/2 top-48 sm:top-56 h-[480px] w-[480px] sm:h-[580px] sm:w-[580px] -translate-x-1/2 -translate-y-1/2 text-[#001546] opacity-[0.22] select-none"
            aria-hidden="true"
          >
            <div className="h-full w-full motion-safe:animate-[svu-fan-spin_36s_linear_infinite] svu-fan-watermark-art" />
          </div>

          {/* Soft Ambient Radial Glow */}
          <div
            className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[#001546]/5 blur-[120px]"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D23F12]/30 bg-[#D23F12]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#D23F12]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D23F12] animate-pulse" />
              Error 404
            </span>

            {/* Solid filled normal 404 text (no outline, normal font) */}
            <p className="mt-2 font-sans text-7xl sm:text-8xl md:text-9xl font-black leading-none tracking-tight text-[#001546]">
              404
            </p>

            {/* Normal sans-serif heading */}
            <h1 className="mt-4 font-sans text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-[#001546]">
              This page has wandered off campus
            </h1>
            <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-[#5A6382] sm:text-base font-normal">
              The page you&apos;re looking for may have moved, been renamed, or never existed. Search
              for it below, or head back to familiar ground.
            </p>

            <div className="mx-auto mt-8 max-w-xl text-left shadow-md rounded-full">
              <SearchBox size="lg" placeholder="Search the university website…" />
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-[#FFB21A] hover:bg-[#FFE9C2] px-6 py-3 text-sm font-bold text-[#001546] shadow-md transition-all hover:shadow-lg active:scale-95 border-b-2 border-[#D23F12]"
              >
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-[#001546]/20 bg-white hover:bg-[#001546] px-6 py-3 text-sm font-bold text-[#001546] hover:text-white shadow-sm transition-all hover:shadow-md"
              >
                <Mail className="h-4 w-4" />
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* Quick links, lifted over the hero's edge */}
        <section className="relative -mt-12 px-6 pb-20">
          <div className="mx-auto max-w-5xl rounded-[28px] border border-[#001546]/10 bg-white p-6 shadow-[0_24px_60px_-24px_rgba(0,21,70,0.35)] sm:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D23F12]">Or try one of these</p>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {QUICK_LINKS.map(({ label, caption, href, icon: Icon, color }) => (
                <Link
                  key={label}
                  href={href}
                  className="group flex items-center gap-3.5 rounded-2xl border border-[#001546]/10 bg-[#FFF9EE] p-4 transition-all hover:-translate-y-0.5 hover:border-[#FFB21A] hover:shadow-md"
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: color }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-bold text-[#001546]">{label}</span>
                    <span className="block truncate text-xs text-[#5A6382]">{caption}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#D23F12] transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <InnerFooter />
    </div>
  );
}
