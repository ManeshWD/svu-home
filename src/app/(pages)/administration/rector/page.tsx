"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  Microscope,
  Users,
  Globe,
  TrendingUp,
  Award,
  ChevronDown,
  ChevronRight,
  Eye,
  Calendar,
  Shield,
  BookOpen,
  Building2,
  FileText,
  User,
  Leaf,
  Zap
} from "lucide-react";
import Header from "@/components/InnerHeader";
import Footer from "@/components/InnerFooter";

export default function RectorPage() {
  const [isExpanded, setIsExpanded] = useState(false);

  // Focus areas for Rector
  const focusAreas = [
    {
      title: "Global Research",
      description: "Nurturing a high-impact global research university ecosystem.",
      icon: Microscope,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      title: "Academic Programs",
      description: "Offering 99+ UG courses, several certificate courses, and 54 PG programs.",
      icon: GraduationCap,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
    },
    {
      title: "Green Campus",
      description: "Preserving and expanding our serene greenery at the foot of Tirumala Hills.",
      icon: Leaf,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      title: "Pioneering Innovations",
      description: "Driving breakthroughs in Energy, Earth sciences, health, and humanities.",
      icon: Zap,
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
    {
      title: "Student Personal Journeys",
      description: "Empowering students through research projects, creativity, and social issue resolution.",
      icon: Users,
      color: "text-purple-600 bg-purple-50 border-purple-100",
    },
    {
      title: "Alumni Impact",
      description: "Partnering with alumni to upgrade amenities and make a real difference on campus.",
      icon: Award,
      color: "text-pink-600 bg-pink-50 border-pink-100",
    },
  ];

  // Stats data for Rector page
  const stats = [
    { value: "1954", label: "Established", icon: Calendar },
    { value: "A+", label: "NAAC Grade", icon: Shield },
    { value: "4", label: "Constituent Colleges", icon: Building2 },
    { value: "191", label: "Affiliated Colleges", icon: Building2 },
    { value: "99+", label: "UG Courses", icon: BookOpen },
    { value: "54", label: "PG Courses", icon: BookOpen },
  ];

  // Explore links
  const exploreLinks = [
    { label: "About SVU", icon: Building2, href: "/#about" },
    { label: "Vision & Mission", icon: Eye, href: "/#vision" },
    { label: "Administration", icon: Users, href: "#" },
    { label: "Academic Council", icon: GraduationCap, href: "#" },
    { label: "University Rankings", icon: TrendingUp, href: "#" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#fafbfc] text-slate-800">
      <Header />

      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-gray-100 py-3.5 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-xs font-semibold text-gray-500">
          <a href="/" className="hover:text-[#faa61a] transition-colors">Home</a>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-400">Administration</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#002147] font-bold">Rector's Message</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-[#faa61a] text-xs font-extrabold uppercase tracking-widest block">
                  RECTOR'S MESSAGE
                </span>
                <h1 className="text-3xl md:text-5xl font-black text-[#002147] tracking-tight leading-tight">
                  Message from the<br />Rector
                </h1>
              </div>

              {/* Gold Quote Block */}
              <div className="border-l-4 border-[#faa61a] pl-4 py-2">
                <p className="text-lg font-bold italic text-gray-700 leading-relaxed">
                  "Empowering Students to Maximize Their Potential for Lifelong Success"
                </p>
              </div>

              {/* Profile Card */}
              <div className="inline-flex items-center space-x-4 bg-slate-50 border border-slate-100 px-5 py-3.5 rounded-2xl">
                <div className="bg-[#002147] text-white p-2.5 rounded-full shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#002147] leading-none mb-1">
                    Prof. Ch. Appa Rao
                  </h4>
                  <p className="text-xs text-gray-500 font-bold">
                    Rector, Sri Venkateswara University
                  </p>
                </div>
              </div>
            </div>

            {/* Right Image Column with Curved Mask Layout */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[400px]">
                {/* Visual back accents */}
                <div className="absolute inset-0 bg-[#faa61a]/10 rounded-3xl transform rotate-3 scale-95 z-0" />
                <div className="absolute inset-0 bg-[#002147]/5 rounded-3xl transform -rotate-3 scale-95 z-0" />
                
                {/* Main Curved Image wrapper */}
                <div className="relative z-10 w-full aspect-[4/3] sm:aspect-square bg-slate-100 rounded-3xl overflow-hidden border-2 border-white shadow-xl">
                  <img
                    src="/rector.png"
                    alt="Prof. Ch. Appa Rao, Rector"
                    className="w-full h-full object-cover object-top scale-[1.02]"
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-12 py-12 space-y-16">

        {/* Vision Block */}
        <section className="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm flex flex-col md:flex-row items-start gap-6">
          <div className="bg-[#002147] text-[#faa61a] p-4 rounded-2xl shrink-0 shadow-md">
            <Eye className="w-8 h-8" />
          </div>
          <div className="space-y-3">
            <div className="flex flex-col">
              <h2 className="text-lg md:text-xl font-black text-[#002147]">
                Rector's Vision
              </h2>
              <div className="w-10 h-0.5 bg-[#faa61a] mt-1.5" />
            </div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed font-medium">
              We aim to construct a vibrant academic ecology that bridges state-of-the-art research with value-centric 
              undergraduate and postgraduate curricula. By focusing on green infrastructure, industry-ready capabilities, 
              and interdisciplinary projects, we prepare our learners to conquer global challenges and inspire regional development.
            </p>
          </div>
        </section>

        {/* Interactive Message Section */}
        <section className="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm space-y-6">
          <div className="flex items-center space-x-3.5 pb-4 border-b border-gray-100">
            <FileText className="w-6 h-6 text-[#faa61a]" />
            <h2 className="text-lg md:text-xl font-black text-[#002147]">
              Message from the Rector
            </h2>
          </div>

          <div className="text-gray-600 text-sm md:text-base leading-relaxed font-medium space-y-6 text-justify">
            <p>
              Sri Venkateswara University established in 1954 is a pre-eminent University located in foot hills of Tirumala which is high impact, Global research University, dedicated to serve the students of Andhra Pradesh. This university empowers students to maximize the potential for life long success.
            </p>

            {isExpanded && (
              <div className="space-y-6 animate-fade-in pt-2">
                <p>
                  It is one of the 13 universities of State University system of Andhra Pradesh, Sri Venkateswara University is a home to four constituent Colleges and 191affiliated UG & PG Colleges. Offering more than 99 Bachler’s under graduate courses, several certificates courses, 54Post Graduate courses, Doctoral level degree programmes. Sri Venkateswara Universityis classified among A+ by NAAC.
                </p>
                <p>
                  The campus is known for its greenery. Based on a semester system the academic calendar is composed of two semesters every year.
                </p>
                <p>
                  Our students have a way of creating their personal journey through research projects, finding ways to creativity, address social issues or learning to navigate the college experience.
                </p>
                <p>
                  Our faculty are pioneering innovations in the areas of Energy, Earth sciences, humanities health, aging and other major areas. The impact of our alumni on the amenities in the University areunique which made a real difference on campus.
                </p>
              </div>
            )}
          </div>

          <div className="pt-4 flex justify-start">
            {!isExpanded ? (
              <button
                onClick={() => setIsExpanded(true)}
                className="bg-[#002147] hover:bg-[#001730] text-white text-xs md:text-sm font-bold px-6 py-3 rounded-xl transition-all cursor-pointer shadow flex items-center space-x-2 group"
              >
                <span>Read More</span>
                <ChevronDown className="w-4 h-4 text-[#faa61a] group-hover:translate-y-0.5 transition-transform" />
              </button>
            ) : (
              <button
                onClick={() => setIsExpanded(false)}
                className="border border-[#002147] text-[#002147] hover:bg-slate-50 text-xs md:text-sm font-bold px-6 py-3 rounded-xl transition-all cursor-pointer flex items-center space-x-2"
              >
                <span>Read Less</span>
                <ChevronDown className="w-4 h-4 text-[#faa61a] rotate-180" />
              </button>
            )}
          </div>
        </section>

        {/* Focus Areas Grid */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-black text-[#002147] relative inline-block">
              Our Key Focus Areas
              <div className="w-16 h-1 bg-[#faa61a] mx-auto mt-2 rounded-full" />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {focusAreas.map((area, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-100 hover:border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex items-start space-x-4 group"
              >
                <div className={`p-3 rounded-xl border shrink-0 ${area.color} group-hover:scale-105 transition-transform`}>
                  <area.icon className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-black text-[#002147]">{area.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    {area.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Grid */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-black text-[#002147] relative inline-block">
              Sri Venkateswara University At a Glance
              <div className="w-16 h-1 bg-[#faa61a] mx-auto mt-2 rounded-full" />
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm text-center space-y-2 flex flex-col justify-center items-center"
              >
                <div className="text-[#faa61a] mb-1.5 bg-[#faa61a]/5 p-2 rounded-full">
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="text-xl md:text-2xl font-black text-[#002147] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>



        {/* Explore More Section */}
        <section className="space-y-6 text-center">
          <h2 className="text-lg font-black text-[#002147] tracking-wider uppercase">
            Explore More
          </h2>
          <div className="w-10 h-0.5 bg-[#faa61a] mx-auto rounded-full" />
          
          <div className="flex flex-wrap justify-center gap-3.5 pt-2">
            {exploreLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="bg-white border border-gray-100 hover:border-slate-300 hover:shadow-sm px-5 py-3 rounded-xl text-xs md:text-sm font-bold text-[#002147] transition-all flex items-center space-x-2.5"
              >
                <link.icon className="w-4 h-4 text-[#faa61a]" />
                <span>{link.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              </a>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
