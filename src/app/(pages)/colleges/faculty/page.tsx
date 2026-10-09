"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Users,
  ChevronDown,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Header from "@/components/InnerHeader";
import Footer from "@/components/InnerFooter";

// Faculty dataset matching Image 1
export const facultyList = [
  {
    slug: "prof-a-r-kumar",
    name: "Prof. A. R. Kumar",
    role: "Professor",
    department: "Department of Physics",
    collegeName: "SVU College of Sciences",
    collegeId: "sciences",
    image: "/faculty/prof-a-r-kumar.jpg",
  },
  {
    slug: "dr-b-s-lakshmi",
    name: "Dr. B. S. Lakshmi",
    role: "Associate Professor",
    department: "Department of Chemistry",
    collegeName: "SVU College of Sciences",
    collegeId: "sciences",
    image: "/faculty/dr-b-s-lakshmi.jpg",
  },
  {
    slug: "prof-c-narasimha-rao",
    name: "Prof. C. Narasimha Rao",
    role: "Professor",
    department: "Department of Civil Engineering",
    collegeName: "SVU College of Engineering",
    collegeId: "engineering",
    image: "/faculty/prof-c-narasimha-rao.jpg",
  },
  {
    slug: "dr-d-padmavathi",
    name: "Dr. D. Padmavathi",
    role: "Associate Professor",
    department: "Department of Pharmaceutics",
    collegeName: "SVU College of Pharmaceutical Science",
    collegeId: "pharmacy",
    image: "/faculty/dr-d-padmavathi.jpg",
  },
  {
    slug: "dr-e-venkatesh",
    name: "Dr. E. Venkatesh",
    role: "Assistant Professor",
    department: "Department of Business Management",
    collegeName: "SVU College of CM & CS",
    collegeId: "cm-cs",
    image: "/faculty/dr-e-venkatesh.jpg",
  },
  {
    slug: "prof-g-sreedevi",
    name: "Prof. G. Sreedevi",
    role: "Professor",
    department: "Department of Botany",
    collegeName: "SVU College of Sciences",
    collegeId: "sciences",
    image: "/faculty/prof-g-sreedevi.jpg",
  },
  {
    slug: "dr-k-madhusudhan",
    name: "Dr. K. Madhusudhan",
    role: "Associate Professor",
    department: "Department of Computer Science",
    collegeName: "SVU College of CM & CS",
    collegeId: "cm-cs",
    image: "/faculty/dr-k-madhusudhan.jpg",
  },
  {
    slug: "dr-m-saritha",
    name: "Dr. M. Saritha",
    role: "Assistant Professor",
    department: "Department of Pharmaceutical Analysis",
    collegeName: "SVU College of Pharmaceutical Science",
    collegeId: "pharmacy",
    image: "/faculty/dr-m-saritha.jpg",
  }
];

export const collegesOptions = [
  "All Colleges",
  "SVU College of Sciences",
  "SVU College of Engineering",
  "SVU College of CM & CS",
  "SVU College of Pharmaceutical Science"
];

export const departmentOptions = [
  "All Departments",
  "Department of Physics",
  "Department of Chemistry",
  "Department of Civil Engineering",
  "Department of Pharmaceutics",
  "Department of Business Management",
  "Department of Botany",
  "Department of Computer Science",
  "Department of Pharmaceutical Analysis"
];

export const designationOptions = [
  "All Designations",
  "Professor",
  "Associate Professor",
  "Assistant Professor"
];

export default function FacultyDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("All Colleges");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedDesignation, setSelectedDesignation] = useState("All Designations");
  const [sortBy, setSortBy] = useState("Name (A - Z)");
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered members
  const filteredFaculty = useMemo(() => {
    return facultyList
      .filter((member) => {
        if (selectedCollege !== "All Colleges" && member.collegeName !== selectedCollege) {
          return false;
        }
        if (selectedDepartment !== "All Departments" && member.department !== selectedDepartment) {
          return false;
        }
        if (selectedDesignation !== "All Designations" && member.role !== selectedDesignation) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const match =
            member.name.toLowerCase().includes(q) ||
            member.department.toLowerCase().includes(q) ||
            member.role.toLowerCase().includes(q) ||
            member.collegeName.toLowerCase().includes(q);
          if (!match) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "Name (A - Z)") return a.name.localeCompare(b.name);
        if (sortBy === "Name (Z - A)") return b.name.localeCompare(a.name);
        return 0;
      });
  }, [searchQuery, selectedCollege, selectedDepartment, selectedDesignation, sortBy]);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans flex flex-col">
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
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300 mb-5 tracking-wide">
            <a href="/" className="hover:text-[#faa61a] transition-colors">Home</a>
            <ChevronRight className="w-3.5 h-3.5 text-[#faa61a]" />
            <span className="text-slate-400">Colleges</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#faa61a]" />
            <span className="text-[#faa61a] font-bold">Faculty</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4 text-balance">
            Faculty Directory
          </h1>
          <div className="w-16 h-1 bg-[#faa61a] my-2 rounded-full" />
          <p className="text-white/85 text-xs md:text-sm max-w-2xl leading-relaxed mt-2">
            Meet our distinguished professoriate, researchers, and mentors driving academic excellence and transformative discoveries at Sri Venkateswara University.
          </p>
        </div>
      </section>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        
        {/* Top Header Section with Right Card */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-8">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">
              OUR PEOPLE
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-serif font-bold text-[#002147] tracking-tight leading-tight">
              Dedicated to Teaching, Research and Society
            </h1>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-xl">
              The faculty at Sri Venkateswara University bring together deep subject expertise, innovative research and a commitment to student success.
            </p>
          </div>

          {/* Right Callout Box: A Community of Scholars and Mentors */}
          <div className="bg-[#fbf9f4] border border-[#ebdcc4] rounded-xl p-5 flex items-start gap-4 max-w-sm w-full shrink-0 shadow-xs">
            <div className="w-11 h-11 rounded-full bg-[#f4ecd8] flex items-center justify-center shrink-0 mt-0.5">
              <Users className="w-5 h-5 text-[#8c6d3b]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm text-[#002147] leading-snug">
                A Community of Scholars and Mentors
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Inspiring minds. Building futures.
              </p>
              <div className="w-8 h-[2px] bg-[#8c6d3b] mt-2.5" />
            </div>
          </div>
        </div>

        {/* Filter Bar (Search, Colleges, Departments, Designations, Search Button) */}
        <div className="bg-[#fafafa] border border-slate-200 rounded-xl p-3 sm:p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-4 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, department, designation or keyword"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#8c6d3b]"
              />
            </div>

            {/* Colleges Dropdown */}
            <div className="md:col-span-2 relative">
              <select
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(e.target.value)}
                className="w-full appearance-none pl-3 pr-8 py-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:outline-none focus:border-[#8c6d3b] cursor-pointer truncate"
              >
                {collegesOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Departments Dropdown */}
            <div className="md:col-span-2 relative">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full appearance-none pl-3 pr-8 py-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:outline-none focus:border-[#8c6d3b] cursor-pointer truncate"
              >
                {departmentOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Designations Dropdown */}
            <div className="md:col-span-2 relative">
              <select
                value={selectedDesignation}
                onChange={(e) => setSelectedDesignation(e.target.value)}
                className="w-full appearance-none pl-3 pr-8 py-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:outline-none focus:border-[#8c6d3b] cursor-pointer truncate"
              >
                {designationOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Search Button */}
            <div className="md:col-span-2">
              <button
                type="button"
                className="w-full bg-[#8c6d3b] hover:bg-[#795d31] text-white font-semibold py-2.5 px-4 rounded-lg text-xs transition-colors shadow-xs"
              >
                Search
              </button>
            </div>

          </div>
        </div>

        {/* Results Count & Sort Bar */}
        <div className="flex items-center justify-between gap-4 mb-6 text-xs text-slate-600">
          <div>
            Showing <strong className="text-slate-900 font-bold">1 – {filteredFaculty.length}</strong> of <strong className="text-slate-900 font-bold">240</strong> faculty members
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-slate-200 rounded-md pl-3 pr-7 py-1.5 text-xs text-slate-700 font-medium focus:outline-none focus:border-[#8c6d3b] cursor-pointer"
              >
                <option value="Name (A - Z)">Name (A - Z)</option>
                <option value="Name (Z - A)">Name (Z - A)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 4-Column Faculty Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {filteredFaculty.map((member) => (
            <div
              key={member.slug}
              className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col group"
            >
              {/* Photo */}
              <div className="h-56 w-full overflow-hidden bg-slate-100 relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-300"
                />
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-serif font-bold text-[15px] text-[#002147] group-hover:text-[#8c6d3b] transition-colors leading-snug">
                  {member.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  {member.role}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {member.department}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {member.collegeName}
                </p>

                {/* View Profile Link */}
                <Link
                  href={`/colleges/faculty/${member.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#002147] group-hover:text-[#8c6d3b] mt-4 pt-2 border-t border-slate-100 transition-colors"
                >
                  <span>View Profile</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-600 pt-4">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="w-8 h-8 rounded border border-slate-200 hover:bg-slate-50 flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <button className="w-8 h-8 rounded bg-[#002147] text-white flex items-center justify-center font-bold">
            1
          </button>
          <button className="w-8 h-8 rounded border border-slate-200 hover:bg-slate-50 flex items-center justify-center transition-colors">
            2
          </button>
          <button className="w-8 h-8 rounded border border-slate-200 hover:bg-slate-50 flex items-center justify-center transition-colors">
            3
          </button>
          <button className="w-8 h-8 rounded border border-slate-200 hover:bg-slate-50 flex items-center justify-center transition-colors">
            4
          </button>
          <button className="w-8 h-8 rounded border border-slate-200 hover:bg-slate-50 flex items-center justify-center transition-colors">
            5
          </button>
          <span className="px-1 text-slate-400">..</span>
          <button className="w-8 h-8 rounded border border-slate-200 hover:bg-slate-50 flex items-center justify-center transition-colors">
            21
          </button>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="w-8 h-8 rounded border border-slate-200 hover:bg-slate-50 flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Next page"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </main>

      <Footer />
    </div>
  );
}
