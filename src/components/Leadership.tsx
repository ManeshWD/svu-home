"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { ArrowRight } from "lucide-react";

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
    href: "#",
  },
  {
    role: "Rector",
    name: "Prof. N. Cherdrayudu",
    summary:
      "Prof. N. Cherdrayudu's message on academic standards, student mentorship, multidisciplinary curriculum, and holistic campus life across all constituent colleges.",
    image: "/leadership/rector-portrait.webp",
    alt: "Prof. N. Cherdrayudu, Rector",
    href: "#",
  },
  {
    role: "Registrar",
    name: "Prof. M. Bhupathi Naidu",
    summary:
      "Prof. M. Bhupathi Naidu's message on governance, admissions, administration, and university examinations — ensuring student-centric transparency, precision, and efficiency.",
    image: "/leadership/registrar-portrait.webp",
    alt: "Prof. M. Bhupathi Naidu, Registrar",
    href: "#",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Leadership() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="leadership"
      className="bg-[#001546] px-6 py-[clamp(3rem,7vh,5rem)] lg:px-12 text-white"
    >
      <MotionConfig reducedMotion="user">
        {/* z-10: above the section's background fan, so the cards frost it */}
        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left — heading + accordion */}
          <div className="lg:col-span-7">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#23B5E9]">
              Leadership
            </span>
            <h2 className="mt-2 font-serif text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight tracking-tight">
              Messages from our leadership
            </h2>

            <div className="mt-8 space-y-4">
              {leaders.map((leader, i) => {
                const open = i === active;
                return (
                  <div key={leader.role} className="space-y-3">
                    {/* Mobile Leader Image - renders directly on top of the active pill */}
                    {open && (
                      <div className="relative h-80 sm:h-96 w-full overflow-hidden rounded-2xl border border-white/10 shadow-lg lg:hidden">
                        <Image
                          src={leader.image}
                          alt={leader.alt}
                          fill
                          unoptimized
                          className="object-cover object-top"
                        />
                      </div>
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
                        className="w-full px-6 py-5 text-left sm:px-7"
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
                            <a
                              href={leader.href}
                              className="group flex items-center justify-center gap-2 bg-gradient-to-r from-[#FFB21A] to-[#FFC94D] py-3 text-sm font-bold text-[#001546] transition-[filter] hover:brightness-105"
                            >
                              Read full message
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </a>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — image for the open item (desktop only) */}
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
                <Image
                  src={leaders[active].image}
                  alt={leaders[active].alt}
                  fill
                  unoptimized
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001546]/85 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 flex flex-col text-white">
                  <span className="text-base sm:text-lg font-bold leading-tight">
                    {leaders[active].name}
                  </span>
                  <span className="text-xs sm:text-sm text-[#23B5E9] font-medium mt-0.5">
                    {leaders[active].role}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </MotionConfig>
    </section>
  );
}
