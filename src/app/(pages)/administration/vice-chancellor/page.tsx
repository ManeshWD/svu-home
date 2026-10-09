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
  User
} from "lucide-react";
import Header from "@/components/InnerHeader";
import Footer from "@/components/InnerFooter";

export default function ViceChancellorPage() {
  const [isExpanded, setIsExpanded] = useState(false);

  // Focus areas data for VC
  const focusAreas = [
    {
      title: "Academic Excellence",
      description: "Upholding the highest standards of teaching and learning.",
      icon: GraduationCap,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      title: "Research & Innovation",
      description: "Creating new knowledge and fostering innovation for societal impact.",
      icon: Microscope,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
    },
    {
      title: "NEP 2020 Aligned",
      description: "Reimagining education and curriculum for a future-ready generation.",
      icon: Users,
      color: "text-purple-600 bg-purple-50 border-purple-100",
    },
    {
      title: "Global Engagement",
      description: "Building global linkages and contributing to the global knowledge society.",
      icon: Globe,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      title: "Quality & Rankings",
      description: "Consistently achieving excellence in national and global rankings.",
      icon: TrendingUp,
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
    {
      title: "Student Success",
      description: "Empowering learners for holistic growth and life-long success.",
      icon: Award,
      color: "text-pink-600 bg-pink-50 border-pink-100",
    },
  ];

  // Stats data
  const stats = [
    { value: "1954", label: "Established", icon: Calendar },
    { value: "A+", label: "NAAC Grade", icon: Shield },
    { value: "70+", label: "Years of Legacy", icon: Award },
    { value: "NIRF", label: "Ranked University", icon: TrendingUp },
    { value: "Global", label: "Collaborations", icon: Globe },
    { value: "150+", label: "Academic Programs", icon: BookOpen },
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
          <span className="text-[#002147] font-bold">Vice Chancellor's Message</span>
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
                  VICE CHANCELLOR'S MESSAGE
                </span>
                <h1 className="text-3xl md:text-5xl font-black text-[#002147] tracking-tight leading-tight">
                  Message from the<br />Vice-Chancellor
                </h1>
              </div>

              {/* Gold Quote Block */}
              <div className="border-l-4 border-[#faa61a] pl-4 py-2">
                <p className="text-lg font-bold italic text-gray-700 leading-relaxed">
                  "Transforming Knowledge into Impact for a Better Tomorrow"
                </p>
              </div>

              {/* Profile Card */}
              <div className="inline-flex items-center space-x-4 bg-slate-50 border border-slate-100 px-5 py-3.5 rounded-2xl">
                <div className="bg-[#002147] text-white p-2.5 rounded-full shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#002147] leading-none mb-1">
                    Prof. Tata Narasinga Rao
                  </h4>
                  <p className="text-xs text-gray-500 font-bold">
                    Vice-Chancellor, Sri Venkateswara University
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
                    src="/vc.png"
                    alt="Prof. Tata Narasinga Rao, Vice-Chancellor"
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
                Vice-Chancellor's Vision
              </h2>
              <div className="w-10 h-0.5 bg-[#faa61a] mt-1.5" />
            </div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed font-medium">
              Sri Venkateswara University is committed to academic excellence, research innovation and societal impact. 
              With a legacy of over seven decades, we strive to transform the University into a World-Class Institution by 
              nurturing talent, fostering interdisciplinary collaboration and creating knowledge that addresses national priorities and global challenges.
            </p>
          </div>
        </section>

        {/* Interactive Message Section */}
        <section className="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm space-y-6">
          <div className="flex items-center space-x-3.5 pb-4 border-b border-gray-100">
            <FileText className="w-6 h-6 text-[#faa61a]" />
            <h2 className="text-lg md:text-xl font-black text-[#002147]">
              Message from the Vice-Chancellor
            </h2>
          </div>

          <div className="text-gray-600 text-sm md:text-base leading-relaxed font-medium space-y-6 text-justify">
            <p>
              As the Vice-Chancellor of Sri Venkateswara University, I am honoured and greatly privileged to lead Sri Venkateswara University and continue the ambitious strategy of addressing the challenges and opportunities of the future to transform the University into a World Class Institute.
            </p>

            {isExpanded && (
              <div className="space-y-6 animate-fade-in pt-2">
                <p>
                  Sri Venkateswara University established in 1954 located serenely in a picturesque campus at the foot of the Seven Hills. With well planned and aesthetically designed buildings spread in a green, clean and expansive natural environment, the campus is a joyous place to work and live. The University has been a premier institution of Higher Learning, Research, Extension and Consultancy to cater to the educational needs and aspirations of the people of the Rayalaseema Region of Andhra Pradesh and has played a pivotal role in creating new knowledge, fostering innovation to produce economic value, and addressing societal needs and challenges. Judging by the historical time constants of evolution, SVU has emerged as one of the leading universities in the World in the relatively short time span of only seven decades. This rapid ascent stems from the broad recognition that the core activities of SVU have had a demonstrable influence in advancing knowledge that benefit national priorities and global scientific and innovation ecosystem.
                </p>
                <p>
                  Over the past 66 years Sri Venkateswara University has grown in stature and is today recognised as one of the premier Universities in the Country accredited by NAAC with ‘A+’ grade. Sri Venkateswara University has been making rapid strides in teaching, research and extension activities with all-round co-operation from the faculty, non-teaching staff, scholars and students. Our research output is very satisfactory and has crossed the mark of excellence and it is proved in rankings. MHRD-National Institutional Ranking Frame (NIRF) work, BRICS World Ranking, QS Rankings and Asia University Rankings.
                </p>
                <p>
                  The University has reorganised its academic structure catering to the requirement of National Educational Policy (NEP)-2020. The curriculum and courses designed for the programmes of the University probe the talents of the students and hone them for perfection in their chosen fields with the skilful and ever encouraging expertise of the teaching community on the campus. Our faculty members have been able to publish good quality research work in high impact factor journals of repute. There is an active interaction between faculty and students in the campus. The learning experiences in the campus pave a strong path for enhancement of overall development of the learners.
                </p>
                <p>
                  The university has been imparting quality education through outcome and value based education system, supported by competent and learned faculty members who regularly update their knowledge through participating in national and international conferences, seminars and workshops. The faculty members have also raised the standards of teaching and research through incorporating MOOC courses, chiefly NPTEL & SWAYAM in their routine classroom teaching. This is easier than done that the university has witnessed a huge number of publications in the SCI and high impact factor journals. The University is doing commendable work in scientific research as visible from the citations per paper through SCOPUS and Web of Science. University receives good research funding from several funding agencies in the country and abroad. University has strong global linkages, world-class research and, most importantly, an educational portfolio that blends the best of campus and digital delivery into a highly supportive and personalised student experience.
                </p>
                <p>
                  Success in our efforts requires fostering interdisciplinary collaborations, and creating impactful innovation to benefit society. As a publicly funded institution, SVU has an obligation to play an important role in helping to address national and regional priorities. As an internationally acclaimed university, SVU has an opportunity and a platform, and indeed a responsibility, to help address global challenges. In this effort, SVU’s unique strengths will serve as catalysts for discoveries, discussions and discourse that seamlessly span a wide spectrum of disciplines including Engineering, Natural and Physical sciences, Humanities, Arts, Social sciences, Business Administration and Pharmacy.
                </p>
                <p>
                  We are now implementing our new initiatives and looking to the future with a great deal of excitement and optimism. Society is changing rapidly in many ways which will have a profound impact on the role of University. In this ever changing world, knowledge will remain a key resource around the globe. The horizons of professional activities are expanding and hence today there is a greater scope for the students to present their talents and achievements. Since technical education in our country has become quite dynamic and competitive, we have to be ready and equipped with the required abilities and capacities to acquire the latest knowledge through newer technology.
                </p>
                <p>
                  I am confident that Sri Venkateswara University will reach greater heights of excellence Nationally and Internationally in the days to come and attract more students from other parts of the World and will produce excellent scientists, technocrats, visionary leaders, competent researchers and teachers in the fields of science, engineering, humanities, management and social sciences who will not only bring laurels to the university but also make the Nation Proud.
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

        {/* University At a Glance Section */}
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
