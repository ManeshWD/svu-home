"use client";

import React, { useState } from "react";
import {
  Search,
  Bookmark,
  Bell,
  User,
  Briefcase,
  MapPin,
  Calendar,
  CheckCircle,
  Sparkles,
} from "lucide-react";

export default function MobileAppSection() {
  const [rsvpd, setRsvpd] = useState(false);

  return (
    <section className="bg-white py-[clamp(2.5rem,6vh,4.5rem)] border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

          {/* Left Column: Headline and App Download Buttons */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h2 className="text-[clamp(1.5rem,3.6vw,2.75rem)] font-black text-black tracking-tight leading-[1.1] font-['Plus_Jakarta_Sans',sans-serif]">
              Take the job<br />
              search with you
            </h2>

            <p className="mt-4 text-[clamp(0.85rem,1.2vw,1.1rem)] text-gray-600 font-normal leading-relaxed max-w-md">
              Explore, message, and apply right from your phone. Never miss an interview invite or message from a campus recruiter.
            </p>

            {/* App Store Download Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              
              {/* Apple App Store Badge */}
              <a
                href="#app-store"
                className="flex items-center gap-3 bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 group"
              >
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.61 1.34-.55.63-1.03 1.7-0.9 2.73 1 .08 2.01-.52 2.58-1.22z" />
                </svg>
                <div className="text-left">
                  <p className="text-[10px] font-medium leading-none uppercase tracking-wider text-gray-300">
                    Download on the
                  </p>
                  <p className="text-base font-bold leading-tight font-sans">
                    App Store
                  </p>
                </div>
              </a>

              {/* Google Play Badge */}
              <a
                href="#google-play"
                className="flex items-center gap-3 bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 group"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M3.6 2.3c-.4.4-.6 1-.6 1.8v15.8c0 .8.2 1.4.6 1.8l.1.1 9.2-9.2v-.2l-9.2-9.2-.1.1zM16.5 15.6l-3.6-3.6 3.6-3.6.1.1 4.2 2.4c1.2.7 1.2 1.8 0 2.5l-4.2 2.4-.1-.2zM12.9 12l-9.2 9.2c.4.4 1 .5 1.7.1l11.1-6.4-3.6-3.6zM12.9 12l3.6-3.6L5.4 2c-.7-.4-1.3-.3-1.7.1L12.9 12z" />
                </svg>
                <div className="text-left">
                  <p className="text-[10px] font-medium leading-none uppercase tracking-wider text-gray-300">
                    GET IT ON
                  </p>
                  <p className="text-base font-bold leading-tight font-sans">
                    Google Play
                  </p>
                </div>
              </a>

            </div>
          </div>

          {/* Right Column: Realistic Smartphone Mockup */}
          <div className="lg:col-span-7 flex justify-center relative">

            {/* Ambient shadow glow */}
            <div className="absolute w-56 h-72 sm:w-72 sm:h-96 bg-gray-200/60 rounded-full filter blur-3xl -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

            {/* Smartphone Outer Shell */}
            <div className="relative w-full max-w-[240px] sm:max-w-[280px] bg-white rounded-[36px] sm:rounded-[44px] p-2.5 sm:p-3.5 shadow-2xl border-4 border-gray-200 ring-1 ring-black/5">

              {/* Phone Speaker & Dynamic notch */}
              <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 w-20 sm:w-28 h-4 sm:h-5 bg-black rounded-full z-30 flex items-center justify-center">
                <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-gray-800 ml-auto mr-3"></div>
              </div>

              {/* Phone Screen Container */}
              <div className="relative bg-[#f8f9fa] rounded-[28px] sm:rounded-[36px] overflow-hidden pt-7 sm:pt-10 pb-4 sm:pb-6 px-3 sm:px-4 border border-gray-100 flex flex-col min-h-[60vh] max-h-[72vh]">
                
                {/* Top Status Bar */}
                <div className="flex justify-between items-center text-[11px] font-semibold text-gray-500 px-2 mb-3">
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-black/70"></span>
                    <span className="w-3 h-2 border border-black/70 rounded-xs"></span>
                  </div>
                </div>

                {/* Mobile Search Header */}
                <div className="bg-white rounded-xl p-2.5 shadow-xs border border-gray-100 flex items-center gap-2 mb-4">
                  <Search className="w-4 h-4 text-gray-400 ml-1" />
                  <span className="text-xs text-gray-400 font-normal">Search jobs, employers, events...</span>
                </div>

                {/* Filter Pills */}
                <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-none text-[11px]">
                  <span className="bg-black text-white px-3 py-1 rounded-full font-medium whitespace-nowrap">
                    All Jobs
                  </span>
                  <span className="bg-white text-gray-700 border border-gray-200 px-3 py-1 rounded-full font-medium whitespace-nowrap">
                    Internships
                  </span>
                  <span className="bg-white text-gray-700 border border-gray-200 px-3 py-1 rounded-full font-medium whitespace-nowrap">
                    Remote
                  </span>
                </div>

                {/* Job Cards Stream */}
                <div className="space-y-2.5 flex-1">
                  
                  {/* Job 1: Red logo */}
                  <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs hover:border-gray-200 transition">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-red-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        EY
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-gray-900 truncate">
                          Business &amp; Tech Intern 2025
                        </h4>
                        <p className="text-[11px] text-gray-500">Ernst &amp; Young</p>
                        <div className="flex items-center gap-2 mt-1.5 text-[10px] text-gray-400">
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-2.5 h-2.5" /> New York, NY
                          </span>
                          <span>•</span>
                          <span className="text-emerald-600 font-medium">$42/hr</span>
                        </div>
                      </div>
                      <Bookmark className="w-4 h-4 text-gray-300 hover:text-black shrink-0" />
                    </div>
                  </div>

                  {/* Job 2: Yellow logo */}
                  <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs hover:border-gray-200 transition">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        amz
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-gray-900 truncate">
                          Software Dev Engineer Intern
                        </h4>
                        <p className="text-[11px] text-gray-500">Amazon</p>
                        <div className="flex items-center gap-2 mt-1.5 text-[10px] text-gray-400">
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-2.5 h-2.5" /> Seattle, WA
                          </span>
                          <span>•</span>
                          <span className="text-emerald-600 font-medium">$56/hr</span>
                        </div>
                      </div>
                      <Bookmark className="w-4 h-4 text-gray-300 hover:text-black shrink-0" />
                    </div>
                  </div>

                  {/* Job 3: Blue logo */}
                  <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs hover:border-gray-200 transition">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        MS
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-gray-900 truncate">
                          Product Design Fellow
                        </h4>
                        <p className="text-[11px] text-gray-500">Microsoft</p>
                        <div className="flex items-center gap-2 mt-1.5 text-[10px] text-gray-400">
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-2.5 h-2.5" /> Redmond, WA
                          </span>
                          <span>•</span>
                          <span className="text-emerald-600 font-medium">Full-time</span>
                        </div>
                      </div>
                      <Bookmark className="w-4 h-4 text-gray-300 hover:text-black shrink-0" />
                    </div>
                  </div>

                </div>

                {/* Floating RSVP Card Overlay as seen in reference image */}
                <div className="relative mt-2 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-gray-200 shadow-xl z-20">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-block bg-red-100 text-[#eb1933] text-[9px] font-bold px-2 py-0.5 rounded-full mb-1">
                        Upcoming Event
                      </span>
                      <p className="text-xs font-bold text-gray-900 leading-tight">
                        Virtual Career Coffee Chat
                      </p>
                      <p className="text-[10px] text-gray-500 mt-0.5 flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5 text-gray-400" /> Tomorrow • 2:00 PM EST
                      </p>
                    </div>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[10px] text-gray-500">Free • 120 students going</span>
                    <button
                      onClick={() => setRsvpd(!rsvpd)}
                      className={`text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all ${
                        rsvpd
                          ? "bg-emerald-600 text-white"
                          : "bg-black hover:bg-gray-800 text-white"
                      }`}
                    >
                      {rsvpd ? "RSVP'd ✓" : "RSVP Now"}
                    </button>
                  </div>
                </div>

                {/* Bottom Navigation Bar inside phone */}
                <div className="pt-3 border-t border-gray-200 mt-3 flex justify-around items-center text-gray-400 text-[10px]">
                  <div className="flex flex-col items-center text-black font-semibold">
                    <Briefcase className="w-4 h-4" />
                    <span className="text-[9px] mt-0.5">Jobs</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Calendar className="w-4 h-4" />
                    <span className="text-[9px] mt-0.5">Events</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Bell className="w-4 h-4" />
                    <span className="text-[9px] mt-0.5">Alerts</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <User className="w-4 h-4" />
                    <span className="text-[9px] mt-0.5">Profile</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
