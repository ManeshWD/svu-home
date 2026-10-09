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
  Wifi,
  Handshake,
  Laptop,
  Scale
} from "lucide-react";
import Header from "@/components/InnerHeader";
import Footer from "@/components/InnerFooter";

export default function RegistrarPage() {
  const [isExpanded, setIsExpanded] = useState(false);

  // Focus areas for Registrar
  const focusAreas = [
    {
      title: "Academic Expansion",
      description: "Managing 5 constituent colleges and 54 departments offering 72 programs.",
      icon: Building2,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      title: "Research Funding",
      description: "Administering grants from national (UGC, DST, CSIR) and global agencies (UNESCO, EU).",
      icon: Microscope,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
    },
    {
      title: "Residential & Wi-Fi Services",
      description: "Providing campus-wide Wi-Fi, free internet hubs, and specialized hostel facilities.",
      icon: Wifi,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      title: "Development Projects",
      description: "Constructing E-Classrooms, Incubation Centers, digital libraries, and gymnasium facilities.",
      icon: Laptop,
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
    {
      title: "Value-Based Education",
      description: "Instilling social, moral, and ethical virtues through counselling and curriculum integration.",
      icon: Scale,
      color: "text-purple-600 bg-purple-50 border-purple-100",
    },
    {
      title: "Collaborations & MoUs",
      description: "Facilitating collaborative research agreements with national and international industries.",
      icon: Handshake,
      color: "text-pink-600 bg-pink-50 border-pink-100",
    },
  ];

  // Stats data for Registrar page
  const stats = [
    { value: "1954", label: "Established", icon: Calendar },
    { value: "5", label: "Constituent Colleges", icon: Building2 },
    { value: "54", label: "Departments", icon: Building2 },
    { value: "72", label: "PG Programs", icon: BookOpen },
    { value: "67+", label: "Years of Excellence", icon: Award },
    { value: "100%", label: "Wi-Fi Connected", icon: Wifi },
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
          <span className="text-[#002147] font-bold">Registrar's Message</span>
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
                  REGISTRAR'S MESSAGE
                </span>
                <h1 className="text-3xl md:text-5xl font-black text-[#002147] tracking-tight leading-tight">
                  Message from the<br />Registrar
                </h1>
              </div>

              {/* Gold Quote Block */}
              <div className="border-l-4 border-[#faa61a] pl-4 py-2">
                <p className="text-lg font-bold italic text-gray-700 leading-relaxed">
                  "Efficient Governance and Infrastructure to Facilitate Academic and Research Brilliance"
                </p>
              </div>

              {/* Profile Card */}
              <div className="inline-flex items-center space-x-4 bg-slate-50 border border-slate-100 px-5 py-3.5 rounded-2xl">
                <div className="bg-[#002147] text-white p-2.5 rounded-full shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#002147] leading-none mb-1">
                    Prof. M. Bhupathi Naidu
                  </h4>
                  <p className="text-xs text-gray-500 font-bold">
                    Registrar, Sri Venkateswara University
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
                    src="/registrar.png"
                    alt="Prof. M. Bhupathi Naidu, Registrar"
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
                Registrar's Vision
              </h2>
              <div className="w-10 h-0.5 bg-[#faa61a] mt-1.5" />
            </div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed font-medium">
              We are dedicated to building a seamless administrative infrastructure that supports our faculty, staff, 
              and students in their pursuit of educational and research goals. Through digitisation, operational transparency, 
              and efficient service delivery, we aim to ensure that our university's administration matches its academic stature.
            </p>
          </div>
        </section>

        {/* Interactive Message Section */}
        <section className="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm space-y-6">
          <div className="flex items-center space-x-3.5 pb-4 border-b border-gray-100">
            <FileText className="w-6 h-6 text-[#faa61a]" />
            <h2 className="text-lg md:text-xl font-black text-[#002147]">
              Message from the Registrar
            </h2>
          </div>

          <div className="text-gray-600 text-sm md:text-base leading-relaxed font-medium space-y-6 text-justify">
            <p>
              Sri Venkateswara University has got a rich tradition and legacy. I accepted this responsibility with a deep sense of gratitude and self-effacement. We are proud to be a public institution and I would like to thank our staff, students, graduates and many friends in the community for their ongoing support, commitment to our success and involvement.
            </p>

            {isExpanded && (
              <div className="space-y-6 animate-fade-in pt-2">
                <p>
                  Sri Venkateswara University established in 1954, to cater to the educational needs and aspirations of the people of the Rayalaseema Region of Andhra Pradesh. After completing 67 years of excellence in teaching, research, extension and outreach activities, the University is committed to cater to the needs of higher education offering a full range of post-graduate programs in Arts, Sciences, Law, Management, Education, Physical Education, Engineering and Pharmacy disciplines. From a humble beginning of one College with six departments, the University has now grown into the second largest University in Andhra Pradesh having five constituent Colleges namely College of Arts, College of Sciences, College of Commerce, Management & Computer Science, College of Engineering, and College of Pharmacy accommodating 54 departments offering 72 programs.
                </p>
                <p>
                  Several departments have received Special Assistance Programmes (SAP) of UGC, New Delhi and also received fund under FIST program of DST, New Delhi to improve infrastructural facilities. Most of the faculties have obtained research grants from various national funding agencies like UGC, DST, DBT, CSIR, ICMR, ICSSR, BRNS, ISRO, MNES, MoES, MoEF and DRDO and foreign financing such as UNESCO, UK-DFID, ICRISAT, European Commission Programme ERASMUS MUNDUS. Utilizing these impressive funding, the faculty of the University have proactively interacted with Industry, Academic and Research Institutes in National and International level and entered into collaborative research agreements through MoUs (Memorandum of Understating) to conduct research work in frontier areas of national & International importance.
                </p>
                <p>
                  The University provides residential facilities to research scholars, Post- Doctoral fellows and other researchers in the hostels specially earmarked for them on the campus. Summer fellows, research associates, visiting scientists and faculty researchers from other universities and academics are provided accommodation in the university guest house and Academic Staff college guest house. The university campus is completely Wi-fi connected. The university provides computer and uninterrupted internet facilities for research students, fellows as well as faculty on the campus in all the blocks and laboratories. Direct internet facility and common internet hubs are set-ups near the hostels and quarters on the campus to provide internet access free of cost.
                </p>
                <p>
                  To further enhance the status of the University to compete with the top University at National and Global level through continued development during 2019-2020, additional Buildings for E-Class Rooms, Establishment of Incubation Centres, On-line Examination System/expansion of Laboratories to meet the requirements of new Courses are in the pipeline. Besides meeting the infrastructure facilities of Office, Separate Hostels for Boys and Girls, Cultural Centre and world Class Gymnasium and Sports facilities are being created. International Students Canteen, Digital Library, Wi-Fi Connectivity, Networking, Smart Campus, Air-Conditioned Auditorium, Development of Greenery and State of the modern art furniture in classrooms, faculty rooms, offices, Guest House and Auditorium are under progress.
                </p>
                <p>
                  Education is about much more than employability. It includes evolving with a different view, developing different perspectives and opening your mind to the enormous possibilities, and ultimately emerging as world class human resource. The students are to be given counselling and guidance and instilled with virtues and values of life through various programmes within their curriculum, so that the students emerge as citizens with moral, ethical and social values so to fulfil their obligations to the society and nation. Our focus in the year ahead will be on the formulation of our education strategies and on the relationship between our teaching and research missions. Achievements are the result of an uncompromising commitment to excellence across the board and to the professionalism, creativity, and innovation of the University staff, non-teaching staff, research students and PG Students.
                </p>
                <p>
                  I congratulate all the concerned for the nice work done and thank everyone for their support and wish everyone a great success.
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
