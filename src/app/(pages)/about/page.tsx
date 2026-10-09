"use client";

import React from "react";
import {
  GraduationCap,
  Building2,
  BookOpen,
  Award,
  ChevronRight,
  Download,
  Calendar,
  Layers,
  Globe,
  CheckCircle2,
  FileText,
  Activity,
  Briefcase,
  Users,
  Wallet,
  Coins,
  Satellite,
  Globe2,
  FlaskConical,
  Cpu,
  Leaf,
  Brain,
  Droplets,
  Flame,
  Home,
  Wifi,
  Library,
  Dumbbell,
  ShieldAlert
} from "lucide-react";
import Header from "@/components/InnerHeader";
import Footer from "@/components/InnerFooter";

export default function AboutPage() {
  
  // Stats row
  const overviewStats = [
    { value: "1954", label: "Established", icon: Calendar },
    { value: "2nd", label: "Largest University in AP", icon: Building2 },
    { value: "5", label: "Constituent Colleges", icon: Building2 },
    { value: "52", label: "Departments", icon: BookOpen },
    { value: "88", label: "Programs Offered", icon: Layers },
  ];

  // Rankings split into columns
  const rankingsCol1 = [
    { title: "QS World University Rankings Asia 2025", rank: "581-600" },
    { title: "Times Higher Education World University Rankings – 2025", rank: "1201-1500" },
    { title: "QS Asia University Rankings 2024", rank: "451-500" },
    { title: "Times Higher Education World University Rankings – 2024", rank: "1201-1500" },
    { title: "National Institute of Ranking Framework (NIRF – 2024)", rank: "87" },
    { title: "Times Higher Education Asia University Rankings 2023", rank: "401-500" },
    { title: "The Asia University Ranking -2022", rank: "351-400" },
  ];

  const rankingsCol2 = [
    { title: "QS Asia Rankings-2021", rank: "351-400" },
    { title: "NIRF University Category 2021", rank: "54" },
    { title: "THE World University Rankings-2021", rank: "801-1000" },
    { title: "The Asia University Ranking-2021", rank: "251-300" },
    { title: "THE Young University Rankings-2020", rank: "101-150" },
    { title: "QS India Rankings-2020", rank: "44" },
    { title: "Education World Rankings 2020", rank: "23" },
  ];

  // Key Research Metrics
  const researchMetrics = [
    { value: "16,321", label: "Citations (Normalized) 2014-2019", icon: Activity },
    { value: "14,891", label: "Citations 2017-2022", icon: Award },
    { value: "217 FT + 129 PT", label: "PhDs Awarded", icon: GraduationCap },
    { value: "4", label: "Patents Filed", icon: FileText },
    { value: "34", label: "Research Projects Ongoing", icon: BookOpen },
    { value: "₹53.14 Cr", label: "Total Research Funding", icon: Briefcase },
    { value: "629", label: "Consultancy Projects", icon: Users },
    { value: "₹7,66,965", label: "Money Generated through Consultancy", icon: Wallet },
    { value: "₹100 Crore", label: "RUSA Grant Component 4", icon: Coins },
  ];

  // RUSA Centers of Excellence
  const rusaCenters = [
    { title: "Nano & Micro Satellite", icon: Satellite },
    { title: "Earth & Atmospheric Sciences", icon: Globe2 },
    { title: "Material Sciences", icon: FlaskConical },
    { title: "VLP Technologies", icon: Cpu },
    { title: "Herbal Drug Development", icon: Leaf },
    { title: "Psycho & Bio Sciences", icon: Brain },
    { title: "Water Resources", icon: Droplets },
    { title: "Bio Energy", icon: Flame },
  ];

  // Facilities List
  const facilities = [
    {
      title: "Central Library",
      desc: "Digital Resources & UGC INFONET access, departmental libraries, and Shodhganga database.",
      icon: Library,
    },
    {
      title: "Hostels & Residential Facilities",
      desc: "Hostels specially earmarked for scholars and fellows, guest houses for visiting faculty.",
      icon: Home,
    },
    {
      title: "Wi-Fi Campus",
      desc: "Completely Wi-Fi connected campus with common free internet hubs near hostels and quarters.",
      icon: Wifi,
    },
    {
      title: "Modern Laboratories",
      desc: "State of the art laboratory setups, E-Classrooms, and Incubation Centres in the pipeline.",
      icon: FlaskConical,
    },
    {
      title: "Sports & Infrastructure",
      desc: "Sports complex, Gymnasium, Cultural Centre, and Air-Conditioned Auditoriums are fully active.",
      icon: Dumbbell,
    },
    {
      title: "Scholarships & Fellowships",
      desc: "State/Central Government Welfare Scholarships and research grants from UGC, CSIR, DST, etc.",
      icon: GraduationCap,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#fafbfc] text-slate-800">
      <Header />

      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-gray-100 py-3.5 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-xs font-semibold text-gray-500">
          <a href="/" className="hover:text-[#faa61a] transition-colors">Home</a>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-400">About SVU</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#002147] font-bold">About Us</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-[#faa61a] text-xs font-extrabold uppercase tracking-widest block">
                  ESTABLISHED 1954
                </span>
                <h1 className="text-3xl md:text-5xl font-black text-[#002147] tracking-tight leading-tight">
                  About<br />Sri Venkateswara University
                </h1>
              </div>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed font-medium text-justify">
                Established in 1954 in Tirupati, Sri Venkateswara University was founded to cater to the educational needs and aspirations of the Rayalaseema region of Andhra Pradesh. With over 68 years of excellence in teaching, research, extension and outreach, SVU is committed to providing quality higher education and fostering innovation for a better tomorrow.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#overview"
                  className="bg-[#002147] hover:bg-[#001730] text-white px-6 py-3 rounded-xl text-xs md:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
                >
                  <span>Explore Our Programs</span>
                  <ChevronRight className="w-4 h-4 text-[#faa61a]" />
                </a>
                <a
                  href="/SVU_Broucher.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#002147] text-[#002147] hover:bg-slate-50 px-6 py-3 rounded-xl text-xs md:text-sm font-bold transition-all duration-200 flex items-center space-x-2"
                >
                  <Download className="w-4 h-4 text-[#faa61a]" />
                  <span>Download Brochure</span>
                </a>
              </div>
            </div>

            {/* Right Image with Curvy Layout Shape */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[420px]">
                {/* curved border frames */}
                <div className="absolute inset-0 bg-[#faa61a]/10 rounded-3xl transform rotate-3 scale-95 z-0" />
                <div className="absolute inset-0 bg-[#002147]/5 rounded-3xl transform -rotate-3 scale-95 z-0" />
                
                {/* SVU Clock Tower Building */}
                <div className="relative z-10 w-full aspect-[4/3] sm:aspect-square bg-slate-100 rounded-3xl overflow-hidden border-2 border-white shadow-xl">
                  <img
                    src="/academics.avif"
                    alt="Sri Venkateswara University Campus Clock Tower"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Containers */}
      <main id="overview" className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-12 py-12 space-y-16">

        {/* Section 1: Overview and Stats */}
        <section className="space-y-8">
          <div className="space-y-1">
            <span className="text-[#faa61a] text-xs font-extrabold uppercase tracking-widest block">
              OVERVIEW
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#002147]">
              Welcome to Sri Venkateswara University (SVU)
            </h2>
            <div className="w-16 h-1 bg-[#faa61a] mt-2 rounded-full" />
          </div>

          {/* Row of 5 Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {overviewStats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm text-center space-y-2 flex flex-col justify-center items-center"
              >
                <div className="text-[#faa61a] mb-1.5 bg-[#faa61a]/5 p-2.5 rounded-full">
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="text-2xl font-black text-[#002147] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Underneath Paragraphs */}
          <div className="bg-white border border-gray-100 p-6 md:p-8 rounded-3xl shadow-sm space-y-6 text-gray-600 text-sm md:text-base leading-relaxed font-medium text-justify">
            <p>
              Sri Venkateswara University was established in 1954, in Tirupati to cater the educational needs and aspirations of people of the Rayalaseema Region of Andhra Pradesh. After completing 68 years of excellence in teaching, research, extension and outreach activities, the University is committed to cater the needs of higher education offering a full range of post-graduate programs in Arts, Sciences, Law, Management, Education, Physical Education, Engineering and Pharmacy disciplines. From a humble beginning of one College with six departments, the University has now grown into the second largest University in Andhra Pradesh having five constituent Colleges Viz. College of Arts, College of Sciences, College of Commerce, Management & Computer Science, College of Pharmacy, and College of Engineering accommodating 52 departments offering 88 programs.
            </p>
            <p>
              The University has made rapid strides in the field of higher education and research and is adjudged as one of the best Universities in the country and got <strong className="text-[#002147] font-black">ACCREDITED with ‘A+’ GRADE BY NAAC-2023</strong>.
            </p>
            <p>
              The most commonly reported advantage of studying in Sri Venkateswara University are good teachers and "positive environment". The students are not only taught but given Hands-on training and career preparation.
            </p>
          </div>
        </section>

        {/* Section 2: Rankings & Recognition */}
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-[#002147]">
              Rankings & Recognition
            </h2>
            <p className="text-xs text-gray-500 font-bold mt-1.5 uppercase tracking-wider">
              Various prestigious rankings and Academic credits of Sri Venkateswara University
            </p>
            <div className="w-16 h-1 bg-[#faa61a] mt-2 rounded-full" />
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Column 1 */}
            <div className="space-y-4">
              {rankingsCol1.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                  <div className="flex items-start space-x-3 max-w-[80%]">
                    <Award className="w-4 h-4 text-[#faa61a] shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm font-bold text-gray-700 leading-tight">{item.title}</span>
                  </div>
                  <span className="text-xs md:text-sm font-black text-[#002147] whitespace-nowrap bg-blue-50/50 border border-blue-100/50 px-2.5 py-1 rounded-lg">
                    {item.rank}
                  </span>
                </div>
              ))}
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              {rankingsCol2.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                  <div className="flex items-start space-x-3 max-w-[80%]">
                    <Award className="w-4 h-4 text-[#faa61a] shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm font-bold text-gray-700 leading-tight">{item.title}</span>
                  </div>
                  <span className="text-xs md:text-sm font-black text-[#002147] whitespace-nowrap bg-blue-50/50 border border-blue-100/50 px-2.5 py-1 rounded-lg">
                    {item.rank}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Research & Innovation */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-[#002147]">
                Research & Innovation
              </h2>
              <div className="w-16 h-1 bg-[#faa61a] mt-2 rounded-full" />
            </div>
            
            <p className="text-gray-600 text-sm md:text-base leading-relaxed font-medium text-justify">
              Sri Venkateswara University is on top in research and innovation. The University has expertise and connections to help young researchers at every stage. From the inception of the University, the faculty, students and research scholars, post-doctoral fellows have extended the boundaries of knowledge.
            </p>

            <div className="space-y-3 pt-2">
              {[
                "World-class research output with high-impact publications",
                "Strong funding from national & international agencies",
                "Active collaborations with leading institutions and industries",
                "Centers of Excellence in emerging and strategic areas"
              ].map((bullet, idx) => (
                <div key={idx} className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm font-bold text-gray-700">{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Metrics Box Column */}
          <div className="lg:col-span-7 bg-blue-50/30 border border-blue-100 p-6 md:p-8 rounded-3xl shadow-sm">
            <h3 className="text-sm font-black text-[#002147] uppercase tracking-wider mb-6 flex items-center space-x-2">
              <Activity className="w-4 h-4 text-[#faa61a]" />
              <span>Key Research Metrics</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {researchMetrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4.5 rounded-2xl border border-blue-100/50 shadow-sm space-y-2"
                >
                  <div className="text-[#faa61a] bg-[#faa61a]/5 p-2 rounded-xl inline-block">
                    <metric.icon className="w-4 h-4" />
                  </div>
                  <div className="text-base font-black text-[#002147] leading-tight">
                    {metric.value}
                  </div>
                  <div className="text-[10px] text-gray-500 font-bold leading-normal">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* Section 4: Centers of Excellence (RUSA Component 4) */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-black text-[#002147] relative inline-block">
              Centers of Excellence (RUSA Component 4)
              <div className="w-16 h-1 bg-[#faa61a] mx-auto mt-2 rounded-full" />
            </h2>
            <p className="text-xs text-gray-500 font-bold mt-2 uppercase tracking-wide max-w-xl mx-auto leading-relaxed">
              The University is selected under RUSA component 4 for Rs.100 crore, establishing state-of-the-art Research facilities.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {rusaCenters.map((center, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-100 hover:border-[#faa61a]/30 p-5 rounded-2xl shadow-sm text-center space-y-2 flex flex-col justify-center items-center group transition-colors duration-200"
              >
                <div className="text-[#faa61a] bg-[#faa61a]/5 p-2.5 rounded-xl group-hover:scale-105 transition-transform">
                  <center.icon className="w-5 h-5" />
                </div>
                <div className="text-xs font-black text-[#002147] leading-tight">
                  {center.title}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Research Text */}
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl text-justify text-gray-600 text-xs md:text-sm leading-relaxed font-semibold">
            <p className="mb-4">
              University is having a National facility UGC-SVU center for MST Radar Applications selected under Centre for Potential of Excellence in a particular area (CPEPA) by UGC, New Delhi and awarded with Centers for Advanced Study (UGC-CAS). Based on research output university was awarded DST-PURSE program.
            </p>
            <p>
              Several departments have received Special Assistance Programmes (SAP) from UGC, New Delhi FIST program from DST, New Delhi to improve infrastructural facilities. Most of the faculties are receiving research grants from various National and International funding agencies like UGC, DST, DBT, CSIR, ICMR, ICSSR, BRNS, ISRO, MNES, MoES, MoEF, DRDO and foreign institutes such as UNESCO, UK-DFID, ICRISAT, European Commission Programme ERASMUS MUNDUS. Utilizing these impressive funding, the faculty of the University have proactively interacted with Industry, Academic and Research Institutes at National and International level and entered into collaborative research agreements through MoUs (Memorandum of Understating) to conduct research work in frontier areas of National & International importance.
            </p>
          </div>
        </section>

        {/* Section 5: Facilities & Support */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-black text-[#002147] relative inline-block">
              Facilities & Support
              <div className="w-16 h-1 bg-[#faa61a] mx-auto mt-2 rounded-full" />
            </h2>
            <p className="text-xs text-gray-500 font-bold mt-2 uppercase tracking-wide max-w-xl mx-auto leading-relaxed">
              Equipping our students with comprehensive resources, housing, and financial aid systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((fac, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-100 hover:border-slate-200 p-6 rounded-2xl shadow-sm flex items-start space-x-4 group"
              >
                <div className="p-3 rounded-xl bg-blue-50 text-[#002147] shrink-0 border border-blue-100 group-hover:scale-105 transition-transform">
                  <fac.icon className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-black text-[#002147]">{fac.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    {fac.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Support and pipeline details */}
          <div className="bg-white border border-gray-100 p-6 md:p-8 rounded-3xl shadow-sm text-justify text-gray-600 text-xs md:text-sm leading-relaxed font-semibold space-y-4">
            <p>
              The students belonging to socially and economically backward communities get State and Central Government Welfare Scholarships. Fellowships and Scholarships are also offered to research students of the campus by the University and also by the UGC, CSIR, DAE, ICMR, ISRO, ICAR, ICPR, ICHR, ICSSR, DST, DRDO, SRNS and Rashtriya Sanskrit Sansthan.
            </p>
            <p>
              To further enhance the status of the University and to compete with the top Universities at National and Global level through continued development during 2019-2020, additional Buildings for E-Class Rooms, Establishment of Incubation Centres, On-line Examination System/expansion of Laboratories to meet the requirements of new Courses are on the pipeline. Besides meeting the infrastructure facilities of Office, Cultural Centre and world Class Gymnasium and Sports facilities are available. Digital Library, Wi-Fi Connectivity, Networking, Smart Campus, Air-Conditioned Auditorium, Development of Greenery and State of the modern art furniture in classrooms, faculty rooms, offices, Guest House and Auditorium are under progress.
            </p>
            <p>
              Besides strengthening the existing curriculum, new Courses are being planned under MERU program.
            </p>
          </div>
        </section>

        {/* Section 6: Brochure Download Banner */}
        <section className="bg-[#002147] text-white rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-xl border border-white/5">
          {/* background pattern */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[#faa61a]/5 -skew-x-12 z-0" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="bg-white/10 p-4 rounded-2xl border border-white/10 shrink-0">
                <FileText className="w-10 h-10 text-[#faa61a]" />
              </div>
              <div className="text-center md:text-left space-y-1.5">
                <h3 className="text-lg md:text-xl font-black">Learn more about SVU</h3>
                <p className="text-xs text-white/80 max-w-lg leading-relaxed font-semibold">
                  Explore our programs, facilities and opportunities. Download the official Sri Venkateswara University brochure (PDF).
                </p>
              </div>
            </div>

            <a
              href="/SVU_Broucher.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-slate-100 text-[#002147] px-6 py-3.5 rounded-xl text-xs md:text-sm font-black transition-all flex items-center space-x-2.5 shrink-0 shadow-lg cursor-pointer hover:scale-[1.02]"
            >
              <Download className="w-4 h-4 text-[#faa61a]" />
              <span>Download Brochure</span>
            </a>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
