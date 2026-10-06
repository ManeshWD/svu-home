"use client";

import React from "react";
import Image from "next/image";
import {
  StanfordLogo,
  MichiganStateLogo,
  JohnsHopkinsLogo,
  RitLogo,
} from "./Logos";

export default function UniversityPartners() {
  return (
    <section className="bg-white py-[clamp(2.5rem,6vh,4.5rem)] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

          {/* Left Column: Campus Clocktower & Brick University Photo */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-h-[42vh] max-w-md aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 shadow-xl group lg:max-w-none">
              <Image
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=85"
                alt="University campus clock tower surrounded by trees"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg text-xs font-semibold text-gray-800 shadow-sm">
                1,400+ Partner Campuses
              </div>
            </div>
          </div>

          {/* Right Column: Copy and University Badges */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2 className="text-[clamp(1.5rem,3.6vw,2.75rem)] font-black text-black tracking-tight leading-[1.1] font-['Plus_Jakarta_Sans',sans-serif]">
              Helping 5M+<br />
              students find<br />
              jobs
            </h2>

            <p className="mt-4 text-[clamp(0.85rem,1.2vw,1.1rem)] text-gray-600 font-normal leading-relaxed max-w-lg">
              The network top colleges and universities trust to connect their students with leading employers and alumni mentors.
            </p>

            {/* University Logos row / grid */}
            <div className="mt-6 pt-5 border-t border-gray-100">
              <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-4">
                Trusted by 1,400+ leading institutions
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
                <div className="flex items-center justify-start opacity-90 hover:opacity-100 transition-opacity">
                  <StanfordLogo />
                </div>
                <div className="flex items-center justify-start opacity-90 hover:opacity-100 transition-opacity">
                  <MichiganStateLogo />
                </div>
                <div className="flex items-center justify-start opacity-90 hover:opacity-100 transition-opacity">
                  <JohnsHopkinsLogo />
                </div>
                <div className="flex items-center justify-start opacity-90 hover:opacity-100 transition-opacity">
                  <RitLogo />
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
