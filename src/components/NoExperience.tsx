"use client";

import React from "react";
import {
  AmazonLogo,
  PwcLogo,
  BoeingLogo,
  AirbnbLogo,
  PgLogo,
  MicrosoftLogo,
} from "./Logos";
import SquishyButton from "./SquishyButton";

export default function NoExperience() {
  const employers = [
    { name: "Amazon", logo: <AmazonLogo className="w-full h-10" /> },
    { name: "PwC", logo: <PwcLogo className="w-full h-10" /> },
    { name: "Boeing", logo: <BoeingLogo className="w-full h-8" /> },
    { name: "Airbnb", logo: <AirbnbLogo className="w-full h-9" /> },
    { name: "P&G", logo: <PgLogo className="w-full h-10" /> },
    { name: "Microsoft", logo: <MicrosoftLogo className="w-full h-9" /> },
  ];

  return (
    <section className="bg-[#FFF9EE] py-[clamp(2.5rem,6vh,4.5rem)] border-t border-[#FFE9C2]/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

          {/* Left Column: Heading & Call to Action */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#D23F12] mb-2">
              Early Career
            </span>
            <h2 className="text-[clamp(1.5rem,3.6vw,2.75rem)] font-black text-[#0C1230] tracking-tight leading-[1.1] font-['Plus_Jakarta_Sans',sans-serif]">
              No experience<br />
              needed
            </h2>

            <p className="mt-3 text-[clamp(0.85rem,1.2vw,1.1rem)] text-[#5A6382] font-normal leading-relaxed max-w-md">
              Get hired without prior experience. More than 40% of jobs posted on Handshake don&apos;t require previous work history.
            </p>

            <div className="mt-5">
              <SquishyButton variant="sand">Get hired</SquishyButton>
            </div>
          </div>

          {/* Right Column: 2x3 Grid of Employer Logos */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
              {employers.map((emp, idx) => (
                <div
                  key={idx}
                  className="aspect-[4/3] max-h-[13vh] flex items-center justify-center p-4 sm:p-6 bg-white hover:bg-white rounded-xl border border-[#FFE9C2] hover:border-[#1F45D6]/40 shadow-xs hover:shadow-md transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    {emp.logo}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
