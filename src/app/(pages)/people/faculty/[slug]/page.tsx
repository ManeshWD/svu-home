"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  GraduationCap,
  Briefcase,
  BookOpen,
  Award,
  Users,
  Building,
  UserCheck,
  Globe,
  ExternalLink,
  BookMarked,
  Activity
} from "lucide-react";
import Header from "@/components/InnerHeader";
import Footer from "@/components/InnerFooter";

// Faculty single page database mapping slugs to detailed data
const facultyDetailsDatabase: Record<string, {
  name: string;
  role: string;
  department: string;
  school: string;
  email: string;
  phone: string;
  room: string;
  image: string;
  experience: string;
  publicationsCount: string;
  scholarsCount: string;
  awardsCount: string;
  aboutText: string;
  qualifications: { degree: string; institution: string; year: string }[];
  publications: string[];
  researchProjects: string[];
  conferences: string[];
  achievements: string[];
  interests: string[];
  subjects: string[];
}> = {
  "r-balaji": {
    name: "Prof. R. Balaji",
    role: "Professor",
    department: "Department of Physics",
    school: "School of Physical Sciences",
    email: "rbalaji@svuniversity.edu.in",
    phone: "+91 877-226-1234",
    room: "Room No. 203, Physics Block, SV University Campus, Tirupati - 517502, Andhra Pradesh, India",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    experience: "20+",
    publicationsCount: "45+",
    scholarsCount: "8",
    awardsCount: "5",
    aboutText: "Prof. R. Balaji is a Professor in the Department of Physics with over 20 years of experience in teaching and research. His research interests lie in Quantum Optics, Laser Spectroscopy and Atomic & Molecular Physics. He has guided several research scholars and has made significant contributions to advancing knowledge in the field through his research and publications.",
    qualifications: [
      { degree: "Ph.D. in Physics", institution: "IIT Madras", year: "2004" },
      { degree: "M.Sc. in Physics", institution: "Sri Venkateswara University", year: "2000" },
      { degree: "B.Sc. in Physical Sciences", institution: "Sri Venkateswara University", year: "1998" }
    ],
    publications: [
      "Quantum Coherence and Interference in Multi-level Atomic Systems, Physical Review A (2023)",
      "High-resolution Laser Spectroscopy of Diatomic Molecules, Journal of Molecular Spectroscopy (2021)",
      "Nonlinear Dynamics of Lasers with Optical Feedback, Optics Communications (2019)",
      "Coherent Population Trapping in Rubidium Vapor, Journal of Physics B (2017)",
      "EIT-based Slow Light Propagation in Warm Atomic Vapors, Physical Review A (2015)"
    ],
    researchProjects: [
      "Development of EIT-based Quantum Sensors, funded by DST-SERB (Ongoing, ₹45 Lakhs)",
      "Precision Spectroscopy for Environmental Monitoring, funded by UGC (Completed, ₹12 Lakhs)",
      "Nonlinear Optics in Semiconductor Microcavities, funded by CSIR (Completed, ₹18 Lakhs)"
    ],
    conferences: [
      "Keynote Speaker at National Conference on Quantum Physics, New Delhi (2023)",
      "Presented paper at International Conference on Laser Spectroscopy, Munich, Germany (2022)",
      "Session Chair at DAE-BRNS Symposium on Optical Sciences, Mumbai (2021)"
    ],
    achievements: [
      "Best Researcher Award – Sri Venkateswara University (2022)",
      "Young Scientist Award – Andhra Pradesh State Council of Higher Education (2018)",
      "UGC Research Award – Sanctioned Major Research Project (2021)",
      "Reviewer for reputed journals including Physical Review A, Optics Letters, and Journal of Applied Physics."
    ],
    interests: ["Quantum Optics", "Laser Spectroscopy", "Atomic & Molecular Physics", "Nonlinear Dynamics"],
    subjects: ["Quantum Mechanics", "Laser Physics", "Atomic and Molecular Physics", "Mathematical Physics"]
  },
  "s-padmavathi": {
    name: "Dr. S. Padmavathi",
    role: "Associate Professor",
    department: "Department of Chemistry",
    school: "School of Chemical Sciences",
    email: "spadmavathi@svuniversity.edu.in",
    phone: "+91 877-226-5678",
    room: "Room No. 105, Chemistry Block, SV University Campus, Tirupati - 517502, Andhra Pradesh, India",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    experience: "15+",
    publicationsCount: "32+",
    scholarsCount: "4",
    awardsCount: "3",
    aboutText: "Dr. S. Padmavathi is an Associate Professor in the Department of Chemistry. Her research focused on green synthesis, bio-catalysis, and synthesis of novel organic molecules of medicinal interest. She is actively involved in collaborative projects and has successfully mentored multiple doctoral and masters researchers.",
    qualifications: [
      { degree: "Ph.D. in Organic Chemistry", institution: "Sri Venkateswara University", year: "2008" },
      { degree: "M.Sc. in Chemistry", institution: "Sri Venkateswara University", year: "2004" }
    ],
    publications: [
      "Green Synthesis of Biologically Active Heterocyclic Compounds, Bioorganic Chemistry (2023)",
      "Transition Metal-catalyzed C-H Activation Processes, Journal of Organic Chemistry (2022)",
      "Design and Synthesis of Novel Antimicrobial Peptidomimetics, Medicinal Chemistry Research (2020)"
    ],
    researchProjects: [
      "Green Chemical Routes for Drug Intermediates, funded by CSIR (Ongoing, ₹32 Lakhs)",
      "Development of Novel Organic Catalysts, funded by UGC (Completed, ₹8 Lakhs)"
    ],
    conferences: [
      "Invited Talk at Indian Council of Chemists Annual Conference (2023)",
      "Presented paper at International Symposium on Green Chemistry, Paris (2021)"
    ],
    achievements: [
      "Excellent Teacher Award – SVU Chemistry Alumni Association (2021)",
      "Advisory Member for State Environmental Protection Council (2019)"
    ],
    interests: ["Organic Synthesis", "Green Chemistry", "Medicinal Chemistry", "Catalysis"],
    subjects: ["Organic Stereochemistry", "Synthetic Organic Chemistry", "Spectroscopic Identification", "Bio-organic Chemistry"]
  },
  "k-venkatesan": {
    name: "Dr. K. Venkatesan",
    role: "Assistant Professor",
    department: "Department of Mathematics",
    school: "School of Mathematical & Physical Sciences",
    email: "kvenkatesan@svuniversity.edu.in",
    phone: "+91 877-226-9012",
    room: "Room No. 308, Ramanujan Mathematics Block, SV University Campus, Tirupati - 517502, Andhra Pradesh, India",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    experience: "8+",
    publicationsCount: "18+",
    scholarsCount: "2",
    awardsCount: "2",
    aboutText: "Dr. K. Venkatesan specializes in Abstract Algebra, Cryptography, and Number Theory. He joined Sri Venkateswara University after completing his Ph.D. at the Indian Institute of Science (IISc), Bangalore, and post-doctoral work at TIFR. He actively promotes research in secure network communication systems.",
    qualifications: [
      { degree: "Ph.D. in Mathematics", institution: "IISc Bangalore", year: "2016" },
      { degree: "M.Sc. in Mathematics", institution: "IIT Madras", year: "2011" }
    ],
    publications: [
      "Modular Representation Theory of Finite Groups, Annals of Mathematics (2022)",
      "Elliptic Curve Cryptography for Embedded Systems, Journal of Cryptographic Engineering (2021)",
      "On Certain Partition Functions in Additive Number Theory, Ramanujan Journal (2019)"
    ],
    researchProjects: [
      "Secure Cryptosystems based on Elliptic Curves, funded by DRDO (Ongoing, ₹38 Lakhs)"
    ],
    conferences: [
      "Invited Speaker at Ramanujan Mathematical Society Annual Conference (2023)",
      "Paper presenter at International Congress of Mathematicians, Seoul (2014)"
    ],
    achievements: [
      "Inspire Faculty Award – Department of Science & Technology (2017)",
      "Best Ph.D. Thesis Award – IISc Bangalore (2016)"
    ],
    interests: ["Algebra & Number Theory", "Cryptography", "Graph Theory", "Algebraic Geometry"],
    subjects: ["Abstract Algebra", "Real Analysis", "Number Theory", "Cryptography & Coding Theory"]
  }
};

export default function FacultyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) || "";

  // Active Tab State: About, Qualifications, Publications, Research, Conferences, Contact Details
  const [activeTab, setActiveTab] = useState("About");

  // Retrieve current faculty detail or fallback to R. Balaji
  const faculty = useMemo(() => {
    if (slug && facultyDetailsDatabase[slug]) {
      return facultyDetailsDatabase[slug];
    }
    // Fallback to Balaji if database matching fails
    return facultyDetailsDatabase["r-balaji"];
  }, [slug]);

  // Tab names array matching design header buttons
  const tabsList = [
    { id: "About", label: "About" },
    { id: "Qualifications", label: "Qualifications" },
    { id: "Publications", label: "Publications" },
    { id: "Research", label: "Research" },
    { id: "Conferences", label: "Conferences" },
    { id: "Contact Details", label: "Contact Details" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] text-slate-800 font-sans select-none">
      <Header />

      {/* Breadcrumb Path Bar */}
      <div className="bg-[#002147] text-white py-3.5 px-4 md:px-8 border-b border-[#faa61a]/20 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs font-semibold text-white/80">
            <a href="/" className="hover:text-[#faa61a] transition-colors">Home</a>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-white/60">People</span>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <a href="/people/faculty" className="hover:text-[#faa61a] transition-colors">Faculty Directory</a>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[#faa61a] font-bold">{faculty.name}</span>
          </div>

          {/* Back button */}
          <button
            onClick={() => router.push("/people/faculty")}
            className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#faa61a]" />
            <span>Back to Faculty Directory</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-12 py-10 space-y-10">
        
        {/* Profile Card Banner (Curve effect, Clock tower background) */}
        <section className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm relative">
          
          {/* Cover Art Banner (Fades to Clock Tower on right) */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop"
              alt="SVU Campus"
              className="w-full h-full object-cover object-center scale-[1.02] opacity-20 lg:opacity-30"
            />
          </div>

          <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
            
            {/* Faculty Portrait in high-quality Card frame */}
            <div className="relative w-44 h-44 sm:w-48 sm:h-48 shrink-0 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-slate-100">
              <img
                src={faculty.image}
                alt={faculty.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Profile Information Block */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="space-y-1.5">
                <span className="text-[#faa61a] text-xs font-black uppercase tracking-wider bg-[#faa61a]/10 px-3 py-1 rounded-full border border-[#faa61a]/20 inline-block">
                  {faculty.role}
                </span>
                <h1 className="text-3xl md:text-4xl font-black text-[#002147] tracking-tight">
                  {faculty.name}
                </h1>
                <p className="text-sm font-bold text-gray-700 leading-none">
                  {faculty.department}
                </p>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                  {faculty.school}
                </p>
              </div>

              {/* Contact and Room Details Info List */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-2.5 pt-3 border-t border-slate-100 text-xs text-gray-600 font-semibold max-w-2xl">
                <div className="flex items-center justify-center md:justify-start space-x-2.5 min-w-0">
                  <Mail className="w-4 h-4 text-[#faa61a] shrink-0" />
                  <a href={`mailto:${faculty.email}`} className="hover:text-blue-600 transition-colors text-left truncate min-w-0">
                    {faculty.email}
                  </a>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2.5">
                  <Phone className="w-4 h-4 text-[#faa61a] shrink-0" />
                  <a href={`tel:${faculty.phone}`} className="hover:text-blue-600 transition-colors text-left">
                    {faculty.phone}
                  </a>
                </div>
                <div className="flex items-start justify-center md:justify-start space-x-2.5 xl:col-span-2">
                  <MapPin className="w-4 h-4 text-[#faa61a] mt-0.5 shrink-0" />
                  <span className="text-left leading-relaxed">
                    {faculty.room}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Tab Buttons bar matching design tab switcher */}
        <section className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden p-1.5 flex flex-wrap gap-1">
          {tabsList.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[120px] text-center py-3 rounded-xl text-xs md:text-sm font-bold cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "bg-[#002147] text-[#faa61a] shadow-md border border-[#faa61a]/20"
                    : "text-slate-600 hover:text-[#002147] hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </section>

        {/* Double-column Tab Content & Details Panel */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Tab Specific Panel Content */}
          <div className="lg:col-span-8 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm min-h-[420px] flex flex-col justify-between">
            
            {/* ABOUT TAB */}
            {activeTab === "About" && (
              <div className="space-y-8 animate-fade-in">
                <div className="space-y-4">
                  <h2 className="text-lg md:text-xl font-black text-[#002147] pb-3 border-b border-slate-100 flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-[#faa61a]" />
                    About
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed text-justify font-medium">
                    {faculty.aboutText}
                  </p>
                </div>

                {/* Stats grid under About section */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 text-center">
                  <div className="space-y-1 bg-slate-50/50 p-4 rounded-2xl border border-slate-100 shadow-inner">
                    <div className="flex justify-center text-[#faa61a] mb-1">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div className="text-xl md:text-2xl font-black text-[#002147] tracking-tight">{faculty.experience}</div>
                    <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Years Exp</div>
                  </div>

                  <div className="space-y-1 bg-slate-50/50 p-4 rounded-2xl border border-slate-100 shadow-inner">
                    <div className="flex justify-center text-[#faa61a] mb-1">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div className="text-xl md:text-2xl font-black text-[#002147] tracking-tight">{faculty.publicationsCount}</div>
                    <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Pubs</div>
                  </div>

                  <div className="space-y-1 bg-slate-50/50 p-4 rounded-2xl border border-slate-100 shadow-inner">
                    <div className="flex justify-center text-[#faa61a] mb-1">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="text-xl md:text-2xl font-black text-[#002147] tracking-tight">{faculty.scholarsCount}</div>
                    <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Ph.D. Guided</div>
                  </div>

                  <div className="space-y-1 bg-slate-50/50 p-4 rounded-2xl border border-slate-100 shadow-inner">
                    <div className="flex justify-center text-[#faa61a] mb-1">
                      <Award className="w-5 h-5" />
                    </div>
                    <div className="text-xl md:text-2xl font-black text-[#002147] tracking-tight">{faculty.awardsCount}</div>
                    <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Awards</div>
                  </div>
                </div>

                {/* Achievements & Honors list */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-black text-[#002147] uppercase tracking-wider">
                    Achievements & Honors
                  </h3>
                  <ul className="space-y-3">
                    {faculty.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start space-x-3 text-xs md:text-sm text-gray-600 font-medium leading-relaxed">
                        <Award className="w-4 h-4 text-[#faa61a] shrink-0 mt-0.5" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* QUALIFICATIONS TAB */}
            {activeTab === "Qualifications" && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-lg md:text-xl font-black text-[#002147] pb-3 border-b border-slate-100 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#faa61a]" />
                  Academic Qualifications
                </h2>
                <div className="relative border-l-2 border-[#faa61a]/30 ml-4 pl-6 space-y-6 py-2">
                  {faculty.qualifications.map((qual, idx) => (
                    <div key={idx} className="relative space-y-1">
                      {/* Timeline dot */}
                      <div className="absolute left-[-31px] top-1 bg-white border-2 border-[#faa61a] w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0 shadow-sm" />
                      <div className="text-xs font-black text-[#faa61a] tracking-wider uppercase leading-none mb-1">
                        Year {qual.year}
                      </div>
                      <h4 className="text-sm md:text-base font-black text-[#002147] leading-tight">
                        {qual.degree}
                      </h4>
                      <p className="text-xs text-gray-500 font-bold">
                        {qual.institution}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PUBLICATIONS TAB */}
            {activeTab === "Publications" && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-lg md:text-xl font-black text-[#002147] pb-3 border-b border-slate-100 flex items-center gap-2">
                  <BookMarked className="w-5 h-5 text-[#faa61a]" />
                  Selected Research Publications
                </h2>
                <div className="space-y-4">
                  {faculty.publications.map((pub, idx) => (
                    <div key={idx} className="flex items-start space-x-3.5 p-3.5 border border-slate-100 hover:border-[#faa61a]/30 rounded-2xl hover:bg-slate-50/50 transition-all font-medium">
                      <div className="bg-[#faa61a]/10 text-[#002147] p-2.5 rounded-full shrink-0 flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-[#002147]" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-wider text-[#faa61a]">
                          Publication {idx + 1}
                        </span>
                        <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-semibold">
                          {pub}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RESEARCH PROJECTS TAB */}
            {activeTab === "Research" && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-lg md:text-xl font-black text-[#002147] pb-3 border-b border-slate-100 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#faa61a]" />
                  Sponsored Research Projects
                </h2>
                <div className="space-y-4">
                  {faculty.researchProjects.map((project, idx) => (
                    <div key={idx} className="flex items-start space-x-4 p-4 border border-slate-100 rounded-2xl bg-slate-50/50">
                      <Building className="w-5 h-5 text-[#faa61a] shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <h4 className="text-xs md:text-sm font-black text-[#002147] leading-snug">
                          {project.split(",")[0]}
                        </h4>
                        <p className="text-xs text-gray-500 font-semibold mt-1">
                          {project.substring(project.indexOf(",") + 1)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CONFERENCES TAB */}
            {activeTab === "Conferences" && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-lg md:text-xl font-black text-[#002147] pb-3 border-b border-slate-100 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#faa61a]" />
                  Conferences & Presentations
                </h2>
                <div className="space-y-4">
                  {faculty.conferences.map((conf, idx) => (
                    <div key={idx} className="flex items-start space-x-3 text-xs md:text-sm text-gray-600 font-semibold leading-relaxed border-b border-slate-50 pb-3 last:border-b-0">
                      <ChevronRight className="w-4 h-4 text-[#faa61a] shrink-0 mt-0.5" />
                      <span>{conf}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CONTACT DETAILS TAB */}
            {activeTab === "Contact Details" && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-lg md:text-xl font-black text-[#002147] pb-3 border-b border-slate-100 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#faa61a]" />
                  Official Contact Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Email & Phone Cards */}
                  <div className="bg-slate-50/50 border border-slate-100 p-5 rounded-2xl space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-wider text-gray-500">Contact Mediums</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 text-xs font-semibold text-gray-700 min-w-0">
                        <Mail className="w-4 h-4 text-[#faa61a] shrink-0" />
                        <a href={`mailto:${faculty.email}`} className="hover:text-blue-600 truncate min-w-0">{faculty.email}</a>
                      </div>
                      <div className="flex items-center space-x-3 text-xs font-semibold text-gray-700">
                        <Phone className="w-4 h-4 text-[#faa61a]" />
                        <a href={`tel:${faculty.phone}`} className="hover:text-blue-600">{faculty.phone}</a>
                      </div>
                    </div>
                  </div>

                  {/* Room details Card */}
                  <div className="bg-slate-50/50 border border-slate-100 p-5 rounded-2xl space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-wider text-gray-500">Office Location</h3>
                    <div className="flex items-start space-x-3 text-xs font-semibold text-gray-700 leading-relaxed">
                      <MapPin className="w-4 h-4 text-[#faa61a] mt-0.5 shrink-0" />
                      <span>{faculty.room}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom info signature matching theme */}
            <div className="pt-6 border-t border-slate-100 text-[10px] text-gray-400 font-bold uppercase tracking-widest text-right">
              © Sri Venkateswara University • {faculty.department}
            </div>

          </div>

          {/* ========================================== */}
          {/* RIGHT COLUMN: Faculty Meta & Subjects Lists */}
          {/* ========================================== */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Research Interests tags box */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-black text-[#002147] uppercase tracking-wider pb-3.5 border-b border-slate-100">
                Research Interests
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {faculty.interests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-50 text-blue-800 text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-xl border border-blue-100 shadow-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>



            {/* Subjects Taught List */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-black text-[#002147] uppercase tracking-wider pb-3.5 border-b border-slate-100">
                Subjects Taught
              </h3>
              <div className="space-y-3 font-semibold text-xs text-gray-600">
                {faculty.subjects.map((subject, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 leading-relaxed">
                    <span className="w-1.5 h-1.5 bg-[#faa61a] rounded-full shrink-0 mt-1.5" />
                    <span>{subject}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </section>

      </main>

      <Footer />
    </div>
  );
}
