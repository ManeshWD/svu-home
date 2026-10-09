"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Building2,
  Calendar,
  GraduationCap,
  Users,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Palette,
  FlaskConical,
  Settings,
  Monitor,
  Activity,
  Award,
  Mail,
  Clock,
  Phone,
  Bookmark,
  Target
} from "lucide-react";
import Header from "@/components/InnerHeader";
import Footer from "@/components/InnerFooter";

// List of all colleges to display in horizontal top tab navigation
const collegesTabs = [
  { slug: "arts", label: "COLLEGE OF ARTS", icon: Palette },
  { slug: "sciences", label: "COLLEGE OF SCIENCES", icon: FlaskConical },
  { slug: "engineering", label: "COLLEGE OF ENGINEERING", icon: Settings },
  { slug: "cm-cs", label: "COLLEGE OF CM & CS", icon: Monitor },
  { slug: "pharmacy", label: "COLLEGE OF PHARMACY", icon: Activity }
];

// Comprehensive database for all 5 colleges
const collegesDatabase: Record<string, {
  shortName: string;
  fullName: string;
  description: string;
  image: string;
  established: string;
  departmentsCount: string;
  programsCount: string;
  studentStrength: string;
  quoteText: string;
  quoteAuthor: string;
  aboutParagraphs: string[];
  vision: string;
  principal: {
    name: string;
    qualification: string;
    email: string;
    message: string;
    image: string;
  };
  vicePrincipal: {
    name: string;
    qualification: string;
    email: string;
    message: string;
    image: string;
  };
  departments: { name: string; hod: string; courses: string[] }[];
  events: { title: string; date: string; desc: string }[];
  administration: {
    officeHours: string;
    contact: string;
    staff: { name: string; role: string }[];
  };
}> = {
  "arts": {
    shortName: "College of Arts",
    fullName: "Sri Venkateswara University College of Arts",
    description: "Nurturing creativity, critical thinking, and cultural understanding through excellence in arts and humanities education.",
    image: "/college of arts.jpg",
    established: "1954",
    departmentsCount: "12+",
    programsCount: "20+",
    studentStrength: "2000+",
    quoteText: "Education in the arts is not the learning of a thing, but the training of the mind to think.",
    quoteAuthor: "- SVU Vision",
    aboutParagraphs: [
      "Founded in 1954 in the temple city of Tirupati, Sri Venkateswara University College of Arts has been a premier institution for higher learning, research, extension and consultancy. It is a constituent campus college of Sri Venkateswara University.",
      "The College is located serenely in a picturesque campus at the foot of the Seven Hills. With well-planned and aesthetically designed buildings spread in a green, clean and expansive environment, the campus is a joyous place to work and live.",
      "The college supports a wide array of fields, from classical humanities and literature to cutting-edge research in social sciences, public policy, and fine arts."
    ],
    vision: "To inculcate a sense of accountability and responsibility among the students through academics, preparing them to be the creative and ethical makers of future India.",
    principal: {
      name: "Prof. G. Padma",
      qualification: "Ph.D. in English Literature",
      email: "principal.arts@svuniversity.edu.in",
      message: "Welcome to the College of Arts. We believe in providing a holistic learning environment that fosters critical thinking, creativity, and core values. Our students are prepared to address global challenges with empathy.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop"
    },
    vicePrincipal: {
      name: "Dr. K. Srinivas",
      qualification: "Ph.D. in History & Archaeology",
      email: "vp.arts@svuniversity.edu.in",
      message: "Our goal is to support academic rigor and provide students with opportunities for research and community outreach, bridging historical knowledge with modern-day societal impact.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop"
    },
    departments: [
      { name: "Department of English", hod: "Prof. S. Vasundhara", courses: ["M.A. English", "Ph.D. in English"] },
      { name: "Department of Telugu Studies", hod: "Prof. M. Ramana", courses: ["M.A. Telugu", "Ph.D."] },
      { name: "Department of History", hod: "Dr. B. Prasad", courses: ["M.A. History", "Ph.D."] },
      { name: "Department of Economics", hod: "Prof. K. Venkateswarlu", courses: ["M.A. Economics", "Ph.D."] },
      { name: "Department of Political Science & Public Admin", hod: "Dr. A. Sudha", courses: ["M.A. Political Science", "Ph.D."] }
    ],
    events: [
      { title: "National Seminar on Literature and Society", date: "April 15, 2025", desc: "A two-day national seminar discussing the impact of post-modern literature on modern society." },
      { title: "Fine Arts Exhibition - Kaizen", date: "March 10, 2025", desc: "Annual art exhibition showcasing creative paintings and sculptures by our students." }
    ],
    administration: {
      officeHours: "10:00 AM - 5:00 PM (Monday to Saturday)",
      contact: "+91-877-2289555",
      staff: [
        { name: "Sri M. Chengalrayulu", role: "Assistant Registrar" },
        { name: "Smt. P. Vijayalakshmi", role: "Superintendent" },
        { name: "Sri T. Harinath", role: "Senior Assistant" }
      ]
    }
  },
  "sciences": {
    shortName: "College of Sciences",
    fullName: "Sri Venkateswara University College of Sciences",
    description: "Advancing scientific boundaries and cultivating research-driven innovation to solve global challenges.",
    image: "/college of science.jpg",
    established: "1954",
    departmentsCount: "18+",
    programsCount: "30+",
    studentStrength: "3500+",
    quoteText: "Science is a beautiful gift to humanity; we should not distort it.",
    quoteAuthor: "- Dr. A. P. J. Abdul Kalam",
    aboutParagraphs: [
      "The College of Sciences was established in 1954 with the objective of catering to the educational needs and scientific aspirations of the region. It offers a wide range of postgraduate and research programs in physical, chemical, mathematical, and biological sciences.",
      "With state-of-the-art laboratory facilities, national research grants, and highly experienced faculty members, the college has established itself as a premier scientific institution.",
      "The college actively collaborates with national and international research laboratories and organizations such as ISRO, DRDO, and IISc."
    ],
    vision: "To emerge as a center of scientific excellence by imparting quality education, cultivating a research temperament, and fostering innovation to address ecological and technological issues.",
    principal: {
      name: "Prof. M. Krishna",
      qualification: "Ph.D. in Physics",
      email: "principal.sciences@svuniversity.edu.in",
      message: "At the College of Sciences, we encourage students to question, explore, and innovate. Our goal is to transform theoretical science into tangible technological and medical solutions.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop"
    },
    vicePrincipal: {
      name: "Dr. T. Radhika",
      qualification: "Ph.D. in Biotechnology",
      email: "vp.sciences@svuniversity.edu.in",
      message: "We focus on creating collaborative interdisciplinary research programs that allow students to address environmental, agricultural, and biochemical issues.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop"
    },
    departments: [
      { name: "Department of Physics", hod: "Prof. R. Balaji", courses: ["M.Sc. Physics", "Ph.D. in Physics"] },
      { name: "Department of Chemistry", hod: "Dr. S. Padmavathi", courses: ["M.Sc. Organic Chemistry", "M.Sc. Analytical Chemistry", "Ph.D."] },
      { name: "Department of Mathematics", hod: "Dr. K. Venkatesan", courses: ["M.Sc. Mathematics", "M.Sc. Applied Mathematics", "Ph.D."] },
      { name: "Department of Biotechnology", hod: "Dr. M. Bhargavi", courses: ["M.Sc. Biotechnology", "Ph.D."] },
      { name: "Department of Zoology", hod: "Dr. K. Surekha", courses: ["M.Sc. Zoology", "Ph.D."] }
    ],
    events: [
      { title: "National Science Day Celebration & Expo", date: "Feb 28, 2025", desc: "Scientific model exhibition and lecture series by eminent scientists." },
      { title: "International Conference on Green Chemistry", date: "Jan 15, 2025", desc: "Symposium focusing on sustainable chemistry practices and green synthesis." }
    ],
    administration: {
      officeHours: "10:00 AM - 5:00 PM (Monday to Saturday)",
      contact: "+91-877-2289444",
      staff: [
        { name: "Sri K. Jagadeesh", role: "Assistant Registrar" },
        { name: "Smt. G. Sarada", role: "Superintendent" }
      ]
    }
  },
  "engineering": {
    shortName: "College of Engineering",
    fullName: "Sri Venkateswara University College of Engineering",
    description: "Fostering engineering skills, hands-on technological development, and leadership in design and manufacturing.",
    image: "/college of engineering.jpg",
    established: "1959",
    departmentsCount: "8+",
    programsCount: "15+",
    studentStrength: "2500+",
    quoteText: "Engineers turn dreams into reality, designing the structures and systems that power modern society.",
    quoteAuthor: "- SVUCE Legacy",
    aboutParagraphs: [
      "Established in 1959, Sri Venkateswara University College of Engineering (SVUCE) is one of the oldest and most prestigious engineering institutions in Andhra Pradesh. It offers B.Tech, M.Tech, and Ph.D. programs across various engineering disciplines.",
      "The college has a robust industry-academic relationship, leading-edge research projects funded by TEQIP, DST, and AICTE, and an exceptional placement record with top global recruiters.",
      "Our alumni hold leadership positions in global software giants, construction firms, public sectors, and top research hubs."
    ],
    vision: "To be recognized globally as a leader in engineering education and research, fostering innovation and entrepreneurship for sustainable societal growth.",
    principal: {
      name: "Prof. S. Narayana",
      qualification: "Ph.D. in Electrical Engineering",
      email: "principal.engineering@svuniversity.edu.in",
      message: "Our vision is to build next-generation engineers who can solve complex global issues. We emphasize project-based learning and state-of-the-art incubation.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop"
    },
    vicePrincipal: {
      name: "Dr. G. Ravi",
      qualification: "Ph.D. in Computer Science",
      email: "vp.engineering@svuniversity.edu.in",
      message: "We focus on aligning our curriculum with the dynamic changes of Industry 4.0, integrating AI, IoT, and Cloud Computing into all engineering streams.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop"
    },
    departments: [
      { name: "Department of Computer Science & Engineering", hod: "Dr. T. Praveen Kumar", courses: ["B.Tech CSE", "M.Tech CSE", "Ph.D."] },
      { name: "Department of Civil Engineering", hod: "Prof. P. Ramachandra", courses: ["B.Tech Civil", "M.Tech Structural Engineering", "Ph.D."] },
      { name: "Department of Electrical & Electronics Engineering", hod: "Prof. V. Prasad", courses: ["B.Tech EEE", "M.Tech Power Systems", "Ph.D."] },
      { name: "Department of Electronics & Communication Engineering", hod: "Dr. M. Sridevi", courses: ["B.Tech ECE", "M.Tech Signal Processing", "Ph.D."] },
      { name: "Department of Mechanical Engineering", hod: "Prof. K. Rajasekhar", courses: ["B.Tech Mechanical", "M.Tech Thermal Engineering", "Ph.D."] }
    ],
    events: [
      { title: "SreeVision Tech Fest", date: "September 24, 2025", desc: "National-level student technical symposium with paper presentations, hackathons, and robotics competition." },
      { title: "Workshop on AI & Robotics Application", date: "July 12, 2025", desc: "A practical hands-on workshop led by industry veterans." }
    ],
    administration: {
      officeHours: "9:30 AM - 4:30 PM (Monday to Saturday)",
      contact: "+91-877-2289333",
      staff: [
        { name: "Sri P. Obul Reddy", role: "Assistant Registrar" },
        { name: "Sri D. Ramaniah", role: "Administrative Officer" }
      ]
    }
  },
  "cm-cs": {
    shortName: "College of CM & CS",
    fullName: "Sri Venkateswara University College of Commerce, Management & Computer Science",
    description: "Combining corporate leadership with computing excellence to cultivate future-ready managers and IT professionals.",
    image: "/college of cm and cs.jpg",
    established: "1983",
    departmentsCount: "4+",
    programsCount: "10+",
    studentStrength: "1800+",
    quoteText: "Business and technology must go hand in hand to drive the digital economy of tomorrow.",
    quoteAuthor: "- SVU Commerce & IT",
    aboutParagraphs: [
      "The College of Commerce, Management & Computer Science was established in 1983 to meet the growing corporate and computational requirements of the nation. It provides specialized training in management, finance, computer applications, and systems analysis.",
      "The college features high-end computer laboratories, a mock stock-exchange trading floor, and smart seminars. It places high value on case-study methodology, corporate internships, and business consulting.",
      "Students actively engage in campus startups and enterprise incubators inside the college building."
    ],
    vision: "To nurture highly ethical corporate managers, financial analysts, and software engineers who possess analytical capabilities and a global business perspective.",
    principal: {
      name: "Prof. V. Ramanadham",
      qualification: "Ph.D. in Commerce & Management",
      email: "principal.cmcs@svuniversity.edu.in",
      message: "Our academic pedagogy is structured around bridging corporate theory with digital execution. We prepare students to lead financial and digital transformations.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop"
    },
    vicePrincipal: {
      name: "Dr. C. Arundhathi",
      qualification: "Ph.D. in Computer Applications",
      email: "vp.cmcs@svuniversity.edu.in",
      message: "We focus on practical software development, data analytics, and database management, preparing students to be high-performing tech leads.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop"
    },
    departments: [
      { name: "Department of Business Management (MBA)", hod: "Prof. S. R. Murthy", courses: ["MBA (Regular)", "MBA (Retail)", "Ph.D."] },
      { name: "Department of Commerce (M.Com)", hod: "Dr. P. Anitha", courses: ["M.Com (Regular)", "M.Com (Financial Management)", "Ph.D."] },
      { name: "Department of Computer Science & Applications (MCA)", hod: "Dr. L. Ramachandra", courses: ["MCA", "M.Sc. Computer Science", "Ph.D."] }
    ],
    events: [
      { title: "SVU Management Meet - Prerana", date: "November 08, 2025", desc: "A national management meet testing young minds in business plans, young manager debates, and finance games." },
      { title: "Seminar on Digital Currency & BlockChain", date: "August 20, 2025", desc: "Interactive session on blockchain technologies and decentralized financial systems." }
    ],
    administration: {
      officeHours: "10:00 AM - 5:00 PM (Monday to Saturday)",
      contact: "+91-877-2289222",
      staff: [
        { name: "Sri R. Chengalrayulu", role: "Superintendent" },
        { name: "Smt. K. Lalitha", role: "Senior Assistant" }
      ]
    }
  },
  "pharmacy": {
    shortName: "College of Pharmacy",
    fullName: "Sri Venkateswara University College of Pharmaceutical Sciences",
    description: "Developing innovations in drug formulation, pharmacology research, and patient-centered pharmaceutical care.",
    image: "/college of pharmacy.jpg",
    established: "1997",
    departmentsCount: "4+",
    programsCount: "8+",
    studentStrength: "1000+",
    quoteText: "The art of healing is also the science of precision and dedication to pharmaceutical care.",
    quoteAuthor: "- Rx Care",
    aboutParagraphs: [
      "The College of Pharmaceutical Sciences was established in 1997 to deliver top-tier education in pharmacy and drug discovery. It offers B.Pharmacy, M.Pharmacy, and Ph.D. programs with a strong focus on drug design, toxicology, and clinical testing.",
      "The college is equipped with state-of-the-art analytical equipment (HPLC, UV-Spectroscopy) and specialized pharmacology simulation software.",
      "We boast continuous industry placement and research fellowships in top global pharma conglomerates."
    ],
    vision: "To be a global center of excellence in pharmaceutical education and research, producing ethical and highly competent pharmacy experts who serve humanity.",
    principal: {
      name: "Prof. P. R. Reddy",
      qualification: "Ph.D. in Pharmaceutics",
      email: "principal.pharmacy@svuniversity.edu.in",
      message: "Welcome to the College of Pharmacy. Our educational focus is to blend laboratory excellence with pharmacy practice to develop innovative therapeutics.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop"
    },
    vicePrincipal: {
      name: "Dr. K. Swetha",
      qualification: "Ph.D. in Pharmacology",
      email: "vp.pharmacy@svuniversity.edu.in",
      message: "We support students in advanced pharmacological research, drug safety screenings, and toxicological analysis.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop"
    },
    departments: [
      { name: "Department of Pharmaceutics", hod: "Prof. P. R. Reddy", courses: ["B.Pharm", "M.Pharm Pharmaceutics", "Ph.D."] },
      { name: "Department of Pharmacology", hod: "Dr. K. Swetha", courses: ["B.Pharm", "M.Pharm Pharmacology", "Ph.D."] },
      { name: "Department of Pharmaceutical Chemistry", hod: "Dr. S. Ramesh", courses: ["B.Pharm", "M.Pharm Pharmaceutical Chemistry", "Ph.D."] },
      { name: "Department of Pharmacognosy", hod: "Dr. M. Lalitha", courses: ["B.Pharm", "Ph.D."] }
    ],
    events: [
      { title: "National Pharmacy Week Summit", date: "November 18, 2025", desc: "A series of healthcare awareness drives, guest lectures, and pharmaceutical quiz competitions." },
      { title: "Symposium on Drug Delivery Systems", date: "October 05, 2025", desc: "Focusing on nano-technology applications in target drug deliveries." }
    ],
    administration: {
      officeHours: "10:00 AM - 5:00 PM (Monday to Saturday)",
      contact: "+91-877-2289111",
      staff: [
        { name: "Sri V. Mohan", role: "Superintendent" },
        { name: "Sri G. Naresh", role: "Junior Assistant" }
      ]
    }
  }
};

export default function CollegeSinglePage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) || "arts";

  // Sidebar Menu State
  const [activeSection, setActiveSection] = useState<
    "about" | "principal" | "vice-principal" | "departments" | "events" | "administration"
  >("about");

  // Mobile nav dropdown open state
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Retrieve current college data, default to arts if slug is invalid
  const college = useMemo(() => {
    return collegesDatabase[slug] || collegesDatabase["arts"];
  }, [slug]);

  // Sidebar items definition
  const sidebarItems = [
    { id: "about", label: "About", icon: Bookmark },
    { id: "principal", label: "Principal", icon: Users },
    { id: "vice-principal", label: "Vice Principal", icon: GraduationCap },
    { id: "departments", label: "Departments", icon: BookOpen },
    { id: "events", label: "Events & Achievements", icon: Award },
    { id: "administration", label: "Administration", icon: Settings }
  ] as const;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 font-sans select-none">
      <Header />

      {/* Hero Banner Section */}
      <section
        className="relative w-full h-[360px] md:h-[420px] flex items-center text-white bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url('${college.image}')` }}
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
            <span className="text-[#faa61a] font-bold">{college.shortName}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4 text-balance">
            {college.fullName}
          </h1>
          <div className="w-16 h-1 bg-[#faa61a] my-2 rounded-full" />
          <p className="text-white/85 text-xs md:text-sm max-w-2xl leading-relaxed mt-2">
            {college.description}
          </p>
        </div>
      </section>

      {/* Horizontal tab-bar for Colleges (Matching the reference design header navigation) */}
      <div className="bg-white border-y border-slate-200 sticky top-0 z-40 shadow-sm overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-6 flex justify-between md:justify-center items-center gap-1 md:gap-8 min-w-max">
          {collegesTabs.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = slug === tab.slug;
            return (
              <button
                key={tab.slug}
                onClick={() => {
                  router.push(`/colleges/${tab.slug}`);
                  setActiveSection("about");
                }}
                className={`flex items-center space-x-2 py-4 px-4 text-xs font-black tracking-wider transition-all cursor-pointer border-b-2 uppercase ${
                  isActive
                    ? "border-[#faa61a] text-[#faa61a] bg-slate-50/50"
                    : "border-transparent text-slate-600 hover:text-[#002147] hover:bg-slate-50"
                }`}
              >
                <TabIcon className={`w-4 h-4 ${isActive ? "text-[#faa61a]" : "text-slate-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Layout Grid */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-12 pt-6 pb-12 flex flex-col lg:flex-row gap-8 relative">

        {/* Left Side Bar */}
        <aside className="w-full lg:w-[300px] shrink-0 lg:sticky lg:top-20 self-start">

          {/* Mobile: custom styled dropdown */}
          <div className="lg:hidden relative mb-2 z-30">
            <span className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase mb-2 block pl-1">
              Explore this College
            </span>
            {(() => {
              const current = sidebarItems.find((i) => i.id === activeSection) ?? sidebarItems[0];
              const CurrentIcon = current.icon;
              return (
                <button
                  type="button"
                  onClick={() => setMobileNavOpen((o) => !o)}
                  className="w-full flex items-center gap-3 bg-[#002147] text-white rounded-xl px-3 py-3.5 shadow-lg shadow-[#002147]/20"
                >
                  <span className="shrink-0 grid place-items-center w-9 h-9 rounded-lg bg-[#faa61a] text-[#002147]">
                    <CurrentIcon className="w-4 h-4" />
                  </span>
                  <span className="text-sm font-bold tracking-tight">{current.label}</span>
                  <ChevronRight
                    className={`w-4 h-4 ml-auto text-[#faa61a] transition-transform duration-300 ${
                      mobileNavOpen ? "-rotate-90" : "rotate-90"
                    }`}
                  />
                </button>
              );
            })()}

            {mobileNavOpen && (
              <div className="absolute left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden animate-fade-in">
                {sidebarItems.map((item) => {
                  const isActive = activeSection === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveSection(item.id);
                        setMobileNavOpen(false);
                      }}
                      className={`w-full text-left px-3 py-3 flex items-center gap-3 border-l-2 transition-colors ${
                        isActive
                          ? "border-[#faa61a] bg-[#faa61a]/10"
                          : "border-transparent hover:bg-slate-50"
                      }`}
                    >
                      <span
                        className={`shrink-0 grid place-items-center w-8 h-8 rounded-lg ${
                          isActive ? "bg-[#faa61a] text-[#002147]" : "bg-slate-200/70 text-slate-500"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </span>
                      <span
                        className={`text-[13px] font-bold tracking-tight ${
                          isActive ? "text-[#002147]" : "text-slate-600"
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Desktop: styled vertical nav */}
          <nav className="hidden lg:flex flex-col gap-1.5">
            <span className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase mb-3 pl-1">
              Explore this College
            </span>
            {sidebarItems.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`group relative w-full text-left rounded-xl px-3 py-3 flex items-center gap-3 overflow-hidden transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#002147] shadow-lg shadow-[#002147]/20"
                      : "hover:bg-slate-100"
                  }`}
                >
                  {/* animated accent bar */}
                  <span
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full bg-[#faa61a] transition-all duration-300 ${
                      isActive ? "h-8" : "h-0 group-hover:h-4"
                    }`}
                  />
                  {/* diagonal sheen on hover */}
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                  <span
                    className={`relative shrink-0 grid place-items-center w-9 h-9 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-[#faa61a] text-[#002147] rotate-0"
                        : "bg-slate-200/70 text-slate-500 group-hover:bg-[#faa61a]/20 group-hover:text-[#faa61a] group-hover:-rotate-6"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                  <span
                    className={`relative text-[13px] font-bold tracking-tight transition-colors ${
                      isActive ? "text-white" : "text-slate-600 group-hover:text-[#002147]"
                    }`}
                  >
                    {item.label}
                  </span>
                  <ChevronRight
                    className={`relative w-4 h-4 ml-auto transition-all duration-300 ${
                      isActive
                        ? "text-[#faa61a] translate-x-0 opacity-100"
                        : "text-slate-300 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Quote — minimal, borderless accent bar */}
          <div className="mt-8 pl-5 border-l-2 border-[#faa61a]/40">
            <p className="text-slate-500 text-[13px] leading-relaxed font-medium italic">
              {college.quoteText}
            </p>
            <span className="block text-[#002147] font-black text-[10px] uppercase tracking-[0.15em] mt-3 not-italic">
              {college.quoteAuthor}
            </span>
          </div>
        </aside>

        {/* Right Content Panel */}
        <main className="flex-1 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm min-w-0">
          
          {/* ABOUT SECTION CONTENT */}
          {activeSection === "about" && (
            <div className="space-y-8 animate-fade-in">
              {/* College Main Image (Image from Public Folder) */}
              <div className="w-full aspect-[16/9] md:h-[350px] overflow-hidden rounded-2xl border border-slate-200 shadow-sm relative bg-slate-100">
                <img
                  src={college.image}
                  alt={`${college.shortName} Main Campus Building`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-101"
                />
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-amber-500/5 border border-[#faa61a]/15 rounded-2xl p-5">
                {[
                  { label: "ESTABLISHED", value: college.established, icon: Calendar },
                  { label: "DEPARTMENTS", value: college.departmentsCount, icon: GraduationCap },
                  { label: "PROGRAMS OFFERED", value: college.programsCount, icon: BookOpen },
                  { label: "STUDENT STRENGTH", value: college.studentStrength, icon: Users }
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="flex flex-col items-center justify-center p-3 text-center border-r last:border-r-0 border-slate-200/60 max-sm:border-r-0 max-sm:border-b max-sm:last:border-b-0 max-sm:pb-4">
                      <div className="bg-[#faa61a]/10 p-2 rounded-xl text-[#002147] mb-2 border border-[#faa61a]/20">
                        <Icon className="w-5 h-5 text-[#faa61a]" />
                      </div>
                      <span className="text-[9px] font-black text-slate-500 tracking-wider mb-1 uppercase">{stat.label}</span>
                      <span className="text-base font-extrabold text-[#002147]">{stat.value}</span>
                    </div>
                  );
                })}
              </div>

              {/* Description Paragraphs */}
              <div className="space-y-4">
                <h3 className="text-lg font-black text-[#002147] flex items-center space-x-2 pb-2.5 border-b border-slate-150">
                  <Bookmark className="w-5 h-5 text-[#faa61a]" />
                  <span>College Overview</span>
                </h3>
                <div className="space-y-3.5 text-xs md:text-sm text-slate-600 leading-relaxed font-semibold">
                  {college.aboutParagraphs.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Vision block */}
              <div className="bg-slate-50 border border-slate-150 rounded-2xl p-5 space-y-3">
                <h4 className="text-xs font-black text-[#002147] uppercase tracking-wider flex items-center space-x-2">
                  <Target className="w-4 h-4 text-[#faa61a]" />
                  <span>Our Vision</span>
                </h4>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-semibold">
                  {college.vision}
                </p>
              </div>
            </div>
          )}

          {/* PRINCIPAL SECTION CONTENT */}
          {activeSection === "principal" && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-lg font-black text-[#002147] flex items-center space-x-2 pb-2.5 border-b border-slate-150">
                <Users className="w-5 h-5 text-[#faa61a]" />
                <span>Message from the Principal</span>
              </h3>

              <div className="flex flex-col md:flex-row gap-6 items-start pt-3">
                <div className="w-40 h-48 rounded-xl overflow-hidden shadow-md border border-slate-200 shrink-0">
                  <img
                    src={college.principal.image}
                    alt={college.principal.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="space-y-3.5 flex-1 min-w-0">
                  <div>
                    <h4 className="text-base font-extrabold text-[#002147] leading-none mb-1.5">{college.principal.name}</h4>
                    <p className="text-xs text-slate-500 font-bold leading-none mb-2">{college.principal.qualification}</p>
                    <a
                      href={`mailto:${college.principal.email}`}
                      className="flex items-start gap-1.5 text-xs text-blue-600 hover:text-blue-800 transition-colors font-semibold max-w-full"
                    >
                      <Mail className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span className="break-all min-w-0">{college.principal.email}</span>
                    </a>
                  </div>
                  <div className="h-[1px] bg-slate-100" />
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-semibold italic border-l-4 border-[#faa61a] pl-4">
                    "{college.principal.message}"
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* VICE PRINCIPAL SECTION CONTENT */}
          {activeSection === "vice-principal" && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-lg font-black text-[#002147] flex items-center space-x-2 pb-2.5 border-b border-slate-150">
                <Users className="w-5 h-5 text-[#faa61a]" />
                <span>Message from the Vice Principal</span>
              </h3>

              <div className="flex flex-col md:flex-row gap-6 items-start pt-3">
                <div className="w-40 h-48 rounded-xl overflow-hidden shadow-md border border-slate-200 shrink-0">
                  <img
                    src={college.vicePrincipal.image}
                    alt={college.vicePrincipal.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="space-y-3.5 flex-1 min-w-0">
                  <div>
                    <h4 className="text-base font-extrabold text-[#002147] leading-none mb-1.5">{college.vicePrincipal.name}</h4>
                    <p className="text-xs text-slate-500 font-bold leading-none mb-2">{college.vicePrincipal.qualification}</p>
                    <a
                      href={`mailto:${college.vicePrincipal.email}`}
                      className="flex items-start gap-1.5 text-xs text-blue-600 hover:text-blue-800 transition-colors font-semibold max-w-full"
                    >
                      <Mail className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span className="break-all min-w-0">{college.vicePrincipal.email}</span>
                    </a>
                  </div>
                  <div className="h-[1px] bg-slate-100" />
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-semibold italic border-l-4 border-[#faa61a] pl-4">
                    "{college.vicePrincipal.message}"
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* DEPARTMENTS SECTION CONTENT */}
          {activeSection === "departments" && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-lg font-black text-[#002147] flex items-center space-x-2 pb-2.5 border-b border-slate-150">
                <GraduationCap className="w-5 h-5 text-[#faa61a]" />
                <span>Departments & Courses</span>
              </h3>

              <div className="space-y-4 pt-2">
                {college.departments.map((dept, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-150 rounded-2xl p-5 hover:shadow-md transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3 pb-2 border-b border-slate-200/60">
                      <h4 className="text-sm md:text-base font-extrabold text-[#002147]">{dept.name}</h4>
                      <span className="text-xs font-bold text-[#002147] bg-[#faa61a]/10 px-2.5 py-1 rounded-md border border-[#faa61a]/20">
                        HOD: <span className="text-[#001730] font-black">{dept.hod}</span>
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {dept.courses.map((course, i) => (
                        <span key={i} className="text-[10px] font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-lg border border-blue-100">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EVENTS & ACHIEVEMENTS SECTION CONTENT */}
          {activeSection === "events" && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-lg font-black text-[#002147] flex items-center space-x-2 pb-2.5 border-b border-slate-150">
                <Award className="w-5 h-5 text-[#faa61a]" />
                <span>Events & Academic Achievements</span>
              </h3>

              <div className="space-y-6 pt-3 relative pl-6 border-l-2 border-slate-150">
                {college.events.map((event, idx) => (
                  <div key={idx} className="relative space-y-2">
                    {/* timeline bullet */}
                    <div className="absolute left-[-31px] top-1.5 w-4 h-4 rounded-full bg-[#faa61a] border-4 border-white shadow-sm" />
                    
                    <div className="flex items-center space-x-2.5 text-xs font-bold text-[#faa61a]">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{event.date}</span>
                    </div>
                    <h4 className="text-sm md:text-base font-extrabold text-[#002147] leading-tight">{event.title}</h4>
                    <p className="text-xs md:text-sm text-slate-550 leading-relaxed font-semibold">{event.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ADMINISTRATION SECTION CONTENT */}
          {activeSection === "administration" && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-lg font-black text-[#002147] flex items-center space-x-2 pb-2.5 border-b border-slate-150">
                <Building2 className="w-5 h-5 text-[#faa61a]" />
                <span>College Administration</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3">
                <div className="space-y-4">
                  <div className="bg-slate-50 border border-slate-150 rounded-2xl p-5 space-y-3.5">
                    <h4 className="text-xs font-black text-[#002147] uppercase tracking-wider flex items-center space-x-2 border-b border-slate-200 pb-2">
                      <Clock className="w-4 h-4 text-[#faa61a]" />
                      <span>Office Details</span>
                    </h4>
                    <div className="space-y-2.5 text-xs font-bold text-slate-600">
                      <p className="flex justify-between gap-3 flex-wrap">
                        <span className="shrink-0">Office Hours:</span>
                        <span className="text-slate-800 font-extrabold text-right">{college.administration.officeHours}</span>
                      </p>
                      <p className="flex justify-between gap-3 flex-wrap">
                        <span className="shrink-0">General Inquiry:</span>
                        <a href={`tel:${college.administration.contact}`} className="text-blue-600 hover:underline flex items-center gap-1 break-all">
                          <Phone className="w-3 h-3" />
                          <span>{college.administration.contact}</span>
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-50 border border-slate-150 rounded-2xl p-5 space-y-3">
                    <h4 className="text-xs font-black text-[#002147] uppercase tracking-wider flex items-center space-x-2 border-b border-slate-200 pb-2">
                      <Users className="w-4 h-4 text-[#faa61a]" />
                      <span>Administrative Staff</span>
                    </h4>
                    <div className="space-y-2.5">
                      {college.administration.staff.map((staff, idx) => (
                        <div key={idx} className="flex justify-between gap-3 flex-wrap text-xs font-bold">
                          <span className="text-slate-850 font-extrabold">{staff.name}</span>
                          <span className="text-slate-500 text-right">{staff.role}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      <Footer />
    </div>
  );
}
