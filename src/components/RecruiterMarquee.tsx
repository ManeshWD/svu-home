"use client";

import React from "react";

// Official TATA Logo (Outlined SVG)
function TataLogo() {
  return (
    <div className="flex items-center gap-2 select-none group-hover:scale-105 transition-transform duration-300">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-7 w-7">
        <path d="M9.774 11.568c.193-1.322.168-2.013-1.768-1.906-2.223.124-4.476.265-7.849 1.027A5.63 5.63 0 0 0 0 12c0 1.52.618 2.99 1.787 4.254 1.06 1.144 2.556 2.095 4.326 2.752a15.48 15.48 0 0 0 2.014.588c.13-.527.959-3.907 1.616-7.823l.03-.202m14.07-.88c-3.372-.762-5.624-.902-7.846-1.026-1.937-.107-1.962.584-1.768 1.906l.046.298c.65 3.848 1.458 7.16 1.598 7.72C20.595 18.508 24 15.516 24 12c0-.443-.054-.88-.157-1.311m-.491-1.324a7.163 7.163 0 0 0-1.14-1.618c-1.06-1.144-2.555-2.095-4.325-2.752-1.784-.662-3.82-1.011-5.887-1.011-2.068 0-4.103.35-5.887 1.01-1.77.658-3.266 1.61-4.326 2.753A7.17 7.17 0 0 0 .648 9.366c2.304-.557 6.245-1.293 9.904-1.37.353-.008.596.105.756.307.196.248.18 1.128.175 1.522l-.104 10.18a18.507 18.507 0 0 0 1.244 0l-.104-10.18c-.005-.394-.02-1.274.175-1.522.16-.202.403-.315.756-.308 3.658.078 7.597.813 9.902 1.37z" />
      </svg>
      <svg width="68" height="26" viewBox="0 0 68 26" fill="none" className="h-6 w-auto">
        <text
          x="2"
          y="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="20"
          letterSpacing="0.22em"
        >
          TATA
        </text>
      </svg>
    </div>
  );
}

// Official Accenture Logo (Outlined SVG)
function AccentureLogo() {
  return (
    <div className="flex items-center select-none group-hover:scale-105 transition-transform duration-300">
      <svg width="155" height="30" viewBox="0 0 155 30" fill="none" className="h-7 w-auto">
        <text
          x="2"
          y="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="22"
          letterSpacing="-0.02em"
        >
          accenture
        </text>
        <path
          d="m123 15 8-3.5-8-3.5v-4l14 5.5v4l-14 5.5z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// Official Infosys Logo (Outlined SVG)
function InfosysLogo() {
  return (
    <div className="flex items-center select-none group-hover:scale-105 transition-transform duration-300">
      <svg width="105" height="28" viewBox="0 0 105 28" fill="none" className="h-7 w-auto">
        <text
          x="2"
          y="21"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          fontFamily="Georgia, serif"
          fontWeight="700"
          fontStyle="italic"
          fontSize="23"
          letterSpacing="-0.01em"
        >
          Infosys
        </text>
      </svg>
    </div>
  );
}

// Official Wipro Logo (Outlined SVG)
function WiproLogo() {
  return (
    <div className="flex items-center select-none group-hover:scale-105 transition-transform duration-300">
      <svg width="118" height="28" viewBox="0 0 118 28" fill="none" className="h-7 w-auto">
        <text
          x="2"
          y="21"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="22"
          letterSpacing="-0.03em"
        >
          wipro
        </text>
        <circle cx="82" cy="15" r="3" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="94" cy="15" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="107" cy="15" r="3" fill="none" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    </div>
  );
}

// Official Cognizant Logo (Outlined SVG)
function CognizantLogo() {
  return (
    <div className="flex items-center select-none group-hover:scale-105 transition-transform duration-300">
      <svg width="135" height="28" viewBox="0 0 135 28" fill="none" className="h-7 w-auto">
        <text
          x="2"
          y="21"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="700"
          fontSize="22"
          letterSpacing="-0.01em"
        >
          Cognizant
        </text>
      </svg>
    </div>
  );
}

// Official Cisco Logo (Outlined SVG)
function CiscoLogo() {
  return (
    <div className="flex items-center select-none group-hover:scale-105 transition-transform duration-300">
      <svg width="115" height="28" viewBox="0 0 115 28" fill="none" className="h-7 w-auto">
        <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <line x1="4" y1="12" x2="4" y2="20" />
          <line x1="9" y1="8" x2="9" y2="20" />
          <line x1="14" y1="5" x2="14" y2="20" />
          <line x1="19" y1="8" x2="19" y2="20" />
          <line x1="24" y1="12" x2="24" y2="20" />
        </g>
        <text
          x="34"
          y="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="19"
          letterSpacing="0.12em"
        >
          CISCO
        </text>
      </svg>
    </div>
  );
}

// Official Dell Logo (Outlined SVG)
function DellLogo() {
  return (
    <div className="flex items-center select-none group-hover:scale-105 transition-transform duration-300">
      <svg width="85" height="28" viewBox="0 0 85 28" fill="none" className="h-7 w-auto">
        <text
          x="2"
          y="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="24"
        >
          D
        </text>
        <text
          x="22"
          y="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="24"
          transform="rotate(-26 30 14)"
        >
          E
        </text>
        <text
          x="38"
          y="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="24"
        >
          LL
        </text>
      </svg>
    </div>
  );
}

// Official Deloitte Logo (Outlined SVG)
function DeloitteLogo() {
  return (
    <div className="flex items-center select-none group-hover:scale-105 transition-transform duration-300">
      <svg width="120" height="28" viewBox="0 0 120 28" fill="none" className="h-7 w-auto">
        <text
          x="2"
          y="21"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="700"
          fontSize="22"
          letterSpacing="-0.02em"
        >
          Deloitte
        </text>
        <circle cx="95" cy="20" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

// Official Oracle Logo (Outlined SVG)
function OracleLogo() {
  return (
    <div className="flex items-center select-none group-hover:scale-105 transition-transform duration-300">
      <svg width="125" height="28" viewBox="0 0 125 28" fill="none" className="h-7 w-auto">
        <rect x="2" y="4" width="26" height="19" rx="9.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <rect x="7" y="8" width="16" height="11" rx="5.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <text
          x="36"
          y="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="18"
          letterSpacing="0.1em"
        >
          ORACLE
        </text>
      </svg>
    </div>
  );
}

// Official HCLTech Logo (Outlined SVG)
function HclLogo() {
  return (
    <div className="flex items-center select-none group-hover:scale-105 transition-transform duration-300">
      <svg width="125" height="28" viewBox="0 0 125 28" fill="none" className="h-7 w-auto">
        <text
          x="2"
          y="21"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.35"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="22"
          letterSpacing="-0.01em"
        >
          HCLTech
        </text>
      </svg>
    </div>
  );
}

// Official Intel Logo (Outlined SVG)
function IntelLogo() {
  return (
    <div className="flex items-center select-none group-hover:scale-105 transition-transform duration-300">
      <svg width="78" height="28" viewBox="0 0 78 28" fill="none" className="h-7 w-auto">
        <text
          x="2"
          y="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.35"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="24"
          letterSpacing="-0.03em"
        >
          intel
        </text>
      </svg>
    </div>
  );
}

const recruiters = [
  { name: "TATA", component: <TataLogo /> },
  { name: "Accenture", component: <AccentureLogo /> },
  { name: "Infosys", component: <InfosysLogo /> },
  { name: "Wipro", component: <WiproLogo /> },
  { name: "Cognizant", component: <CognizantLogo /> },
  { name: "Deloitte", component: <DeloitteLogo /> },
  { name: "Cisco", component: <CiscoLogo /> },
  { name: "Dell", component: <DellLogo /> },
  { name: "HCLTech", component: <HclLogo /> },
  { name: "Oracle", component: <OracleLogo /> },
  { name: "Intel", component: <IntelLogo /> },
];

export default function RecruiterMarquee() {
  return (
    <section className="relative w-full bg-[#001546] text-[#FFE9C2] py-5 sm:py-8 border-y border-white/10 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 mb-4 sm:mb-6 text-center">
        {/* Top Header matching reference layout in theme colors */}
        <p className="text-[11px] sm:text-xs font-bold tracking-[0.25em] text-[#FFB21A] uppercase">
          FEATURED RECRUITERS &bull; SVU PLACEMENT PARTNERS
        </p>
      </div>

      {/* Infinite Seamless Marquee Container with Theme Colors & Outlines */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center text-[#FFE9C2]">
          {/* First loop of actual official outline logos */}
          <div className="flex items-center space-x-14 sm:space-x-20 px-8">
            {recruiters.map((item, index) => (
              <div
                key={`recruiter-1-${index}`}
                className="group flex items-center justify-center opacity-85 hover:opacity-100 text-[#FFE9C2] hover:text-[#FFB21A] transition-all duration-300 cursor-pointer"
                title={item.name}
              >
                {item.component}
              </div>
            ))}
          </div>

          {/* Second duplicate loop for seamless continuous scrolling */}
          <div className="flex items-center space-x-14 sm:space-x-20 px-8" aria-hidden="true">
            {recruiters.map((item, index) => (
              <div
                key={`recruiter-2-${index}`}
                className="group flex items-center justify-center opacity-85 hover:opacity-100 text-[#FFE9C2] hover:text-[#FFB21A] transition-all duration-300 cursor-pointer"
                title={item.name}
              >
                {item.component}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
