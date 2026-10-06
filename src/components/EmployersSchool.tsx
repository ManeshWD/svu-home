"use client";

import React from "react";
import SquishyButton from "./SquishyButton";

const benefits = [
  {
    title: "Find full-time jobs and internships that are right for you.",
    subtitle:
      "Filter opportunities by major, location, compensation, and work authorization.",
    shape: "orbit" as const,
  },
  {
    title: "Get personal job recommendations based on your major.",
    subtitle:
      "Our smart matching connects your coursework with recruiter needs.",
    shape: "wave" as const,
  },
  {
    title: "Explore careers based on your experience and interests.",
    subtitle:
      "Discover new fields, connect with alumni, and attend virtual career fairs.",
    shape: "marks" as const,
  },
];

function OrbitShape() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
      <circle
        cx="60"
        cy="60"
        r="46"
        stroke="#D23F12"
        strokeOpacity="0.55"
        strokeWidth="1"
        className="es-spin-slow"
        style={{ transformOrigin: "60px 60px" }}
      />
      <circle
        cx="60"
        cy="60"
        r="46"
        stroke="#23B5E9"
        strokeOpacity="0.9"
        strokeWidth="1.5"
        strokeDasharray="4 10"
        className="es-spin"
        style={{ transformOrigin: "60px 60px" }}
      />
      <circle cx="60" cy="60" r="14" fill="#FFB21A" className="es-pulse" />
    </svg>
  );
}

function WaveShape() {
  const paths = [0, 1, 2, 3].map((i) => (
    <path
      key={i}
      d="M0 14 Q 15 0, 30 14 T 60 14"
      stroke="#23B5E9"
      strokeOpacity={0.9 - i * 0.18}
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      transform={`translate(${i * 22} 0)`}
      className="es-arrow"
      style={{ animationDelay: `${i * 0.18}s` }}
    />
  ));
  return (
    <svg viewBox="0 0 120 28" className="w-full h-auto" fill="none">
      {paths}
    </svg>
  );
}

function MarksShape() {
  return (
    <svg viewBox="0 0 120 40" className="w-full h-auto" fill="none">
      <g className="es-mark" style={{ animationDelay: "0s" }}>
        <line x1="8" y1="12" x2="8" y2="28" stroke="#FFB21A" strokeWidth="2" strokeLinecap="round" />
        <line x1="0" y1="20" x2="16" y2="20" stroke="#FFB21A" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g className="es-mark" style={{ animationDelay: "0.15s" }}>
        <line x1="44" y1="12" x2="60" y2="28" stroke="#D23F12" strokeWidth="2" strokeLinecap="round" />
        <line x1="60" y1="12" x2="44" y2="28" stroke="#D23F12" strokeWidth="2" strokeLinecap="round" />
      </g>
      <circle cx="100" cy="20" r="8" stroke="#0E8050" strokeWidth="2" className="es-mark" style={{ animationDelay: "0.3s" }} />
    </svg>
  );
}

const shapeMap = {
  orbit: OrbitShape,
  wave: WaveShape,
  marks: MarksShape,
};

export default function EmployersSchool() {
  return (
    <section className="bg-[#001546] py-[clamp(2.5rem,6vh,4.5rem)] border-t border-white/10">
      <style>{`
        @keyframes es-spin { to { transform: rotate(360deg); } }
        @keyframes es-spin-slow { to { transform: rotate(-360deg); } }
        @keyframes es-pulse { 0%, 100% { transform: scale(1); opacity: 0.9; } 50% { transform: scale(1.25); opacity: 0.5; } }
        @keyframes es-arrow { 0%, 100% { transform: translateY(0); opacity: 0.4; } 50% { transform: translateY(-4px); opacity: 1; } }
        @keyframes es-mark { 0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.85; } 50% { transform: scale(1.15) rotate(8deg); opacity: 1; } }
        .es-spin { animation: es-spin 10s linear infinite; }
        .es-spin-slow { animation: es-spin-slow 16s linear infinite; }
        .es-pulse { animation: es-pulse 2.4s ease-in-out infinite; transform-origin: 60px 60px; }
        .es-arrow { animation: es-arrow 1.6s ease-in-out infinite; }
        .es-mark { animation: es-mark 3s ease-in-out infinite; transform-origin: center; }
      `}</style>

      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Section Heading */}
        <div className="text-center">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#23B5E9] mb-2">
            Career Opportunities
          </span>
          <h2 className="text-[clamp(1.5rem,4vw,2.75rem)] font-black text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
            Employers are hiring at your school
          </h2>
          <p className="mt-3 text-[clamp(0.85rem,1.2vw,1.1rem)] text-[#FFE9C2]/85 max-w-2xl mx-auto font-normal leading-relaxed">
            Receive 500,000+ jobs and internships from top employers, right at your fingertips.
          </p>
        </div>

        {/* Card Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {benefits.map((benefit, index) => {
            const Shape = shapeMap[benefit.shape];
            return (
              <div
                key={index}
                className="group relative flex flex-col justify-between rounded-2xl bg-[#041B55] border border-white/10 p-6 min-h-[260px] overflow-hidden transition-colors duration-300 hover:border-[#FFB21A]/60 shadow-lg"
              >
                <div>
                  <p className="text-[0.95rem] font-semibold text-white leading-snug">
                    {benefit.title}
                  </p>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">
                    {benefit.subtitle}
                  </p>
                </div>
                <div className="mt-8 h-20 flex items-end">
                  <div className="w-20">
                    <Shape />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Button (Main Button in Saffron Gold with Navy text) */}
        <div className="mt-10 flex justify-center">
          <SquishyButton variant="sand">Search jobs</SquishyButton>
        </div>
      </div>
    </section>
  );
}
