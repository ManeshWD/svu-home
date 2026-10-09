import {
  Bell,
  CalendarDays,
  Crown,
  FlaskConical,
  GraduationCap,
  Images,
  Landmark,
  MapPin,
  MessageCircleQuestion,
} from "lucide-react";
import type { SearchEntry } from "@/components/ui/tubelight-navbar";

// Sections the header search can jump to — each with its own icon colour
export const siteSearchEntries: SearchEntry[] = [
  { title: "About the University", description: "History, vision & NAAC A+ accreditation", url: "#about", icon: Landmark, color: "#FFB21A", tag: "About" },
  { title: "Leadership", description: "Vice-Chancellor, Rector & Registrar messages", url: "#leadership", icon: Crown, color: "#F472B6", tag: "People" },
  { title: "Colleges", description: "Constituent colleges & programmes", url: "#colleges", icon: GraduationCap, color: "#23B5E9", tag: "Academics" },
  { title: "Notifications", description: "Circulars, exam notifications & announcements", url: "#notifications", icon: Bell, color: "#FB7185", tag: "Notices" },
  { title: "Centres & Institutes", description: "Research centres of excellence", url: "#centres", icon: FlaskConical, color: "#A78BFA", tag: "Research" },
  { title: "Events", description: "What's happening on campus", url: "#events", icon: CalendarDays, color: "#34D399", tag: "Campus" },
  { title: "Gallery", description: "Capturing SVU moments", url: "#gallery", icon: Images, color: "#FB923C", tag: "Media" },
  { title: "Admission Queries", description: "Criteria, fees, hostels & scholarships", url: "#queries", icon: MessageCircleQuestion, color: "#38BDF8", tag: "Admissions" },
  { title: "Contact", description: "Address, phone & campus location", url: "#contact", icon: MapPin, color: "#4ADE80", tag: "Visit" },
];

interface GrandchildItem {
  label: string;
  href: string;
}

interface SubMenuItem {
  label: string;
  href: string;
  subItems?: GrandchildItem[];
}

interface MegaCategoryItem {
  id: string;
  label: string;
  href: string;
  subItems: SubMenuItem[];
}

export const megaMenuCategories: MegaCategoryItem[] = [
  {
    id: "admissions",
    label: "Admissions",
    href: "#admissions",
    subItems: [
      {
        label: "Undergraduate",
        href: "#admissions",
        subItems: [
          { label: "Courses & Programmes", href: "#admissions" },
          { label: "College life & Campus", href: "#about" },
          { label: "Fees and funding", href: "#admissions" },
          { label: "Applying & Eligibility", href: "#admissions" },
        ],
      },
      {
        label: "Graduate & Master's",
        href: "#admissions",
        subItems: [
          { label: "Post-Graduate Degrees", href: "#admissions" },
          { label: "SVUCET Admissions", href: "#admissions" },
          { label: "Doctoral Research", href: "/centers" },
          { label: "Hostels & Funding", href: "#admissions" },
        ],
      },
      {
        label: "Lifelong learning & Ph.D.",
        href: "#admissions",
        subItems: [
          { label: "Distance Education (DDE)", href: "/centers?tab=distance" },
          { label: "Executive Diplomas", href: "#admissions" },
          { label: "Skill Certifications", href: "#admissions" },
        ],
      },
      {
        label: "International Admissions",
        href: "#admissions",
        subItems: [
          { label: "Global Admissions Cell", href: "#admissions" },
          { label: "Visa & Accommodation", href: "/contact" },
        ],
      },
      {
        label: "Scholarships & Financial Aid",
        href: "#admissions",
        subItems: [
          { label: "State Merit Scholarships", href: "#admissions" },
          { label: "Endowment Awards", href: "#admissions" },
        ],
      },
    ],
  },
  {
    id: "news",
    label: "News",
    href: "#news",
    subItems: [
      {
        label: "University Press Releases",
        href: "#news",
        subItems: [
          { label: "Official Statements", href: "#news" },
          { label: "Media Coverage & Articles", href: "#news" },
        ],
      },
      {
        label: "Academic Circulars & Exams",
        href: "#news",
        subItems: [
          { label: "Semester Time Tables", href: "#news" },
          { label: "Controller of Exams", href: "#news" },
          { label: "Results Portal", href: "#news" },
        ],
      },
      {
        label: "Faculty Achievements",
        href: "#news",
        subItems: [
          { label: "National Awards", href: "#news" },
          { label: "Research Publications", href: "/people/faculty" },
        ],
      },
      {
        label: "Student Spotlight & Awards",
        href: "#news",
        subItems: [
          { label: "Campus Competitions", href: "#news" },
          { label: "Placement Success Stories", href: "#career-centers" },
        ],
      },
    ],
  },
  {
    id: "research",
    label: "Research",
    href: "/centers",
    subItems: [
      {
        label: "Centres of Excellence",
        href: "/centers",
        subItems: [
          { label: "DST-PURSE Centre", href: "/centers?tab=dst-purse" },
          { label: "Bioinformatics Centre", href: "/centers?tab=bif" },
          { label: "Instrumentation Facility", href: "/centers?tab=usi" },
        ],
      },
      {
        label: "DST & DBT Funded Projects",
        href: "#centres",
        subItems: [
          { label: "Active Project Grants", href: "#centres" },
          { label: "UGC / CSIR Fellowships", href: "#centres" },
          { label: "ISRO Research Collaborations", href: "#centres" },
        ],
      },
      {
        label: "Patents & Innovations",
        href: "#centres",
        subItems: [
          { label: "SVU Incubation Centre", href: "/centers?tab=incubation" },
          { label: "Patents & Technology Transfer", href: "#centres" },
        ],
      },
      {
        label: "Doctoral Fellowships",
        href: "#centres",
        subItems: [
          { label: "Ph.D. Programmes", href: "#centres" },
          { label: "Post-Doctoral Fellowships", href: "#centres" },
        ],
      },
    ],
  },
  {
    id: "about",
    label: "About",
    href: "/about",
    subItems: [
      {
        label: "About the University",
        href: "/about",
        subItems: [
          { label: "Foundation & Vision (1954)", href: "/about" },
          { label: "Emblem & Motto Meaning", href: "/about" },
        ],
      },
      {
        label: "Chancellor & Leadership",
        href: "/administration/vice-chancellor",
        subItems: [
          { label: "Hon'ble Governor & Chancellor", href: "/about" },
          { label: "Vice-Chancellor's Desk", href: "/administration/vice-chancellor" },
          { label: "Executive Council & Senate", href: "/administration/registrar" },
        ],
      },
      {
        label: "Vision, Mission & Heritage",
        href: "/about",
        subItems: [
          { label: "70 Years of Legacy", href: "/about" },
          { label: "Strategic Plan 2030", href: "/about" },
        ],
      },
      {
        label: "Accreditation & NAAC A+",
        href: "#about",
        subItems: [
          { label: "NAAC Assessment Report", href: "#about" },
          { label: "NIRF & QS Rankings", href: "#about" },
        ],
      },
      {
        label: "Campus 1,000-Acre Tour",
        href: "/gallery",
        subItems: [
          { label: "Administrative Heritage Building", href: "/gallery" },
          { label: "Central Library", href: "/gallery" },
        ],
      },
    ],
  },
  {
    id: "events",
    label: "Events",
    href: "/events",
    subItems: [
      {
        label: "Tarangini Youth Festival",
        href: "/events",
        subItems: [
          { label: "Cultural Competitions", href: "/events" },
          { label: "Folk Dance Derbies", href: "/events" },
        ],
      },
      {
        label: "Swarotsav Live Concerts",
        href: "/events",
        subItems: [
          { label: "Vocal & Instrumental Fest", href: "/events" },
          { label: "Stage Theatre Productions", href: "/events" },
        ],
      },
      {
        label: "Inter-Collegiate Sports Derby",
        href: "/events",
        subItems: [
          { label: "Cricket Championship", href: "/events" },
          { label: "Football & Track Events", href: "/events" },
        ],
      },
      {
        label: "Annual Convocation Ceremony",
        href: "/events",
        subItems: [
          { label: "Chief Guest Addresses", href: "/events" },
          { label: "Gold Medal Roll of Honour", href: "/events" },
        ],
      },
    ],
  },
  {
    id: "colleges",
    label: "Colleges",
    href: "/colleges/arts",
    subItems: [
      {
        label: "College of Arts & Humanities",
        href: "/colleges/arts",
        subItems: [
          { label: "Languages & Literature", href: "/colleges/arts" },
          { label: "Social Sciences", href: "/colleges/arts" },
          { label: "Humanities & Philosophy", href: "/colleges/arts" },
        ],
      },
      {
        label: "College of Sciences & Labs",
        href: "/colleges/sciences",
        subItems: [
          { label: "Physical & Mathematical Sciences", href: "/colleges/sciences" },
          { label: "Chemical & Biological Sciences", href: "/colleges/sciences" },
          { label: "Computer Science & AI", href: "/colleges/sciences" },
        ],
      },
      {
        label: "College of Engineering (SVUCE)",
        href: "/colleges/engineering",
        subItems: [
          { label: "Civil, Mechanical & Electrical", href: "/colleges/engineering" },
          { label: "Computer Science Engineering", href: "/colleges/engineering" },
          { label: "Electronics & Communication", href: "/colleges/engineering" },
        ],
      },
      {
        label: "College of Commerce & Management",
        href: "/colleges/cm-cs",
        subItems: [
          { label: "Master of Business Admin (MBA)", href: "/colleges/cm-cs" },
          { label: "M.Com & Finance Studies", href: "/colleges/cm-cs" },
        ],
      },
      {
        label: "College of Pharmaceutical Sciences",
        href: "/colleges/pharmacy",
        subItems: [
          { label: "B.Pharm & M.Pharm", href: "/colleges/pharmacy" },
          { label: "Pharmaceutical Chemistry", href: "/colleges/pharmacy" },
        ],
      },
    ],
  },
  {
    id: "giving",
    label: "Giving",
    href: "/contact",
    subItems: [
      {
        label: "Global Alumni Chapters",
        href: "/contact",
        subItems: [
          { label: "US & International Chapters", href: "/contact" },
          { label: "Annual Alumni Reunion", href: "/contact" },
        ],
      },
      {
        label: "Student Scholarships & Grants",
        href: "/contact",
        subItems: [
          { label: "Merit-Cum-Means Fund", href: "/contact" },
          { label: "Women Scholars Endowment", href: "/contact" },
        ],
      },
      {
        label: "Campus Modernization Fund",
        href: "/contact",
        subItems: [
          { label: "Advanced Lab Infrastructure", href: "/contact" },
          { label: "Smart Classroom Initiative", href: "/contact" },
        ],
      },
      {
        label: "Corporate CSR Partnerships",
        href: "/contact",
        subItems: [
          { label: "Industry Research Cells", href: "/contact" },
          { label: "Placement Incubation Labs", href: "/contact" },
        ],
      },
    ],
  },
];
