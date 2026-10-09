"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  ChevronDown,
  ChevronRight,
  Mail,
  User,
  GraduationCap,
  Briefcase,
  MapPin,
  Phone,
  BookOpen,
  Trophy,
  Activity,
  Layers,
  ArrowRight,
  Menu,
  X
} from "lucide-react";
import Header from "@/components/InnerHeader";
import Footer from "@/components/InnerFooter";

// Faculty roles with counts matching the design
const rolesList = [
  { name: "All Faculty", count: 256, slug: "all" },
  { name: "Vice-Chancellor", count: 1, slug: "vice-chancellor" },
  { name: "Professor", count: 52, slug: "professor" },
  { name: "Associate Professor", count: 68, slug: "associate-professor" },
  { name: "Assistant Professor", count: 102, slug: "assistant-professor" },
  { name: "Adjunct Faculty", count: 12, slug: "adjunct-faculty" },
  { name: "Guest Faculty", count: 10, slug: "guest-faculty" },
  { name: "Research Scholar", count: 11, slug: "research-scholar" },
];

// Quick links on left sidebar
const quickLinks = [
  { label: "Academic Departments", href: "#" },
  { label: "Research & Publications", href: "#" },
  { label: "Centers & Facilities", href: "#" },
  { label: "Faculty Achievements", href: "#" },
];

// Faculty database
const facultyDatabase = [
  {
    name: "Prof. R. Balaji",
    role: "Professor",
    department: "Department of Physics",
    qualification: "Ph.D., IIT Madras",
    tag: "Quantum Optics",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    slug: "r-balaji",
    email: "rbalaji@svuniversity.edu.in",
  },
  {
    name: "Dr. S. Padmavathi",
    role: "Associate Professor",
    department: "Department of Chemistry",
    qualification: "Ph.D., Sri Venkateswara University",
    tag: "Organic Chemistry",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
    slug: "s-padmavathi",
    email: "spadmavathi@svuniversity.edu.in",
  },
  {
    name: "Dr. K. Venkatesan",
    role: "Assistant Professor",
    department: "Department of Mathematics",
    qualification: "Ph.D., IISc Bangalore",
    tag: "Algebra & Number Theory",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    slug: "k-venkatesan",
    email: "kvenkatesan@svuniversity.edu.in",
  },
  {
    name: "Dr. M. Bhargavi",
    role: "Assistant Professor",
    department: "Department of Biotechnology",
    qualification: "Ph.D., JNU New Delhi",
    tag: "Molecular Biology",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    slug: "m-bhargavi",
    email: "mbhargavi@svuniversity.edu.in",
  },
  {
    name: "Dr. T. Praveen Kumar",
    role: "Assistant Professor",
    department: "Department of Computer Science",
    qualification: "Ph.D., NIT Warangal",
    tag: "Machine Learning",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop",
    slug: "t-praveen-kumar",
    email: "tpraveenkumar@svuniversity.edu.in",
  },
  {
    name: "Dr. P. Anitha",
    role: "Associate Professor",
    department: "Department of Commerce",
    qualification: "Ph.D., Sri Venkateswara University",
    tag: "Financial Accounting",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop",
    slug: "p-anitha",
    email: "panitha@svuniversity.edu.in",
  },
  {
    name: "Dr. G. Satheesh",
    role: "Assistant Professor",
    department: "Department of English",
    qualification: "Ph.D., University of Hyderabad",
    tag: "British Literature",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop",
    slug: "g-satheesh",
    email: "gsatheesh@svuniversity.edu.in",
  },
  {
    name: "Dr. K. Surekha",
    role: "Associate Professor",
    department: "Department of Zoology",
    qualification: "Ph.D., Osmania University",
    tag: "Cell Biology",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
    slug: "k-surekha",
    email: "ksurekha@svuniversity.edu.in",
  },
];

export default function FacultyDirectory() {
  const [selectedRole, setSelectedRole] = useState("All Faculty");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [selectedQual, setSelectedQual] = useState("All Qualifications");
  const [sortBy, setSortBy] = useState("Sort By: Name (A-Z)");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Departments list for dropdown
  const departments = [
    "All Departments",
    "Department of Physics",
    "Department of Chemistry",
    "Department of Mathematics",
    "Department of Biotechnology",
    "Department of Computer Science",
    "Department of Commerce",
    "Department of English",
    "Department of Zoology"
  ];

  // Qualifications list for dropdown
  const qualifications = [
    "All Qualifications",
    "IIT Madras",
    "Sri Venkateswara University",
    "IISc Bangalore",
    "JNU New Delhi",
    "NIT Warangal",
    "University of Hyderabad",
    "Osmania University"
  ];

  // Filter faculty database based on user controls
  const filteredFaculty = useMemo(() => {
    let result = facultyDatabase.filter((faculty) => {
      // Role Filter (Sidebar)
      const roleMatch = selectedRole === "All Faculty" || faculty.role === selectedRole;

      // Text Search
      const textMatch =
        searchQuery.trim() === "" ||
        faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.tag.toLowerCase().includes(searchQuery.toLowerCase());

      // Department Dropdown Filter
      const deptMatch = selectedDept === "All Departments" || faculty.department === selectedDept;

      // Qualification Dropdown Filter
      const qualMatch =
        selectedQual === "All Qualifications" || faculty.qualification.includes(selectedQual);

      return roleMatch && textMatch && deptMatch && qualMatch;
    });

    // Sorting logic
    if (sortBy === "Sort By: Name (A-Z)") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "Sort By: Name (Z-A)") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [selectedRole, searchQuery, selectedDept, selectedQual, sortBy]);

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] text-slate-800 font-sans select-none">
      <Header />

      {/* Main Outer Grid (Sidebar + Right Content Panel) */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto flex flex-col lg:flex-row relative">
        
        {/* ========================================== */}
        {/* LEFT SIDEBAR (Desktop: Fixed, Mobile: Drawer) */}
        {/* ========================================== */}
        <aside className="w-full lg:w-[280px] bg-[#001730] text-white shrink-0 lg:min-h-[calc(100vh-140px)] flex flex-col p-6 space-y-8 z-30">
          
          {/* Logo and name removed per request */}

          {/* Browse by Role Accordion / Tabs */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-wider text-white/50 px-1">
              Browse By Role
            </h4>
            <nav className="space-y-1">
              {rolesList.map((role) => {
                const isActive = selectedRole === role.name;
                return (
                  <button
                    key={role.name}
                    onClick={() => {
                      setSelectedRole(role.name);
                      setMobileFiltersOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#002147] text-[#faa61a] border border-[#faa61a]/30 shadow-md"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <User className={`w-3.5 h-3.5 ${isActive ? "text-[#faa61a]" : "text-white/40"}`} />
                      <span>{role.name}</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? "bg-[#faa61a]/20 text-[#faa61a]" : "bg-white/10 text-white/60"
                    }`}>
                      {role.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Links section */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h4 className="text-[10px] font-black uppercase tracking-wider text-white/50 px-1">
              Quick Links
            </h4>
            <div className="space-y-1">
              {quickLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-xs text-white/80 hover:text-[#faa61a] hover:bg-white/5 rounded-xl font-semibold transition-all group"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-white/30 group-hover:text-[#faa61a] group-hover:translate-x-0.5 transition-all" />
                </a>
              ))}
            </div>
          </div>

          {/* Career CTA Callout Box */}
          <div className="bg-[#002147]/60 border border-[#faa61a]/30 rounded-2xl p-4 space-y-3.5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#faa61a]/5 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center space-x-2 text-[#faa61a]">
              <GraduationCap className="w-4 h-4" />
              <span className="text-[9px] font-black uppercase tracking-wider">Be Part of Our Legacy</span>
            </div>
            <p className="text-[10px] text-white/80 font-medium leading-relaxed">
              Join a community of scholars dedicated to shaping the future.
            </p>
            <a
              href="#"
              className="inline-flex items-center space-x-2 text-[10px] font-bold bg-[#faa61a] text-[#001730] px-4 py-2 rounded-lg hover:bg-[#e09110] transition-colors w-full justify-center shadow-sm"
            >
              <span>View Careers</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

        </aside>

        {/* ========================================== */}
        {/* RIGHT PANEL CONTENT */}
        {/* ========================================== */}
        <main className="flex-1 p-6 lg:p-10 space-y-8 min-w-0">
          
          {/* Breadcrumbs Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="flex items-center space-x-2 text-xs font-semibold text-gray-500">
              <a href="/" className="hover:text-[#faa61a] transition-colors">Home</a>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-gray-400">People</span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-[#002147] font-bold">Faculty Directory</span>
            </div>
            
            {/* Visual SVU Campus background graphic badge */}
            <div className="hidden md:flex items-center space-x-3 bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-sm">
              <Layers className="w-4 h-4 text-[#faa61a]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#002147]">
                SVU Directory Portal
              </span>
            </div>
          </div>

          {/* Heading block with clock tower background effect */}
          <div className="relative rounded-3xl overflow-hidden p-6 md:p-8 bg-gradient-to-r from-blue-50/80 to-transparent border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 z-10 max-w-xl">
              <h1 className="text-3xl md:text-4xl font-black text-[#002147] tracking-tight leading-none">
                Faculty Directory
              </h1>
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed font-semibold">
                Meet our distinguished faculty members who are dedicated to excellence in teaching, research, and mentoring.
              </p>
            </div>
            <div className="hidden lg:block w-40 h-24 relative opacity-80 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=300&auto=format&fit=crop"
                alt="SVU Tower"
                className="w-full h-full object-cover rounded-2xl border-2 border-white shadow"
              />
            </div>
          </div>

          {/* Controls Bar: Search + Dropdowns */}
          <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex flex-col xl:flex-row gap-4 items-center justify-between">
              
              {/* Text search */}
              <div className="relative w-full xl:max-w-md">
                <input
                  type="text"
                  placeholder="Search by name, department or expertise..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 hover:border-slate-350 focus:border-[#002147] text-xs font-semibold text-slate-700 pl-10 pr-4 py-2.5 rounded-2xl focus:outline-none placeholder-slate-400 transition-colors shadow-inner"
                />
                <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>

              {/* Select filters */}
              <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
                {/* Department */}
                <div className="relative flex-1 sm:flex-none">
                  <select
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    className="appearance-none w-full bg-slate-50 border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 px-4 py-2.5 pr-9 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#002147] cursor-pointer min-w-[150px]"
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Qualification */}
                <div className="relative flex-1 sm:flex-none">
                  <select
                    value={selectedQual}
                    onChange={(e) => setSelectedQual(e.target.value)}
                    className="appearance-none w-full bg-slate-50 border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 px-4 py-2.5 pr-9 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#002147] cursor-pointer min-w-[150px]"
                  >
                    {qualifications.map((qual) => (
                      <option key={qual} value={qual}>{qual}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Sorting */}
                <div className="relative flex-1 sm:flex-none">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none w-full bg-slate-50 border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 px-4 py-2.5 pr-9 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#002147] cursor-pointer min-w-[150px]"
                  >
                    <option value="Sort By: Name (A-Z)">Sort By: Name (A-Z)</option>
                    <option value="Sort By: Name (Z-A)">Sort By: Name (Z-A)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

            </div>
          </div>

          {/* Results count indicator and grid controls */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-bold">
              Showing {filteredFaculty.length} of {facultyDatabase.length} faculty members
            </span>

            {/* Grid/List togglers */}
            <div className="flex items-center space-x-1.5 bg-white border border-slate-200 rounded-xl p-1 shadow-sm shrink-0">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === "grid" ? "bg-[#002147] text-white" : "text-slate-400 hover:text-slate-600"
                }`}
                title="Grid View"
              >
                {/* Custom Grid Icon */}
                <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                  <rect x="2" y="2" width="5" height="5" rx="1" />
                  <rect x="9" y="2" width="5" height="5" rx="1" />
                  <rect x="2" y="9" width="5" height="5" rx="1" />
                  <rect x="9" y="9" width="5" height="5" rx="1" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === "list" ? "bg-[#002147] text-white" : "text-slate-400 hover:text-slate-600"
                }`}
                title="List View"
              >
                {/* Custom List Icon */}
                <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                  <rect x="2" y="3" width="12" height="2" rx="0.5" />
                  <rect x="2" y="7" width="12" height="2" rx="0.5" />
                  <rect x="2" y="11" width="12" height="2" rx="0.5" />
                </svg>
              </button>
            </div>
          </div>

          {/* Faculty directory listing container */}
          {filteredFaculty.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-sm space-y-4">
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center text-[#002147] mx-auto border border-slate-100 shadow-inner">
                <User className="w-8 h-8 opacity-60" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-[#002147]">No faculty members found</h3>
                <p className="text-slate-500 text-xs font-semibold">Try modifying your search or filters.</p>
              </div>
              <button
                onClick={() => {
                  setSelectedRole("All Faculty");
                  setSearchQuery("");
                  setSelectedDept("All Departments");
                  setSelectedQual("All Qualifications");
                  setSortBy("Sort By: Name (A-Z)");
                }}
                className="bg-[#002147] hover:bg-[#001730] text-white text-xs font-bold px-6 py-3 rounded-xl transition-all cursor-pointer shadow-md"
              >
                Reset Filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            /* ========================================== */
            /* GRID VIEW MODE */
            /* ========================================== */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredFaculty.map((faculty) => (
                <a
                  key={faculty.slug}
                  href={`/people/faculty/${faculty.slug}`}
                  className="group bg-white border border-slate-100 hover:border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer justify-between"
                >
                  {/* Photo container */}
                  <div className="aspect-[4/3] w-full bg-slate-100 border-b border-slate-100 overflow-hidden relative">
                    <img
                      src={faculty.image}
                      alt={faculty.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
                    />
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase tracking-wider text-[#faa61a] bg-[#faa61a]/10 px-2 py-0.5 rounded border border-[#faa61a]/20">
                          {faculty.role}
                        </span>
                      </div>
                      <h3 className="text-sm font-black text-[#002147] leading-snug group-hover:text-blue-600 transition-colors">
                        {faculty.name}
                      </h3>
                      <p className="text-[11px] text-gray-500 font-bold leading-none">{faculty.department}</p>
                      <p className="text-[10px] text-gray-400 leading-relaxed font-semibold">{faculty.qualification}</p>
                    </div>

                    {/* Bottom row: tag and mail icon */}
                    <div className="pt-2.5 border-t border-slate-50 flex items-center justify-between">
                      <span className="text-[9px] font-black bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">
                        {faculty.tag}
                      </span>
                      <div className="text-slate-400 group-hover:text-blue-600 transition-colors">
                        <Mail className="w-4.5 h-4.5" />
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            /* ========================================== */
            /* LIST VIEW MODE */
            /* ========================================== */
            <div className="space-y-4">
              {filteredFaculty.map((faculty) => (
                <a
                  key={faculty.slug}
                  href={`/people/faculty/${faculty.slug}`}
                  className="group bg-white border border-slate-100 hover:border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex items-center space-x-5 cursor-pointer justify-between"
                >
                  <div className="flex items-center space-x-5 min-w-0">
                    {/* Circle headshot */}
                    <div className="w-14 h-14 rounded-full overflow-hidden border border-slate-200 bg-slate-50 shrink-0">
                      <img
                        src={faculty.image}
                        alt={faculty.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    
                    {/* Information */}
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-sm font-black text-[#002147] leading-none group-hover:text-blue-600 transition-colors truncate">
                          {faculty.name}
                        </h3>
                        <span className="text-[8px] font-black uppercase tracking-wider text-[#faa61a] bg-[#faa61a]/10 px-1.5 py-0.5 rounded border border-[#faa61a]/15 shrink-0">
                          {faculty.role}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 font-bold leading-none">{faculty.department}</p>
                      <p className="text-[10px] text-gray-400 leading-none font-semibold">{faculty.qualification}</p>
                    </div>
                  </div>

                  {/* Right hand side elements */}
                  <div className="flex items-center space-x-4 shrink-0">
                    <span className="hidden sm:inline-block text-[9px] font-black bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100">
                      {faculty.tag}
                    </span>
                    <div className="bg-slate-50 group-hover:bg-blue-50 text-slate-400 group-hover:text-blue-600 p-2 rounded-full border border-slate-100 group-hover:border-blue-100 transition-all flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Pagination bar */}
          <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500 font-bold">
              Showing 1 to {filteredFaculty.length} of {facultyDatabase.length} entries
            </span>

            <div className="flex items-center space-x-1">
              <button className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 cursor-pointer disabled:opacity-40" disabled>
                <ChevronLeftIcon className="w-4 h-4" />
              </button>

              {[1, 2, 3, 4, 5, "...", 22].map((p, idx) => {
                const isActive = p === 1;
                if (p === "...") {
                  return <span key={idx} className="px-2 text-slate-400 text-xs">...</span>;
                }
                return (
                  <button
                    key={idx}
                    className={`w-8 h-8 rounded-lg border text-xs font-bold flex items-center justify-center cursor-pointer transition-colors ${
                      isActive
                        ? "bg-[#002147] border-[#002147] text-white shadow"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}

              <button className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 cursor-pointer">
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

        </main>
      </div>

      <Footer />
    </div>
  );
}

// Inline chevron icons to avoid dynamic resolution problems
function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={props.className} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={props.className} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}
