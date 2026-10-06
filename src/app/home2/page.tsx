import React from "react";
import Header from "@/components/home2/Header";
import Footer from "@/components/home2/Footer";
import Footer1 from "@/components/ui/footer-1";
import HeritageGlow from "@/components/home2/HeritageGlow";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, BookOpen, GraduationCap, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sri Venkateswara University | Home 2",
  description: "Excellence in Higher Education, Research, and Innovation - Sri Venkateswara University, Tirupati.",
};

export default function Home2Page() {
  return (
    <div className="relative min-h-screen bg-[#F3F0E6] text-[#040323] selection:bg-[#6366F1] selection:text-white">
      {/* =======================================================
          SCROLLABLE CONTENT CONTAINER (sits in front with z-10)
          When scrolling, this lifts away to reveal the sticky footer behind!
          ======================================================= */}
      <div className="relative z-10 bg-[#F3F0E6] shadow-[0_30px_60px_-15px_rgba(4,3,35,0.18)] border-b border-[#040323]/10">
        {/* Header with SVU Logo and Drop-animation Menu Overlay */}
        <Header />

        {/* Hero Section */}
        <main className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20 pt-16 pb-24 sm:pt-24 sm:pb-32">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white border border-[#040323]/10 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#040323] shadow-xs">
              <span>NAAC &apos;A+&apos; Accredited State University</span>
            </div>
          </div>

          {/* Hero Headline */}
          <div className="text-center max-w-4xl mx-auto mb-10">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-black tracking-tight text-[#040323] font-heading leading-[1.05] mb-6">
              Shaping Minds, <br className="hidden sm:inline" />
              Inspiring Generations.
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-[#040323]/75 font-medium leading-relaxed max-w-2xl mx-auto">
              Established in 1954 in the sacred temple city of Tirupati, Sri Venkateswara University is a premier institution fostering research, innovation, and global leadership.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
            <Link
              href="#admissions"
              className="bg-[#040323] hover:bg-[#0D0A48] text-white font-semibold text-base px-8 py-4 rounded-full shadow-sm flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Explore Admissions 2026</span>
              <ArrowRight className="w-4 h-4 text-[#818CF8]" />
            </Link>
            <Link
              href="#colleges"
              className="bg-white hover:bg-white/90 text-[#040323] font-semibold text-base px-8 py-4 rounded-full shadow-xs border border-[#040323]/10 flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>View Constituent Colleges</span>
            </Link>
          </div>

          {/* University Key Highlights Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-[#040323]/15">
            {[
              { stat: "70+", label: "Years of Heritage", sub: "Founded in 1954", icon: Award },
              { stat: "1,000+", label: "Campus Acres", sub: "Foot of Tirumala Hills", icon: BookOpen },
              { stat: "54+", label: "Academic Departments", sub: "Arts, Sciences, Tech", icon: GraduationCap },
              { stat: "25,000+", label: "Alumni Worldwide", sub: "Leaders in Every Sphere", icon: Users },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/70 border border-[#040323]/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#040323] mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-[#040323] font-heading mb-1">
                    {item.stat}
                  </div>
                  <div className="text-sm sm:text-base font-bold text-[#040323] mb-0.5">
                    {item.label}
                  </div>
                  <div className="text-xs text-[#4F46E5] font-semibold">
                    {item.sub}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Section 2: Colleges Preview */}
          <div id="colleges" className="mt-24 sm:mt-32">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs font-black tracking-[0.2em] text-[#4F46E5] uppercase">
                  Academic Units
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-[#040323] font-heading mt-2">
                  Constituent Colleges
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#040323]/70 max-w-md">
                Interdisciplinary centers of higher learning offering state-of-the-art laboratory infrastructure and research guidance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "SVU College of Arts",
                  desc: "Humanities, languages, social sciences, and cultural studies fostering critical inquiry.",
                  badge: "Estd. 1954",
                },
                {
                  name: "SVU College of Sciences",
                  desc: "Physics, chemistry, biotechnology, mathematics, and botanical research labs.",
                  badge: "Estd. 1954",
                },
                {
                  name: "SVU College of Engineering",
                  desc: "Computing, electronics, civil, mechanical, and electrical engineering excellence.",
                  badge: "Estd. 1959",
                },
              ].map((col, idx) => (
                <div
                  key={idx}
                  className="bg-white/80 border border-[#040323]/12 rounded-3xl p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group"
                >
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-[#EEF2FF] text-[#040323] text-xs font-bold mb-4">
                      {col.badge}
                    </span>
                    <h3 className="text-2xl font-bold text-[#040323] mb-3 group-hover:text-[#4338CA] transition-colors">
                      {col.name}
                    </h3>
                    <p className="text-sm text-[#040323]/70 leading-relaxed">
                      {col.desc}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-[#040323]/10 flex items-center justify-between text-sm font-bold text-[#040323]">
                    <span>Explore Departments</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Campus Heritage Banner */}
          <div className="mt-24 sm:mt-32 rounded-3xl bg-[#040323] text-white p-8 sm:p-14 lg:p-20 relative overflow-hidden">
            {/* Drifting gradient glow that also follows the cursor */}
            <HeritageGlow />

            <div className="relative z-10 max-w-2xl">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#A5B4FC]">
                Excellence Since 1954
              </span>
              <h2 className="text-3xl sm:text-5xl font-black font-heading mt-3 mb-5 leading-tight">
                Empowering the future with timeless values
              </h2>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-8">
                Join a community of over 50,000 scholars, innovators, and thinkers driving real-world impact across India and the globe.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#admissions"
                  className="bg-[#818CF8] hover:bg-[#6366F1] text-[#040323] hover:text-white font-bold text-sm px-7 py-3.5 rounded-full transition-colors"
                >
                  Apply for Admission
                </Link>
                <Link
                  href="#contact"
                  className="border border-white/25 hover:bg-white/10 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-colors"
                >
                  Contact University
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* =======================================================
          REACT BITS PRO FOOTER 1 BLOCK
          Four-column layout with branding, outlined cards & watermark
          ======================================================= */}
      <Footer1 />
    </div>
  );
}
