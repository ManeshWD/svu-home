"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ChevronRight,
  CloudSun,
  Dna,
  Compass,
  Code,
  Scroll,
  Landmark,
  Laptop,
  BookOpen,
  Settings,
  Rocket,
  Satellite,
  Search,
  Hammer,
  FileText,
  Download,
  Building2,
  ArrowRight
} from "lucide-react";
import Header from "@/components/InnerHeader";
import Footer from "@/components/InnerFooter";

// All 13 centers definition for the tab bar navigation
const centersTabs = [
  { slug: "acas", label: "Advanced Centre for Atmospheric Sciences", icon: CloudSun },
  { slug: "bif", label: "Bioinformatics Infrastructure Facility (BIF)", icon: Dna },
  { slug: "cseaps", label: "CSEAP Studies", icon: Compass },
  { slug: "computer", label: "Computer Centre", icon: Code },
  { slug: "cerdat", label: "CERDAT", icon: Scroll },
  { slug: "doa", label: "DOA", icon: Landmark },
  { slug: "distance", label: "Centre for Distance and Online Education", icon: Laptop },
  { slug: "dst-purse", label: "DST PURSE Centre", icon: BookOpen },
  { slug: "mmttc", label: "MMTTC Centre", icon: Settings },
  { slug: "incubation", label: "Incubation Centre", icon: Rocket },
  { slug: "mst-radar", label: "MST Radar Centre", icon: Satellite },
  { slug: "ori", label: "ORI Centre", icon: Search },
  { slug: "usi", label: "USI Centre", icon: Hammer },
];

// Database for all 13 centers containing their respective premium text, images, and documents
const centersDatabase: Record<string, {
  breadcrumbName: string;
  title: string;
  image: string;
  aboutTitle: string;
  aboutParagraphs: string[];
  leftCardContent: string[];
  pdfMessage: string;
  pdfLink: string;
}> = {
  "cseaps": {
    breadcrumbName: "Centre for Southeast Asian & Pacific Studies",
    title: "Centre for Southeast Asian & Pacific Studies (CSEAPS)",
    image: "/research.avif",
    aboutTitle: "About the Centre",
    aboutParagraphs: [
      "The Centre for Southeast Asian and Pacific Studies (CSEAPS), funded by the University Grants Commission (UGC) under Area Studies Programme, was established in 1976, under the guidance of Prof. V.M. Reddi in Sri Venkateswara University, Tirupati. Subsequently, the Centre became an independent Department in 1990.",
      "Apart from Southeast Asian studies, the Centre's zone of study and research was widened enough to include the South Pacific with a focus on Australia, New Zealand and Fiji. It is a multidisciplinary research Centre representing five disciplines: Anthropology, Economics, Geography, History and Political Science.",
      "CSEAPS has been promoting research on the political, economic, social and strategic aspects of the Area under study."
    ],
    leftCardContent: [
      "The CSEAPS is offering M.A. (Southeast Asian and Pacific Studies); M.A. Tourism and Ph.D. Programme. So far, 16 Ph.D.s and 12 M.Phil. degrees are awarded and ten students are currently doing research. The Centre has organized 14 International Conferences/Seminars. The Centre/Faculty has published 40 books and more than 200 research papers.",
      "The Centre also has collaboration and Memorandum of Understanding with the Centre for Indian Studies, and Centre for Vietnam Institute for Indian and Southwest Asian Studies, Hanoi, Vietnam; Indian Council of World Affairs (ICWA), New Delhi; the Allahabad State University, Allahabad, for exchange of publications, students, research scholars, organizing conferences, visiting faculty and other academic activities.",
      "The Centre also won appreciation and qualified itself for receiving the maximum assistance of Rs.60 lakhs, earmarked for Level-I Area Studies Centre, from the UGC."
    ],
    pdfMessage: "For more details about the Centre, programmes, activities and achievements.",
    pdfLink: "/SVU_Broucher.pdf"
  },
  "acas": {
    breadcrumbName: "Advanced Centre for Atmospheric Sciences",
    title: "Advanced Centre for Atmospheric Sciences (ACAS)",
    image: "/academics.avif",
    aboutTitle: "About the Centre",
    aboutParagraphs: [
      "The Advanced Centre for Atmospheric Sciences at Sri Venkateswara University is a pioneering institution dedicated to the study of meteorological phenomena, climate modeling, and atmospheric dynamics. The center collaborates closely with ISRO and the Department of Space to conduct cutting-edge research in climate change and weather forecasting.",
      "Equipped with state-of-the-art computational laboratories, satellite data receiving stations, and environmental monitoring systems, the center plays a key role in regional climate studies and monsoon prediction models.",
      "Our research team consists of distinguished atmospheric scientists, physicists, and environmental engineers working on projects of national and international significance."
    ],
    leftCardContent: [
      "ACAS offers Ph.D. programmes and specialized training courses in Atmospheric Sciences and Climate Modelling. The center has executed numerous research projects funded by DST, ISRO, and UGC. Over 50 research articles have been published in high-impact international journals.",
      "The center provides consulting services in weather risk assessment, air pollution monitoring, and agricultural planning. It also operates a regional meteorological observatory contributing data to national grids."
    ],
    pdfMessage: "For more details about ACAS, scientific publications, and ongoing research projects.",
    pdfLink: "/SVU_Broucher.pdf"
  },
  "bif": {
    breadcrumbName: "Bioinformatics Infrastructure Facility",
    title: "Bioinformatics Infrastructure Facility (BIF)",
    image: "/research.avif",
    aboutTitle: "About the Centre",
    aboutParagraphs: [
      "The Bioinformatics Infrastructure Facility (BIF) at Sri Venkateswara University was established with support from the Department of Biotechnology (DBT), Government of India. The facility serves as a vital resource hub for computational biology, structural bioinformatics, and genomics research.",
      "BIF is equipped with high-performance computing systems, specialized bioinformatics software, and database servers. It provides computational support and training to researchers in biotechnology, biochemistry, botany, and zoology.",
      "The center hosts regular workshops and training programs for students and faculty to keep pace with rapid developments in genomics, proteomics, and drug design."
    ],
    leftCardContent: [
      "The facility offers training, internships, and dissertation opportunities in computational biology. Researchers at BIF have developed several novel algorithms for protein structure prediction and molecular docking studies.",
      "BIF maintains database repositories for regional medicinal flora and provides molecular modeling consultancy to pharmaceutical companies. It has facilitated over 100 doctoral research projects across life science departments."
    ],
    pdfMessage: "For more details about BIF databases, workshops, and computational resources.",
    pdfLink: "/SVU_Broucher.pdf"
  },
  "computer": {
    breadcrumbName: "Computer Centre",
    title: "University Computer Centre",
    image: "/academics.avif",
    aboutTitle: "About the Centre",
    aboutParagraphs: [
      "The University Computer Centre is the central computing resource for Sri Venkateswara University, providing digital infrastructure, internet connectivity, and computing facilities to the entire campus community.",
      "Established to foster digital education and support research, the Computer Centre manages the campus-wide high-speed fiber-optic network, Wi-Fi zones, and centralized server rooms hosting e-learning and administrative applications.",
      "It conducts digital literacy programmes, handles online examinations, and supports departments in statistical data analysis and scientific computing."
    ],
    leftCardContent: [
      "The Computer Centre features 200+ high-end workstations, advanced statistical software packages (SPSS, MATLAB), and hosting servers. It supports the university's e-governance systems and online student admission portals.",
      "Regular workshops on Data Science, Cyber Security, and Cloud Computing are hosted here for students of all constituent colleges. The center also provides technical support for national level online examinations conducted on campus."
    ],
    pdfMessage: "For more details about campus IT services, network access guidelines, and computing schedules.",
    pdfLink: "/SVU_Broucher.pdf"
  },
  "cerdat": {
    breadcrumbName: "CERDAT",
    title: "Centre for Evaluation and Research on Digital Learning Technologies (CERDAT)",
    image: "/research.avif",
    aboutTitle: "About the Centre",
    aboutParagraphs: [
      "The Centre for Evaluation and Research on Digital Learning Technologies (CERDAT) is a specialized unit focused on the development, evaluation, and implementation of digital pedagogy and e-learning systems in higher education.",
      "CERDAT conducts research on digital learning behavior, creates interactive multimedia learning content, and designs evaluation frameworks to measure the effectiveness of online education methodologies.",
      "The center works closely with academic departments to digitize course curricula and train educators in using modern Learning Management Systems (LMS) and virtual classrooms."
    ],
    leftCardContent: [
      "CERDAT has produced over 500 hours of high-quality e-content and educational videos. It collaborates with national portals like SWAYAM and NPTEL to host university course materials.",
      "The center conducts certificate courses in Instructional Design, E-Learning Content Development, and Digital Assessment. It also undertakes research projects funded by central agencies to study the impact of digital education in rural areas."
    ],
    pdfMessage: "For more details about digital courses, e-content development, and e-learning resources.",
    pdfLink: "/SVU_Broucher.pdf"
  },
  "doa": {
    breadcrumbName: "Directorate of Admissions",
    title: "Directorate of Admissions (DOA)",
    image: "/admissions.webp",
    aboutTitle: "About the Centre",
    aboutParagraphs: [
      "The Directorate of Admissions (DOA) is the central administrative body responsible for planning, organizing, and executing the admission process for all postgraduate and research programmes offered by Sri Venkateswara University.",
      "Established to ensure transparency, efficiency, and merit-based enrollment, DOA handles application processing, entrance examinations, counseling sessions, and student registration for constituent and affiliated colleges.",
      "By implementing digital admission portals and online counseling, DOA has streamlined the application experience for thousands of aspiring students each academic year."
    ],
    leftCardContent: [
      "DOA conducts the SVUCET entrance exam annually for admission into 60+ postgraduate courses. The directorate is fully automated, providing real-time allotment status, fee payment gateways, and document verification services.",
      "The office handles reservation policies as per government norms and operates dedicated helpdesks during the admission season. It serves as the single window for all student intake queries at SVU."
    ],
    pdfMessage: "For more details about PG & Research admission notifications, fee structures, and guidelines.",
    pdfLink: "/SVU_Broucher.pdf"
  },
  "distance": {
    breadcrumbName: "Centre for Distance and Online Education",
    title: "Centre for Distance and Online Education (CDOE)",
    image: "/academics.avif",
    aboutTitle: "About the Centre",
    aboutParagraphs: [
      "The Centre for Distance and Online Education (CDOE) at Sri Venkateswara University is dedicated to making higher education accessible to diverse learners who cannot pursue traditional full-time classroom courses.",
      "Approved by the Distance Education Bureau (DEB) and UGC, CDOE offers a wide range of undergraduate, postgraduate, and diploma programmes in humanities, commerce, sciences, and management with flexible study options.",
      "CDOE leverages digital platforms, print materials, and weekend contact sessions to deliver high-quality, learner-centric instruction to students across the region."
    ],
    leftCardContent: [
      "CDOE offers over 30 academic programmes with an annual enrollment exceeding 5,000 students. The center features online learning portals, self-learning study materials, and interactive support groups.",
      "Examinations are held at multiple designated centers with strict monitoring. CDOE degrees are recognized at par with regular university degrees for employment and higher studies, enabling working professionals to advance their careers."
    ],
    pdfMessage: "For more details about distance programs, eligibility criteria, and admission prospectus.",
    pdfLink: "/SVU_Broucher.pdf"
  },
  "dst-purse": {
    breadcrumbName: "DST PURSE Centre",
    title: "DST-PURSE Research Centre",
    image: "/research.avif",
    aboutTitle: "About the Centre",
    aboutParagraphs: [
      "The DST-PURSE (Promotion of University Research and Scientific Excellence) Centre was established under the prestigious program sponsored by the Department of Science and Technology, Government of India, recognizing SVU's high-performing research footprint.",
      "The centre acts as a centralized instrumentation facility, housing advanced scientific equipment that is accessible to researchers across all science and engineering departments.",
      "By providing access to world-class characterization and analytical tools, the centre facilitates interdisciplinary research, industrial collaborations, and high-impact scientific publications."
    ],
    leftCardContent: [
      "The centre houses high-value equipment like Transmission Electron Microscope (TEM), powder XRD, HPLC, and gas chromatographs. It is used by over 300 research scholars annually for material analysis.",
      "DST-PURSE has funded several interdisciplinary projects in nanotechnology, advanced materials, and environmental chemistry, contributing to over 400 scientific papers in indexed journals."
    ],
    pdfMessage: "For more details about scientific equipment list, booking schedules, and user charges.",
    pdfLink: "/SVU_Broucher.pdf"
  },
  "mmttc": {
    breadcrumbName: "MMTTC Centre",
    title: "Malaviya Mission Teacher Training Centre (MMTTC)",
    image: "/academics.avif",
    aboutTitle: "About the Centre",
    aboutParagraphs: [
      "The Malaviya Mission Teacher Training Centre (MMTTC), formerly known as UGC-HRDC (Human Resource Development Centre), is a premier unit at SVU established to train and orient college and university teachers.",
      "Aligned with the National Education Policy (NEP) guidelines, the centre conducts orientation programmes, refresher courses, short-term courses, and workshops to upgrade the pedagogical and research skills of higher education faculty.",
      "Through interactive sessions led by national experts, MMTTC empowers teachers to adopt ICT tools, modern research methodologies, and multidisciplinary teaching styles."
    ],
    leftCardContent: [
      "MMTTC trains over 1,000 teachers annually from various states. The center is equipped with a digital seminar hall, guest house, and a specialized reference library.",
      "The programs focus on active learning strategies, outcome-based education, and research ethical standards. MMTTC is recognized as a key regional hub for teacher professional development by the UGC."
    ],
    pdfMessage: "For more details about upcoming training schedules, faculty application forms, and reports.",
    pdfLink: "/SVU_Broucher.pdf"
  },
  "incubation": {
    breadcrumbName: "Incubation Centre",
    title: "University Innovation & Incubation Centre",
    image: "/research.avif",
    aboutTitle: "About the Centre",
    aboutParagraphs: [
      "The University Innovation & Incubation Centre at Sri Venkateswara University is a vibrant startup ecosystem designed to nurture student entrepreneurship, technological innovation, and early-stage business ventures.",
      "The centre provides student innovators with co-working spaces, mentoring, seed funding access, legal support for patent filing, and business model development guidance.",
      "By bridging the gap between academic research and commercial viability, the Incubation Centre fosters a culture of innovation, turning creative ideas into successful market enterprises."
    ],
    leftCardContent: [
      "The centre has incubated 15+ student startups in fields like EdTech, AgTech, and clean energy. It offers state-of-the-art 3D printing labs, IoT prototyping benches, and software resources.",
      "Regular hackathons, startup bootcamps, and pitching events are organized in collaboration with industry partners and venture capitalists. The center has also successfully helped file 10+ student patents."
    ],
    pdfMessage: "For more details about incubation application guidelines, mentoring network, and facilities.",
    pdfLink: "/SVU_Broucher.pdf"
  },
  "mst-radar": {
    breadcrumbName: "MST Radar Centre",
    title: "National UGC-SVU Centre for MST Radar Applications",
    image: "/research.avif",
    aboutTitle: "About the Centre",
    aboutParagraphs: [
      "The National UGC-SVU Centre for MST (Mesosphere-Stratosphere-Troposphere) Radar Applications is a prestigious center of excellence established by the UGC to promote scientific research using the Indian MST Radar facility near Tirupati.",
      "The centre carries out advanced atmospheric research in tropospheric dynamics, wind profiling, ionospheric irregularities, and satellite data validation.",
      "It operates as a national facility, supporting research scholars and scientists from various Indian universities and research organizations in conducting radar-based atmospheric experiments."
    ],
    leftCardContent: [
      "The centre is recognized under UGC-CPEPA (Centre with Potential for Excellence in a Particular Area) and UGC-CAS (Centre for Advanced Study). It has collaborated extensively with NARL (National Atmospheric Research Laboratory).",
      "Researchers at the centre have published over 250 papers in reputable international journals. The centre hosts national symposia on radar meteorology and provides hands-on radar signal processing training."
    ],
    pdfMessage: "For more details about radar experiments, research publications, and collaboration forms.",
    pdfLink: "/SVU_Broucher.pdf"
  },
  "ori": {
    breadcrumbName: "ORI Centre",
    title: "Oriental Research Institute (ORI)",
    image: "/academics.avif",
    aboutTitle: "About the Centre",
    aboutParagraphs: [
      "The Oriental Research Institute (ORI) is a world-renowned manuscript conservation and research library established in 1939. It is dedicated to the preservation, cataloging, and publication of ancient Sanskrit, Telugu, and Tamil palm-leaf and paper manuscripts.",
      "Housing a rare collection of over 30,000 manuscripts covering diverse subjects like Philosophy, Vedas, Ayurveda, Astrology, and Sanskrit Literature, ORI serves as an invaluable resource for Indological research.",
      "The institute utilizes modern digitization technologies to preserve these ancient heritage materials, making them accessible to scholars worldwide."
    ],
    leftCardContent: [
      "ORI has published more than 200 critical editions of rare Sanskrit and Telugu classics. The library is fully digitized with high-resolution scans of over 10,000 palm-leaf manuscripts.",
      "It conducts post-graduate diploma courses in Manuscriptology and Palaeography. Scholars from global universities visit ORI for comparative study of ancient Indian philosophical and scientific systems."
    ],
    pdfMessage: "For more details about manuscript catalogs, publications, and digital library access.",
    pdfLink: "/SVU_Broucher.pdf"
  },
  "usi": {
    breadcrumbName: "USI Centre",
    title: "University Scientific Instrumentation Centre (USIC)",
    image: "/research.avif",
    aboutTitle: "About the Centre",
    aboutParagraphs: [
      "The University Scientific Instrumentation Centre (USIC) is a central service department that supports academic laboratories through the maintenance, repair, and calibration of analytical and scientific instruments.",
      "USIC also houses mechanical, electrical, and electronic design workshops that assist research scholars in fabricating custom experimental setups, glass apparatuses, and electronic testing circuits.",
      "Through its technical staff, USIC provides training on the safe handling and operation of complex laboratory instruments to students and lab technicians."
    ],
    leftCardContent: [
      "USIC features specialized glassblowing, machining, and electronic repair workshops. It maintains the analytical equipment of chemistry, physics, and life science labs across campus.",
      "The centre conducts training programmes in instrument troubleshooting and analytical laboratory safety. It also assists departments in drafting specifications for new instrument procurement."
    ],
    pdfMessage: "For more details about fabrication services, instrumentation workshops, and request forms.",
    pdfLink: "/SVU_Broucher.pdf"
  }
};

function CentersPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Selected tab based on search query parameter (?tab=slug), defaults to "cseaps"
  const activeTab = searchParams.get("tab") || "cseaps";

  // Fallback to cseaps if tab slug doesn't exist in the database
  const activeCenter = useMemo(() => {
    return centersDatabase[activeTab] || centersDatabase["cseaps"];
  }, [activeTab]);

  const handleTabChange = (slug: string) => {
    router.push(`/centers?tab=${slug}`, { scroll: false });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fafaf9] text-slate-800 font-sans select-none">
      <Header />

      {/* Hero Banner Section with Parallax Building Background */}
      <section
        className="relative w-full py-16 md:py-24 text-white bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url('${activeCenter.image}')` }}
      >
        {/* Dark overlay for text contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center h-full">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300 mb-6 tracking-wide">
            <a href="/" className="hover:text-[#faa61a] transition-colors">Home</a>
            <ChevronRight className="w-3.5 h-3.5 text-[#faa61a]" />
            <span className="text-slate-400">Centers</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#faa61a]" />
            <span className="text-[#faa61a] font-bold">{activeCenter.breadcrumbName}</span>
          </div>

          {/* Center Title and Underline */}
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4 max-w-4xl text-balance">
            {activeCenter.title}
          </h1>
          <div className="w-20 h-1 bg-[#faa61a] my-2 rounded-full" />
        </div>
      </section>

      {/* Overlapping Horizontal Tab Bar (Double Row / Grid Layout matching design screenshot) */}
      <div className="max-w-7xl w-full mx-auto px-4 md:px-6 z-30 -mt-10 mb-10">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-3 md:p-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 md:gap-3 text-center">
            {centersTabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.slug;
              return (
                <button
                  key={tab.slug}
                  onClick={() => handleTabChange(tab.slug)}
                  className={`flex items-center justify-center gap-2 p-3 text-[11px] md:text-xs font-extrabold transition-all duration-300 cursor-pointer rounded-xl border ${
                    isActive
                      ? "bg-amber-50 border-amber-300 text-[#002147] shadow-sm font-black"
                      : "border-slate-100 hover:border-slate-300 bg-white text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <TabIcon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#faa61a]" : "text-slate-400"}`} />
                  <span className="truncate text-left leading-tight">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Details and Document Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-12 pb-16">
        {/* About Column Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: Center Image */}
          <div className="lg:col-span-5">
            <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white">
              <img
                src={activeCenter.image}
                alt={`${activeCenter.breadcrumbName} Building`}
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>

          {/* Right Column: About Content */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-[#002147] tracking-tight flex flex-col gap-1 inline-block">
                <span>{activeCenter.aboutTitle}</span>
                <span className="w-12 h-1 bg-[#faa61a] rounded-full mt-1.5" />
              </h2>
            </div>
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed font-semibold">
              {activeCenter.aboutParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Double Card Bottom Grid (Details and PDF Download) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Left Card: Detailed Narratives / Highlights */}
          <div className="md:col-span-8 bg-[#fdfdfb] border border-slate-200/80 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-5 items-start shadow-sm">
            <div className="bg-[#faa61a]/10 p-3 rounded-full border border-[#faa61a]/30 text-[#faa61a] shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div className="space-y-4 text-xs md:text-sm text-slate-650 leading-relaxed font-medium">
              {activeCenter.leftCardContent.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
          </div>

          {/* Right Card: Quick Download PDF Action */}
          <div className="md:col-span-4 bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 flex flex-col justify-between items-center text-center shadow-sm relative overflow-hidden">
            <div className="my-auto space-y-5">
              <div className="bg-[#faa61a]/10 p-4 rounded-full border border-[#faa61a]/30 text-[#faa61a] inline-flex items-center justify-center mx-auto mb-2">
                <Download className="w-8 h-8 animate-bounce" />
              </div>
              <p className="text-xs md:text-sm text-slate-600 font-bold max-w-xs leading-relaxed">
                {activeCenter.pdfMessage}
              </p>
            </div>
            
            <a
              href={activeCenter.pdfLink}
              download
              className="w-full mt-6 bg-[#faa61a] hover:bg-[#e09110] text-[#002147] py-3.5 px-6 rounded-xl text-xs md:text-sm font-black shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Download PDF</span>
              <Download className="w-4 h-4 text-[#002147] group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function CentersPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-[#fafaf9]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#faa61a]"></div>
      </div>
    }>
      <CentersPageContent />
    </Suspense>
  );
}
