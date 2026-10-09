// Placeholder events — replace with the university's real calendar.
// The homepage shows the `featured` ones; /events lists them all.

export type EventCategory = "Placements" | "Academic" | "Sports" | "Cultural" | "Alumni" | "Convocation";

export interface UniversityEvent {
  slug: string;
  /** ISO date (YYYY-MM-DD) */
  date: string;
  time: string;
  title: string;
  description: string;
  venue: string;
  category: EventCategory;
  featured?: boolean;
}

export const categoryColor: Record<EventCategory, string> = {
  Placements: "#1F45D6",
  Academic: "#D23F12",
  Sports: "#0E8050",
  Cultural: "#B4237A",
  Alumni: "#1F45D6",
  Convocation: "#B07A00",
};

export const events: UniversityEvent[] = [
  {
    slug: "placement-drive-2026",
    date: "2026-11-14",
    time: "9:30 AM – 5:00 PM",
    title: "Campus Placement Drive 2026",
    description: "Recruiters from IT, core engineering and finance interview final-year students on campus.",
    venue: "Placement Cell, Administrative Block",
    category: "Placements",
    featured: true,
  },
  {
    slug: "national-science-symposium",
    date: "2026-11-28",
    time: "10:00 AM – 4:30 PM",
    title: "National Science Symposium",
    description: "Research talks, poster sessions and lab tours across the College of Sciences.",
    venue: "Srinivasa Auditorium",
    category: "Academic",
    featured: true,
  },
  {
    slug: "annual-sports-meet",
    date: "2026-12-06",
    time: "7:00 AM onwards",
    title: "Annual Sports Meet",
    description: "Three days of athletics, cricket and kabaddi at the university grounds.",
    venue: "SVU Stadium",
    category: "Sports",
    featured: true,
  },
  {
    slug: "alumni-career-connect",
    date: "2026-12-19",
    time: "11:00 AM – 2:00 PM",
    title: "Alumni Career Connect",
    description: "Alumni mentors share career paths and open referrals for current students.",
    venue: "Senate Hall",
    category: "Alumni",
    featured: true,
  },
  {
    slug: "convocation-2027",
    date: "2027-01-24",
    time: "10:30 AM",
    title: "65th Annual Convocation",
    description: "Degrees, gold medals and doctoral awards conferred by the Hon'ble Chancellor.",
    venue: "Srinivasa Auditorium",
    category: "Convocation",
  },
  {
    slug: "tarangini-youth-festival-2027",
    date: "2027-02-12",
    time: "5:00 PM onwards",
    title: "Tarangini Youth Festival",
    description: "Inter-collegiate dance, music, drama and fine-arts competitions over three evenings.",
    venue: "Open Air Theatre",
    category: "Cultural",
  },
  {
    slug: "foundation-day-2026",
    date: "2026-09-08",
    time: "10:00 AM",
    title: "University Foundation Day",
    description: "Celebrating 72 years of SVU with the Foundation Day lecture and merit awards.",
    venue: "Senate Hall",
    category: "Academic",
  },
  {
    slug: "swarotsav-2026",
    date: "2026-08-22",
    time: "6:00 PM",
    title: "Swarotsav Live Concert",
    description: "Classical and folk ensembles from the Department of Music and Fine Arts.",
    venue: "Open Air Theatre",
    category: "Cultural",
  },
  {
    slug: "inter-collegiate-cricket-2026",
    date: "2026-07-18",
    time: "8:00 AM",
    title: "Inter-Collegiate Cricket Championship",
    description: "Teams from all five constituent colleges compete for the Vice-Chancellor's Trophy.",
    venue: "SVU Cricket Ground",
    category: "Sports",
  },
  {
    slug: "industry-connect-2026",
    date: "2026-06-10",
    time: "10:00 AM – 1:00 PM",
    title: "Industry Connect Summit",
    description: "Panel discussions with HR leaders on internships and the 2026 hiring outlook.",
    venue: "College of Engineering Seminar Hall",
    category: "Placements",
  },
  {
    slug: "research-scholars-day-2026",
    date: "2026-03-21",
    time: "9:30 AM",
    title: "Research Scholars' Day",
    description: "Ph.D. scholars present their work; best-thesis awards across all faculties.",
    venue: "DST-PURSE Centre",
    category: "Academic",
  },
  {
    slug: "convocation-2026",
    date: "2026-01-27",
    time: "10:30 AM",
    title: "64th Annual Convocation",
    description: "Over 3,000 graduates received degrees; 112 gold medals awarded.",
    venue: "Srinivasa Auditorium",
    category: "Convocation",
  },
  {
    slug: "global-alumni-meet-2025",
    date: "2025-12-20",
    time: "4:00 PM",
    title: "Global Alumni Meet 2025",
    description: "Alumni from 18 countries returned to campus for a day of talks and reunions.",
    venue: "Senate Hall",
    category: "Alumni",
  },
  {
    slug: "tarangini-2025",
    date: "2025-02-14",
    time: "5:00 PM onwards",
    title: "Tarangini Youth Festival 2025",
    description: "Over 1,200 students took part in 30 cultural events across three evenings.",
    venue: "Open Air Theatre",
    category: "Cultural",
  },
];

export const featuredEvents = events.filter((e) => e.featured);
