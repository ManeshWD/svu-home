"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Mail,
  Phone,
  MapPin,
  FileText,
  GraduationCap,
  Atom,
  Cpu,
  Layers,
  Zap,
  Building2,
  BookOpen,
  Users,
  Award,
  BookMarked,
  Briefcase,
  ChevronRight
} from "lucide-react";
import Header from "@/components/InnerHeader";
import Footer from "@/components/InnerFooter";

// Faculty single page data
const facultyProfile = {
  name: "Prof. A. R. Kumar",
  role: "Professor",
  department: "DEPARTMENT OF PHYSICS",
  college: "SVU COLLEGE OF SCIENCES",
  email: "ar.kumar@svuniversity.edu.in",
  phone: "+91 - (0877) 2247777 (Ext. 1234)",
  address: "Room No. 305, Department of Physics\nSVU, Tirupati - 517 502, Andhra Pradesh, India",
  image: "/faculty/prof-a-r-kumar.jpg",
  quote: "Science is a way of thinking that builds a better tomorrow.",

  about:
    "Prof. A. R. Kumar is a Professor in the Department of Physics at Sri Venkateswara University. His academic and research interests span condensed matter physics, nanomaterials and computational physics. He has contributed to several national and international journals and has guided many research scholars. Prof. Kumar is committed to fostering a vibrant learning environment and advancing research that addresses real-world challenges.",

  researchInterests: [
    { title: "Condensed Matter Physics", icon: Atom },
    { title: "Nanomaterials", icon: Layers },
    { title: "Computational Physics", icon: Cpu },
    { title: "Materials for Energy Applications", icon: Zap }
  ],

  education: [
    {
      degree: "Ph.D. in Physics",
      institution: "Indian Institute of Science, Bengaluru"
    },
    {
      degree: "M.Sc. in Physics",
      institution: "Sri Venkateswara University, Tirupati"
    },
    {
      degree: "B.Sc. in Physics",
      institution: "Sri Venkateswara University, Tirupati"
    }
  ],

  publications: [
    {
      title: "Electronic Structure and Magnetic Properties of Transition-Metal Doped 2D Nanomaterials",
      journal: "Physical Review B (2024)"
    },
    {
      title: "First-Principles Computational Analysis of High-Entropy Perovskite Oxides for Solar Cells",
      journal: "Applied Physics Letters (2023)"
    },
    {
      title: "Synthesis and Photoluminescence Studies of Rare-Earth Activated Phosphate Phosphors",
      journal: "Journal of Luminescence (2022)"
    }
  ],

  teaching: [
    { code: "PHY-101", title: "Classical Mechanics & Quantum Foundations", level: "Postgraduate" },
    { code: "PHY-304", title: "Condensed Matter Physics & Nanostructures", level: "Postgraduate / Ph.D." },
    { code: "PHY-502", title: "Computational Physics & Molecular Dynamics", level: "Ph.D. Elective" }
  ],

  awards: [
    { title: "State Best Teacher Award", year: "2021", body: "Government of Andhra Pradesh" },
    { title: "INSA Visiting Fellowship", year: "2018", body: "Indian National Science Academy" },
    { title: "Young Scientist Research Medal", year: "2012", body: "Department of Science and Technology" }
  ]
};

export default function FacultyProfilePage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = [
    "Overview",
    "Research & Publications",
    "Teaching",
    "Awards & Recognition",
    "Professional Activities",
    "Contact"
  ];

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-slate-800 font-sans flex flex-col selection:bg-[#8c6d3b]/20 selection:text-[#002147]">
      <Header />

      {/* Hero Banner Section (matching other pages) */}
      <section
        className="relative w-full h-[320px] md:h-[380px] flex items-center text-white bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/college of science.jpg')" }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent z-10" />

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300 mb-4 tracking-wide">
            <a href="/" className="hover:text-[#faa61a] transition-colors">Home</a>
            <ChevronRight className="w-3.5 h-3.5 text-[#faa61a]" />
            <a href="/colleges/faculty" className="hover:text-[#faa61a] text-slate-300 transition-colors">Faculty</a>
            <ChevronRight className="w-3.5 h-3.5 text-[#faa61a]" />
            <span className="text-[#faa61a] font-bold">{facultyProfile.name}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-3 text-balance">
            {facultyProfile.name}
          </h1>
          <div className="w-16 h-1 bg-[#faa61a] my-2 rounded-full" />
          <p className="text-white/85 text-xs md:text-sm max-w-2xl leading-relaxed mt-1">
            {facultyProfile.role} &bull; {facultyProfile.department}, {facultyProfile.college}
          </p>
        </div>
      </section>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20 relative z-20">
        
        {/* Main Profile Card */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200/80 p-6 sm:p-8 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Portrait with Offset Beige Backdrop + Quote beneath */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start">
              {/* Photo with offset beige block */}
              <div className="relative mb-5 self-center sm:self-start">
                {/* Decorative beige background square offset to left and bottom */}
                <div className="absolute -bottom-2 -left-2 w-full h-full bg-[#f3ede1] rounded-lg -z-0" />
                
                <div className="w-48 h-56 sm:w-52 sm:h-60 rounded-lg overflow-hidden bg-slate-100 shadow-sm relative z-10 border border-slate-200">
                  <img
                    src={facultyProfile.image}
                    alt={facultyProfile.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Quote beneath photo */}
              <div className="w-full max-w-xs pl-3 border-l-2 border-[#8c6d3b]/40 py-1">
                <span className="text-2xl font-serif text-[#8c6d3b] leading-none block -mb-1">“</span>
                <p className="text-xs italic text-slate-600 font-serif leading-relaxed">
                  {facultyProfile.quote}
                </p>
                <div className="w-6 h-[2px] bg-[#8c6d3b] mt-2" />
              </div>
            </div>

            {/* Middle Column: Details (Department, Name, Title, Contact) */}
            <div className="lg:col-span-5 flex flex-col justify-center pt-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                {facultyProfile.department}
              </p>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                {facultyProfile.college}
              </p>

              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#002147] tracking-tight mt-2.5">
                {facultyProfile.name}
              </h1>

              <p className="text-base text-slate-700 font-medium mt-1">
                {facultyProfile.role}
              </p>

              {/* Contact rows */}
              <div className="mt-5 space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#8c6d3b] shrink-0" />
                  <span className="font-medium text-slate-700">{facultyProfile.email}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#8c6d3b] shrink-0" />
                  <span>{facultyProfile.phone}</span>
                </div>

                <div className="flex items-start gap-3 pt-0.5">
                  <MapPin className="w-4 h-4 text-[#8c6d3b] shrink-0 mt-0.5" />
                  <span className="leading-relaxed whitespace-pre-line text-slate-600">
                    {facultyProfile.address}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Circular beige action icons */}
            <div className="lg:col-span-3 flex flex-col gap-3 pt-2 justify-center lg:pl-4">
              {[
                { label: "Download CV", icon: FileText },
                { label: "Google Scholar", icon: GraduationCap },
                { label: "ORCID", icon: BookMarked },
                { label: "ResearchGate", icon: Users }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    type="button"
                    className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-slate-50 transition-colors group text-left cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#f6f2ea] text-[#8c6d3b] flex items-center justify-center shrink-0 group-hover:bg-[#8c6d3b] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 group-hover:text-[#8c6d3b] transition-colors">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>
        </div>

        {/* Tab Navigation Strip */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs mb-8">
          <div className="flex overflow-x-auto custom-scrollbar">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-xs sm:text-[13px] font-medium transition-all whitespace-nowrap cursor-pointer relative ${
                    isActive
                      ? "bg-[#0a192f] text-white font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <span>{tab}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#8c6d3b]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "Overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Main Column: About, Research Interests, Education */}
            <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              
              {/* About */}
              <div>
                <h2 className="text-xl font-serif font-bold text-[#002147]">About</h2>
                <div className="w-8 h-[2px] bg-[#8c6d3b] mt-1 mb-4" />
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {facultyProfile.about}
                </p>
              </div>

              {/* Research Interests */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <h2 className="text-xl font-serif font-bold text-[#002147]">Research Interests</h2>
                <div className="w-8 h-[2px] bg-[#8c6d3b] mt-1 mb-6" />

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  {facultyProfile.researchInterests.map((interest, idx) => {
                    const Icon = interest.icon;
                    return (
                      <div key={idx} className="flex flex-col items-center p-3 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="w-12 h-12 rounded-full border border-[#8c6d3b]/30 bg-[#fdfbf8] text-[#8c6d3b] flex items-center justify-center mb-2.5 shadow-2xs">
                          <Icon className="w-5 h-5 stroke-[1.75]" />
                        </div>
                        <span className="text-xs font-semibold text-slate-700 leading-snug">
                          {interest.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Education */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <h2 className="text-xl font-serif font-bold text-[#002147]">Education</h2>
                <div className="w-8 h-[2px] bg-[#8c6d3b] mt-1 mb-6" />

                {/* Vertical Timeline */}
                <div className="space-y-6 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-[#8c6d3b]/30">
                  {facultyProfile.education.map((edu, idx) => (
                    <div key={idx} className="relative">
                      {/* Node dot */}
                      <span className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-[#8c6d3b] ring-4 ring-white" />
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                          {edu.degree}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {edu.institution}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Sidebar Column: At a Glance + Quotation Banner */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* At a Glance Box */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                <h3 className="text-base font-serif font-bold text-[#002147] mb-4">
                  At a Glance
                </h3>

                <div className="space-y-4 text-xs text-slate-700">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Department</div>
                      <div className="font-semibold text-slate-800">Physics</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-slate-400 shrink-0" />
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">College</div>
                      <div className="font-semibold text-slate-800">SVU College of Sciences</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-slate-400 shrink-0" />
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Designation</div>
                      <div className="font-semibold text-slate-800">Professor</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Location</div>
                      <div className="font-semibold text-slate-800">Tirupati, Andhra Pradesh, India</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inspiration Quote Banner Card with Campus Heritage Photo */}
              <div className="relative rounded-xl overflow-hidden shadow-xs border border-slate-200 min-h-[160px] flex flex-col justify-end p-5 text-slate-900">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/faculty/campus-heritage.jpg')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/60" />
                
                <div className="relative z-10">
                  <p className="font-serif italic text-base sm:text-lg text-slate-800 leading-snug">
                    “Advancing knowledge for a better society.”
                  </p>
                  <div className="w-8 h-[2px] bg-[#8c6d3b] mt-2.5" />
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Research & Publications Tab */}
        {activeTab === "Research & Publications" && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl font-serif font-bold text-[#002147]">Research & Publications</h2>
            <div className="w-8 h-[2px] bg-[#8c6d3b] mt-1 mb-6" />

            <div className="space-y-4">
              {facultyProfile.publications.map((pub, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                  <h4 className="text-sm font-semibold text-slate-900 leading-snug">
                    {pub.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {pub.journal}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Teaching Tab */}
        {activeTab === "Teaching" && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl font-serif font-bold text-[#002147]">Teaching & Courses</h2>
            <div className="w-8 h-[2px] bg-[#8c6d3b] mt-1 mb-6" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {facultyProfile.teaching.map((t, idx) => (
                <div key={idx} className="p-4 rounded-lg border border-slate-200 bg-slate-50/50">
                  <span className="text-[11px] font-bold text-[#8c6d3b]">{t.code}</span>
                  <h4 className="text-sm font-semibold text-slate-900 mt-1">{t.title}</h4>
                  <span className="text-[11px] text-slate-400 mt-1 block">{t.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Awards & Recognition Tab */}
        {activeTab === "Awards & Recognition" && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl font-serif font-bold text-[#002147]">Awards & Recognition</h2>
            <div className="w-8 h-[2px] bg-[#8c6d3b] mt-1 mb-6" />

            <div className="space-y-4">
              {facultyProfile.awards.map((award, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-[#f6f2ea] text-[#8c6d3b] flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">{award.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{award.body} &bull; {award.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Professional Activities Tab */}
        {activeTab === "Professional Activities" && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl font-serif font-bold text-[#002147]">Professional Activities</h2>
            <div className="w-8 h-[2px] bg-[#8c6d3b] mt-1 mb-6" />

            <ul className="space-y-3 text-xs sm:text-sm text-slate-600 list-disc pl-5">
              <li>Member, Academic Senate, Sri Venkateswara University</li>
              <li>Reviewer for Physical Review Letters and Applied Physics Letters</li>
              <li>Life Member, Indian Physics Association (IPA)</li>
              <li>Convener, National Conference on Condensed Matter Physics (2023)</li>
            </ul>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === "Contact" && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl font-serif font-bold text-[#002147]">Contact Information</h2>
            <div className="w-8 h-[2px] bg-[#8c6d3b] mt-1 mb-6" />

            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <p><strong>Office:</strong> Room No. 305, Department of Physics, SVU Campus, Tirupati - 517 502</p>
              <p><strong>Email:</strong> {facultyProfile.email}</p>
              <p><strong>Telephone:</strong> {facultyProfile.phone}</p>
              <p><strong>Consultation Hours:</strong> Monday to Friday, 3:00 PM – 5:00 PM</p>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
