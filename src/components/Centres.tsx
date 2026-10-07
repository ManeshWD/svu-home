"use client";

import React, { useEffect, useRef, useState } from "react";
import { MotionConfig, animate, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight, X, ExternalLink, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// EXACT HOVER.DEV SPRING CARD COMPONENT
// Source: https://www.hover.dev/components/cards#spring-cards
// ============================================================================

interface SpringCardProps {
  title: string;
  subtitle: string;
  className?: string;
  containerClassName?: string;
  id: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const SpringCard = ({
  title,
  subtitle,
  className,
  containerClassName,
  id,
  buttonText = "LET'S GO",
}: SpringCardProps) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0.5 }}>
      <motion.div
        whileHover="hovered"
        animate={isClicked ? "hovered" : "rest"}
        onClick={() => setIsClicked((prev) => !prev)}
        className={cn(
          "group w-full border-2 border-black cursor-pointer select-none",
          containerClassName,
          className
        )}
      >
        {/* Layer 2 (Middle Layer) */}
        <motion.div
          initial={{ x: 0, y: 0 }}
          variants={{ hovered: { x: -8, y: -8 }, rest: { x: 0, y: 0 } }}
          className={cn("-m-0.5 border-2 border-black", className)}
        >
          {/* Layer 1 (Front Card) */}
          <motion.div
            initial={{ x: 0, y: 0 }}
            variants={{ hovered: { x: -8, y: -8 }, rest: { x: 0, y: 0 } }}
            className={cn(
              "relative -m-0.5 flex h-72 sm:h-80 flex-col justify-between overflow-hidden border-2 border-black p-6 sm:p-8",
              className
            )}
          >
            {/* Title with sliding arrow on hover or click */}
            <p className="flex items-center text-xl sm:text-2xl font-bold uppercase tracking-tight text-black">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn(
                  "mr-2 transition-all duration-300 ease-in-out shrink-0 h-6 w-6 text-black",
                  isClicked
                    ? "ml-0 opacity-100"
                    : "-ml-8 opacity-0 group-hover:ml-0 group-hover:opacity-100"
                )}
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
              <span>{title}</span>
            </p>

            {/* Description + Slide-up button on hover or click */}
            <div>
              <p
                className={cn(
                  "text-xs sm:text-sm font-medium leading-relaxed text-black/90 transition-[margin] duration-300 ease-in-out",
                  isClicked ? "mb-12" : "group-hover:mb-12"
                )}
              >
                {subtitle}
              </p>
              <button
                type="button"
                className={cn(
                  "absolute bottom-2.5 left-2.5 right-2.5 border-2 border-black bg-white px-4 py-2 font-mono text-xs sm:text-sm font-black uppercase tracking-wider text-black transition-all duration-300 ease-in-out hover:bg-black hover:text-white cursor-pointer active:scale-[0.99] shadow-sm",
                  isClicked
                    ? "translate-y-0 opacity-100"
                    : "translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                )}
              >
                {buttonText}
              </button>
            </div>

            {/* Top-Right Circular Rotating Text (Learned from Hover.dev Spring Cards) */}
            {/* Spun by a CSS keyframe (svu-spring-card-spin) so it runs on the
                compositor instead of a per-frame JS loop */}
            <svg
              style={{ top: "0", right: "0" }}
              width="200"
              height="200"
              className="svu-spring-card-spin pointer-events-none absolute z-10 rounded-full"
            >
              <path
                id={`circlePath-${id}`}
                d="M100,100 m-100,0 a100,100 0 1,0 200,0 a100,100 0 1,0 -200,0"
                fill="none"
              />
              <text>
                <textPath
                  href={`#circlePath-${id}`}
                  fill="black"
                  className="fill-black text-2xl font-black uppercase opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 tracking-wider"
                >
                  LEARN MORE • LEARN MORE • LEARN MORE • LEARN MORE •
                </textPath>
              </text>
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
};

// ============================================================================
// COUNT-UP NUMBER — runs once when scrolled into view
// ============================================================================

function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!inView || !el) return;
    if (reduceMotion) {
      el.textContent = `${prefix}${to}${suffix}`;
      return;
    }
    // Write straight to the DOM — no re-render per frame
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = `${prefix}${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, to, prefix, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}0{suffix}
    </span>
  );
}

// ============================================================================
// DATA DEFINITIONS
// ============================================================================

interface FeaturedCentre {
  id: string;
  badge: string;
  fullName: string;
  description: string;
  bgClass: string;
  containerClass?: string;
}

const featuredCentres: FeaturedCentre[] = [
  {
    id: "acas",
    badge: "DYNAMIC",
    fullName: "Advanced Centre for Atmospheric Studies",
    description:
      "Advanced Centre for Atmospheric Studies (ACAS). ISRO-collaborative atmospheric radar research, satellite meteorological analytics, and high-altitude ionospheric modeling.",
    bgClass: "bg-[#5EEAD4]", // Mint Green (Matches hover.dev dynamic card)
  },
  {
    id: "bif",
    badge: "DATA DRIVEN",
    fullName: "Bioinformatics Infrastructure Facility",
    description:
      "Bioinformatics Infrastructure Facility (BIF). High-throughput genomic sequencing, molecular docking simulations, and scientific supercomputing clusters funded by DBT.",
    bgClass: "bg-[#93C5FD]", // Periwinkle Blue (Matches hover.dev data driven card)
    containerClass: "sm:-translate-y-4 lg:-translate-y-6",
  },
  {
    id: "cerdat",
    badge: "DUTIFUL",
    fullName: "Centre for Extension & Rural Development",
    description:
      "Centre for Extension & Rural Development (CERDAT). Grassroots agro-ecological research, community skill empowerment, and sustainable rural technology transfer.",
    bgClass: "bg-[#FFA099]", // Coral / Salmon Pink (Matches hover.dev dutiful card)
  },
  {
    id: "ori",
    badge: "DEMURE",
    fullName: "Oriental Research Institute",
    description:
      "Oriental Research Institute (ORI). World-renowned Indological treasure preserving 14,000+ ancient palm-leaf manuscripts and rare Sanskrit scriptures.",
    bgClass: "bg-[#FFD13B]", // Bright Saffron / Yellow (Matches hover.dev demure card)
    containerClass: "sm:-translate-y-4 lg:-translate-y-6",
  },
];

const allCentres = [
  {
    short: "ACAS",
    name: "Advanced Centre for Atmospheric Studies",
    category: "Space & Physics",
    desc: "Premier facility collaborating with ISRO, NARL, and DST on atmospheric dynamics and weather modeling.",
  },
  {
    short: "BIF",
    name: "Bioinformatics Infrastructure Facility",
    category: "Life Sciences",
    desc: "National node for computational biology, protein modeling, and genomic data analytics supported by DBT.",
  },
  {
    short: "CSEAP",
    name: "Centre for Southeast Asian & Pacific Studies",
    category: "Area Studies",
    desc: "UGC Area Study Centre specializing in foreign policy, geopolitics, and socio-economic dynamics of SE Asia.",
  },
  {
    short: "CC",
    name: "Computer Centre",
    category: "IT & Computing",
    desc: "Central computing backbone providing high-performance campus networking, cloud nodes, and IT resources.",
  },
  {
    short: "CERDAT",
    name: "Centre for Extension & Rural Development",
    category: "Social Impact",
    desc: "Grassroots outreach institute empowering Rayalaseema villages with agricultural and vocational technology.",
  },
  {
    short: "DOA",
    name: "Directorate of Admissions",
    category: "Admissions",
    desc: "Autonomous administration cell conducting SVUCET entrance tests and merit counselling across faculties.",
  },
  {
    short: "CDOE",
    name: "Centre for Distance and Online Education",
    category: "Lifelong Learning",
    desc: "Pioneering flexible, distance education and certified skill diplomas for diverse global learners.",
  },
  {
    short: "DST-PURSE",
    name: "DST PURSE Centre",
    category: "Central Instrumentation",
    desc: "Flagship multi-crore central instrumentation facility housing FE-SEM, NMR, HR-MS, and XRD equipment.",
  },
  {
    short: "MMTTC",
    name: "Malaviya Mission Teacher Training Centre",
    category: "Pedagogy",
    desc: "National HRDC training cell upskilling university and college faculty across southern India.",
  },
  {
    short: "DSWCA",
    name: "Directorate of Student Welfare & Cultural Affairs",
    category: "Campus Life",
    desc: "Governing body steering cultural festivals, youth delegacies, counseling, and hostel welfare.",
  },
  {
    short: "IC",
    name: "SVU Incubation & Innovation Centre",
    category: "Startups & IPR",
    desc: "Startup incubator fostering student patents, pre-seed prototyping, and deep-tech entrepreneurial ventures.",
  },
  {
    short: "MST",
    name: "MST Radar Centre",
    category: "Atmospheric Radar",
    desc: "Specialized mesosphere-stratosphere-troposphere radar observatory studying high-altitude turbulence.",
  },
  {
    short: "ORI",
    name: "Oriental Research Institute",
    category: "Heritage & Indology",
    desc: "Preserving over 14,000 priceless palm-leaf manuscripts and promoting classical Indological scholarship.",
  },
];

export default function Centres() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Space & Physics",
    "Life Sciences",
    "IT & Computing",
    "Social Impact",
    "Central Instrumentation",
    "Heritage & Indology",
  ];

  const filteredCentres =
    selectedCategory === "All"
      ? allCentres
      : allCentres.filter((c) => c.category === selectedCategory);

  return (
    <section
      id="centres"
      className="relative w-full bg-[#FFF9EE] text-[#0C1230]"
    >
        {/* Main 2-Column Split: content on the left, 4 Spring Cards on the right */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* ======================================================== */}
          {/* LEFT COLUMN: Section Description & CTA Buttons */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-between px-6 sm:px-10 lg:pl-16 lg:pr-12 xl:pl-[max(4rem,calc((100vw-80rem)/2+2rem))] pt-12 pb-4 sm:py-16 lg:py-24">
            <div>
              {/* Eyebrow Pill */}
              <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[#D23F12] mb-4">
                Centres of Excellence
              </span>

              {/* Serif Headline */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#001546] leading-[1.15] tracking-tight">
                Pioneering Research That Powers National Breakthroughs
              </h2>

              {/* Detailed Paragraph */}
              <p className="mt-5 text-sm sm:text-base text-[#5A6382] leading-relaxed font-normal">
                Sri Venkateswara University operates 13 specialized multidisciplinary centres and national research facilities. Supported by DST, DBT, ISRO, and global academic councils, our laboratories accelerate translational science, patent filings, and grassroots regional development.
              </p>

              {/* Research Metrics Grid — count up on scroll */}
              <div className="mt-8 grid grid-cols-3 gap-4 border-y border-[#001546]/15 py-6">
                <div>
                  <div className="font-mono text-2xl sm:text-3xl font-black text-[#001546]">
                    <Counter to={13} suffix="+" />
                  </div>
                  <div className="text-xs font-semibold text-[#5A6382] uppercase tracking-wider mt-1">Specialized Centres</div>
                </div>
                <div>
                  <div className="font-mono text-2xl sm:text-3xl font-black text-[#1F45D6]">
                    <Counter to={70} suffix="+" />
                  </div>
                  <div className="text-xs font-semibold text-[#5A6382] uppercase tracking-wider mt-1">Active Patents</div>
                </div>
                <div>
                  <div className="font-mono text-2xl sm:text-3xl font-black text-[#D23F12]">
                    <Counter to={45} prefix="₹" suffix="+ Cr" />
                  </div>
                  <div className="text-xs font-semibold text-[#5A6382] uppercase tracking-wider mt-1">Research Grants</div>
                </div>
              </div>
            </div>

            {/* "Show All Centres" Button (Desktop only here) */}
            <div className="hidden lg:block mt-8 pt-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-3 bg-[#001546] hover:bg-[#1F45D6] text-white px-7 py-4 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-200 shadow-md hover:shadow-xl active:scale-95 cursor-pointer group"
              >
                <span>SHOW ALL CENTRES</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#FFB21A]" />
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: 4 Spring Cards matching Hover.dev Implementation */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 content-center gap-6 sm:gap-7 px-6 sm:px-10 lg:pl-12 lg:pr-16 xl:pr-[max(4rem,calc((100vw-80rem)/2+2rem))] pt-2 pb-14 sm:py-16 lg:py-24">
            {featuredCentres.map((centre) => (
              <SpringCard
                key={centre.id}
                id={centre.id}
                title={centre.badge}
                subtitle={centre.description}
                className={centre.bgClass}
                containerClassName={centre.containerClass}
                buttonText="LET'S GO"
              />
            ))}

            {/* Mobile "Show All Centres" Button - positioned after cards */}
            <div className="lg:hidden mt-2 flex justify-center sm:col-span-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#001546] hover:bg-[#1F45D6] text-white px-7 py-4 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-200 shadow-md hover:shadow-xl active:scale-95 cursor-pointer group"
              >
                <span>SHOW ALL CENTRES</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#FFB21A]" />
              </button>
            </div>
          </div>
        </div>

      {/* ======================================================== */}
      {/* "SHOW ALL CENTRES" INTERACTIVE MODAL */}
      {/* ======================================================== */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#000E2C]/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#FFF9EE] border-4 border-[#001546] shadow-2xl rounded-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-[#001546] text-white px-6 sm:px-10 py-5 flex items-center justify-between border-b-2 border-[#FFB21A] flex-shrink-0">
              <div className="flex items-center gap-3">
                <Building2 className="w-6 h-6 text-[#FFB21A]" />
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight">
                    All Specialized Centres & Institutes
                  </h3>
                  <p className="text-xs text-[#23B5E9] font-mono mt-0.5">
                    Sri Venkateswara University • 13 Centres of Excellence
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg bg-white/10 hover:bg-[#D23F12] text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Pills */}
            <div className="px-6 sm:px-10 py-3.5 bg-[#FFE9C2]/60 border-b border-[#001546]/10 flex items-center gap-2 overflow-x-auto flex-shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#001546] text-white shadow-sm"
                      : "bg-white/80 text-[#001546] hover:bg-white border border-[#001546]/15"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Modal Centres Grid */}
            <div className="p-6 sm:p-10 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredCentres.map((centre) => (
                <div
                  key={centre.short}
                  className="bg-white border-2 border-black p-5 flex flex-col justify-between shadow-[3px_3px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="font-mono text-sm font-black text-black bg-[#FFD13B] px-2 py-0.5 border border-black uppercase">
                        {centre.short}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-[#5A6382] uppercase">
                        {centre.category}
                      </span>
                    </div>

                    <h4 className="font-serif text-base sm:text-lg font-bold text-[#001546] leading-snug">
                      {centre.name}
                    </h4>

                    <p className="mt-2 text-xs text-[#5A6382] leading-relaxed">
                      {centre.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono font-semibold text-[#0E8050]">
                      Active Research Cell
                    </span>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#1F45D6] hover:text-[#001546] uppercase cursor-pointer"
                    >
                      <span>Details</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="bg-[#FFE9C2]/40 px-6 sm:px-10 py-4 border-t border-[#001546]/10 flex items-center justify-between flex-shrink-0 text-xs text-[#5A6382]">
              <span>Showing {filteredCentres.length} of {allCentres.length} Centres</span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-[#001546] text-white px-5 py-2 rounded-lg font-mono text-xs font-bold uppercase hover:bg-[#1F45D6] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
