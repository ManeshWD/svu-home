"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import PixelButton from "./PixelButton";

// Leadership office-holders. The *-portrait images are the originals trimmed
// just above each head, so the name plates printed in the photos never show.
const leaders = [
  {
    role: "Hon'ble Vice-Chancellor",
    name: "Prof. Tata Narasinga Rao",
    summary:
      "Prof. Tata Narasinga Rao's message on SVU's vision for transformative teaching, cutting-edge research, and service to the nation — advancing Sri Venkateswara University into its next chapter of global excellence.",
    image: "/leadership/vice_chancellor-portrait.webp",
    alt: "Prof. Tata Narasinga Rao, Hon'ble Vice-Chancellor",
    href: "/administration/vice-chancellor",
  },
  {
    role: "Rector",
    name: "Prof. N. Cherdrayudu",
    summary:
      "Prof. N. Cherdrayudu's message on academic standards, student mentorship, multidisciplinary curriculum, and holistic campus life across all constituent colleges.",
    image: "/leadership/rector-portrait.webp",
    alt: "Prof. N. Cherdrayudu, Rector",
    href: "/administration/rector",
  },
  {
    role: "Registrar",
    name: "Prof. M. Bhupathi Naidu",
    summary:
      "Prof. M. Bhupathi Naidu's message on governance, admissions, administration, and university examinations — ensuring student-centric transparency, precision, and efficiency.",
    image: "/leadership/registrar-portrait.webp",
    alt: "Prof. M. Bhupathi Naidu, Registrar",
    href: "/administration/registrar",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Leadership() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="leadership"
      className="relative bg-[#001546] px-6 py-[clamp(3rem,7vh,5rem)] lg:px-12 text-white overflow-hidden"
    >
      {/* University Crest Background Emblem — centered, fully contained & clearly visible */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none z-0 px-4 py-6"
        aria-hidden="true"
      >
        <div className="relative h-[72%] max-h-[460px] aspect-[996/1024] opacity-35 drop-shadow-[0_0_50px_rgba(52,211,140,0.35)]">
          <Image
            src="/leadership-crest-bg.webp"
            alt=""
            fill
            unoptimized
            className="object-contain"
          />
        </div>
      </div>

      <MotionConfig reducedMotion="user">
        {/* z-10: above the section's background crest, so the frosted cards blur it */}
        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left — heading + accordion */}
          <div className="lg:col-span-7">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#23B5E9]">
              Leadership
            </span>
            <h2 className="mt-2 font-serif text-[clamp(1.75rem,4vw,2.75rem)] lg:text-(length:--dk-h2) font-bold leading-tight tracking-tight">
              Messages from our leadership
            </h2>

            <div className="mt-8 lg:mt-[calc(32*var(--dk-space))] space-y-4">
              {leaders.map((leader, i) => {
                const open = i === active;
                return (
                  <div key={leader.role} className="space-y-3">
                    {/* Mobile Leader Image - clickable link directly to leader's message */}
                    {open && (
                      <Link
                        href={leader.href}
                        className="group relative block h-80 sm:h-96 w-full overflow-hidden rounded-2xl border border-white/10 shadow-lg lg:hidden cursor-pointer"
                        title={`Read full message from ${leader.name}`}
                      >
                        <Image
                          src={leader.image}
                          alt={leader.alt}
                          fill
                          unoptimized
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#001546]/90 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white pointer-events-none">
                          <div className="flex flex-col">
                            <span className="text-base font-bold leading-tight">{leader.name}</span>
                            <span className="text-xs text-[#23B5E9] font-medium mt-0.5">{leader.role}</span>
                          </div>
                          <span className="flex items-center gap-1 text-xs font-bold text-[#FFB21A] bg-[#001546]/80 px-2.5 py-1 rounded-full border border-[#FFB21A]/30">
                            Read <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </Link>
                    )}

                    <div
                      className={`overflow-hidden rounded-xl border backdrop-blur-md backdrop-saturate-150 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-colors duration-300 ${
                        open
                          ? "border-[#FFB21A] bg-[#041B55]/45"
                          : "border-white/12 bg-white/[0.05] hover:border-white/30"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setActive(i)}
                        aria-expanded={open}
                        aria-controls={`leader-panel-${i}`}
                        className="w-full px-6 py-5 text-left sm:px-7 cursor-pointer"
                      >
                        <div className="flex flex-col">
                          <span
                            className={`text-lg font-bold transition-colors duration-300 sm:text-xl ${
                              open ? "text-[#FFB21A]" : "text-white"
                            }`}
                          >
                            {leader.role}
                          </span>
                          <span
                            className={`text-xs sm:text-sm font-medium mt-0.5 transition-colors duration-300 ${
                              open ? "text-[#FFE9C2]/90" : "text-white/60"
                            }`}
                          >
                            {leader.name}
                          </span>
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            id={`leader-panel-${i}`}
                            key="panel"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease }}
                          >
                            <p className="px-6 pb-8 text-[15px] leading-relaxed text-[#FFE9C2]/85 sm:px-7">
                              {leader.summary}
                            </p>
                            <div className="px-6 pb-6 sm:px-7">
                              <PixelButton
                                href={leader.href}
                                className="w-full sm:w-auto px-6 py-2.5 text-xs sm:text-sm font-bold tracking-wide"
                                background="#FFB21A"
                                pixelColor="#001546"
                                fontDefaultColor="#001546"
                                fontHoverColor="#FFB21A"
                                pixelSize={14}
                                staggerStep={0.02}
                                reveal="random"
                              >
                                <span>Read full message</span>
                                <ArrowRight className="h-4 w-4" />
                              </PixelButton>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — Clickable image for the open item (desktop only) */}
          <div className="relative hidden min-h-[380px] overflow-hidden rounded-2xl border border-white/10 lg:block lg:col-span-5">
            <AnimatePresence initial={false}>
              <motion.div
                key={leaders[active].image}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease }}
                className="absolute inset-0"
              >
                <Link
                  href={leaders[active].href}
                  className="group relative block w-full h-full cursor-pointer"
                  title={`Read full message from ${leaders[active].name}`}
                >
                  <Image
                    src={leaders[active].image}
                    alt={leaders[active].alt}
                    fill
                    unoptimized
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001546]/90 via-[#001546]/20 to-transparent transition-opacity duration-300 group-hover:from-[#001546]" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
                    <div className="flex flex-col">
                      <span className="text-base sm:text-lg font-bold leading-tight group-hover:text-[#FFB21A] transition-colors">
                        {leaders[active].name}
                      </span>
                      <span className="text-xs sm:text-sm text-[#23B5E9] font-medium mt-0.5">
                        {leaders[active].role}
                      </span>
                    </div>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-[#001546] bg-[#FFB21A] hover:bg-[#FFE9C2] px-3 py-1.5 rounded-full transition-all duration-300 group-hover:scale-105 shadow-md">
                      View Message
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </MotionConfig>
    </section>
  );
}
