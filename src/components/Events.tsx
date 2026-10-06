"use client";

import { useState } from "react";
import { MotionConfig, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import SquishyButton from "./SquishyButton";

// Placeholder events — replace with the university's real calendar.
const events = [
  {
    day: "14",
    month: "Nov",
    title: "Campus Placement Drive 2026",
    description: "Recruiters from IT, core engineering and finance interview final-year students on campus.",
    href: "#",
    color: "#1F45D6",
  },
  {
    day: "28",
    month: "Nov",
    title: "National Science Symposium",
    description: "Research talks, poster sessions and lab tours across the College of Sciences.",
    href: "#",
    color: "#D23F12",
  },
  {
    day: "06",
    month: "Dec",
    title: "Annual Sports Meet",
    description: "Three days of athletics, cricket and kabaddi at the university grounds.",
    href: "#",
    color: "#0E8050",
  },
  {
    day: "19",
    month: "Dec",
    title: "Alumni Career Connect",
    description: "Alumni mentors share career paths and open referrals for current students.",
    href: "#",
    color: "#1F45D6",
  },
];

const squish = { duration: 1, ease: "backInOut" } as const;

function EventCard({ event }: { event: (typeof events)[number] }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <motion.div
      onClick={() => setIsActive((prev) => !prev)}
      whileHover="hover"
      whileFocus="hover"
      animate={isActive ? "hover" : "initial"}
      initial="initial"
      transition={squish}
      variants={{
        initial: { scale: 1 },
        hover: { scale: 1.05 },
      }}
      className="relative block h-80 w-full overflow-hidden rounded-xl p-7 outline-none cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-[#FFB21A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#001546]"
      style={{ backgroundColor: event.color }}
    >
      <div className="relative z-10 text-white">
        {/* Date */}
        <motion.span
          variants={{
            initial: { scale: 0.85 },
            hover: { scale: 1 },
          }}
          transition={squish}
          className="block origin-top-left font-[family-name:var(--font-heading)] leading-none"
        >
          <span className="block text-6xl font-black tracking-tight">{event.day}</span>
          <span className="mt-1 block text-sm font-bold uppercase tracking-[0.18em] text-white/80">
            {event.month} 2026
          </span>
        </motion.span>

        <h3 className="mt-8 text-xl font-bold leading-snug">{event.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/80">{event.description}</p>
      </div>

      {/* Arrow — slides in on hover / focus / click */}
      <motion.span
        variants={{
          initial: { opacity: 0, x: -10, y: 10 },
          hover: { opacity: 1, x: 0, y: 0 },
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#001546]"
        aria-hidden="true"
      >
        <ArrowUpRight className="h-5 w-5" />
      </motion.span>

      <CardBackground />
    </motion.div>
  );
}

function CardBackground() {
  return (
    <motion.svg
      viewBox="0 0 320 384"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 z-0 h-full w-full"
      variants={{
        initial: { scale: 1 },
        hover: { scale: 1.5 },
      }}
      transition={squish}
      aria-hidden="true"
    >
      <motion.circle
        variants={{
          initial: { scaleY: 1, y: 0 },
          hover: { scaleY: 0.5, y: -25 },
        }}
        transition={{ ...squish, delay: 0.2 }}
        cx="160.5"
        cy="114.5"
        r="101.5"
        fill="#001546"
        fillOpacity="0.28"
      />
      <motion.ellipse
        variants={{
          initial: { scaleY: 1, y: 0 },
          hover: { scaleY: 2.25, y: -25 },
        }}
        transition={{ ...squish, delay: 0.2 }}
        cx="160.5"
        cy="265.5"
        rx="101.5"
        ry="43.5"
        fill="#001546"
        fillOpacity="0.28"
      />
    </motion.svg>
  );
}

export default function Events() {
  return (
    <section
      id="events"
      className="bg-[#001546] py-[clamp(2.5rem,6vh,4.5rem)] border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Section Heading */}
        <div className="text-center">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#23B5E9] mb-2">
            Events
          </span>
          <h2 className="font-serif text-[clamp(1.5rem,4vw,2.75rem)] font-bold leading-tight text-white tracking-tight">
            What&apos;s happening at SVU
          </h2>
          <p className="mt-3 text-[clamp(0.85rem,1.2vw,1.1rem)] text-[#FFE9C2]/85 max-w-2xl mx-auto font-normal leading-relaxed">
            Placement drives, symposiums and campus life — the dates to keep this semester.
          </p>
        </div>

        {/* Event cards */}
        <MotionConfig reducedMotion="user">
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {events.map((event) => (
              <EventCard key={event.title} event={event} />
            ))}
          </div>
        </MotionConfig>

        <div className="mt-10 flex justify-center">
          <SquishyButton variant="sand">View all events</SquishyButton>
        </div>
      </div>
    </section>
  );
}
