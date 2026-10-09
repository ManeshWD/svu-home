/**
 * Lightweight static search index for the whole site.
 * Add an entry here whenever a new page or notable post is created.
 */

export type SearchCategory =
  | "Page"
  | "Admissions"
  | "Academics"
  | "Research"
  | "Administration"
  | "Colleges"
  | "People"
  | "News"
  | "Notification"
  | "Gallery";

export interface SearchEntry {
  title: string;
  description: string;
  href: string;
  category: SearchCategory;
  /** Extra words to match against that aren't in the title/description. */
  keywords?: string[];
  /** ISO date for news / notifications, used for display + ordering. */
  date?: string;
}

export const SEARCH_INDEX: SearchEntry[] = [
  /* ─────────────── Core pages ─────────────── */
  {
    title: "Home",
    description:
      "Sri Venkateswara University, Tirupati — a NAAC 'A+' accredited state university established in 1954.",
    href: "/",
    category: "Page",
    keywords: ["svu", "tirupati", "university", "landing", "main"],
  },
  {
    title: "About the University",
    description:
      "History, vision, mission, leadership and the legacy of Sri Venkateswara University since 1954.",
    href: "/about",
    category: "Page",
    keywords: ["overview", "history", "legacy", "naac", "accreditation", "1954"],
  },
  {
    title: "Contact Us",
    description:
      "Address, phone numbers, email, campus map and enquiry form for Sri Venkateswara University.",
    href: "/contact",
    category: "Page",
    keywords: ["address", "phone", "email", "location", "map", "enquiry", "reach"],
  },
  {
    title: "Gallery",
    description: "Photo galleries of the campus, events, convocations and student life at SVU.",
    href: "/gallery",
    category: "Gallery",
    keywords: ["photos", "images", "pictures", "events", "campus life"],
  },
  {
    title: "Research Centers",
    description:
      "Explore the research centres, laboratories and specialised facilities across the university.",
    href: "/centers",
    category: "Research",
    keywords: ["centres", "labs", "laboratories", "facilities", "innovation"],
  },

  /* ─────────────── Administration ─────────────── */
  {
    title: "Vice-Chancellor",
    description:
      "Office of the Vice-Chancellor — message, profile and responsibilities of the university's academic head.",
    href: "/administration/vice-chancellor",
    category: "Administration",
    keywords: ["vc", "prof tata narsingarao", "leadership", "message"],
  },
  {
    title: "Rector",
    description: "Office of the Rector of Sri Venkateswara University.",
    href: "/administration/rector",
    category: "Administration",
    keywords: ["prof bhupathi naidu", "leadership"],
  },
  {
    title: "Registrar",
    description: "Office of the Registrar — administrative services, statutes and official records.",
    href: "/administration/registrar",
    category: "Administration",
    keywords: ["prof appa rao", "administration", "records"],
  },

  /* ─────────────── Colleges ─────────────── */
  {
    title: "College of Arts",
    description: "Humanities and social sciences — literature, history, languages and more.",
    href: "/colleges/arts",
    category: "Colleges",
    keywords: ["humanities", "social sciences", "literature", "history", "languages"],
  },
  {
    title: "College of Sciences",
    description: "Natural and applied sciences — physics, chemistry, mathematics and life sciences.",
    href: "/colleges/sciences",
    category: "Colleges",
    keywords: ["physics", "chemistry", "maths", "biology", "life sciences"],
  },
  {
    title: "College of Engineering",
    description:
      "Civil, mechanical, electrical and computer science engineering programmes at SVUCE.",
    href: "/colleges/engineering",
    category: "Colleges",
    keywords: ["svuce", "btech", "civil", "mechanical", "electrical", "cse", "technology"],
  },
  {
    title: "College of CM & CS",
    description: "Commerce, Management and Computer Science programmes.",
    href: "/colleges/cm-cs",
    category: "Colleges",
    keywords: ["commerce", "management", "mba", "computer science", "bca", "mca"],
  },
  {
    title: "College of Pharmacy",
    description: "Pharmaceutical sciences, drug discovery, pharmacology and patient care.",
    href: "/colleges/pharmacy",
    category: "Colleges",
    keywords: ["pharmacy", "pharma", "drugs", "pharmacology"],
  },

  /* ─────────────── People ─────────────── */
  {
    title: "Faculty Directory",
    description: "Browse the distinguished faculty of Sri Venkateswara University by department.",
    href: "/people/faculty",
    category: "People",
    keywords: ["staff", "professors", "teachers", "department", "directory"],
  },

  /* ─────────────── Academics / Admissions (informational) ─────────────── */
  {
    title: "Undergraduate Programs",
    description: "Full-time UG degree programmes across arts, science, commerce and engineering.",
    href: "/about",
    category: "Academics",
    keywords: ["ug", "bachelor", "degree", "courses", "cbcs"],
  },
  {
    title: "Postgraduate Programs",
    description: "PG degree programmes and specialisations offered by the constituent colleges.",
    href: "/about",
    category: "Academics",
    keywords: ["pg", "masters", "msc", "ma", "mcom", "specialisation"],
  },
  {
    title: "Ph.D. Programs",
    description: "Doctoral research programmes, guidance and the university's research ecosystem.",
    href: "/centers",
    category: "Academics",
    keywords: ["phd", "doctoral", "research degree", "scholar"],
  },
  {
    title: "Admissions",
    description:
      "Regular, self-finance, distance and international admissions information for SVU.",
    href: "/about",
    category: "Admissions",
    keywords: ["apply", "entrance", "eligibility", "prospectus", "how to apply", "scholarships"],
  },

  /* ─────────────── News ─────────────── */
  {
    title: "SVU Ranks Top 50 in NIRF National Rankings 2026",
    description:
      "Sri Venkateswara University has achieved a prestigious position in the NIRF rankings, showcasing excellence in research and academics.",
    href: "/",
    category: "News",
    date: "2026-06-28",
    keywords: ["nirf", "ranking", "top 50", "achievement"],
  },
  {
    title: "International Conference on Green Technology & Materials",
    description:
      "SVU hosts the 3rd International Symposium on Green Energy solutions, bringing together global scholars and researchers.",
    href: "/",
    category: "News",
    date: "2026-07-15",
    keywords: ["conference", "green technology", "symposium", "energy", "materials"],
  },
  {
    title: "Launch of Advanced AI & Data Science Research Lab",
    description:
      "A state-of-the-art research facility has been inaugurated in the Department of Computer Science, funded by DST.",
    href: "/centers",
    category: "News",
    date: "2026-08-02",
    keywords: ["ai", "artificial intelligence", "data science", "lab", "dst", "computer science"],
  },
  {
    title: "SVU Alumni Meet 2026 Registration Opens",
    description:
      "Reconnect with your alma mater and fellow classmates. Register now for the annual global alumni meet at the main campus.",
    href: "/",
    category: "News",
    date: "2026-09-25",
    keywords: ["alumni", "meet", "reunion", "registration"],
  },
  {
    title: "Sports Complex Renovation & New Olympic-size Pool",
    description:
      "The University is upgrading its sports facilities with a new indoor stadium and an Olympic-size swimming pool.",
    href: "/",
    category: "News",
    date: "2026-10-10",
    keywords: ["sports", "stadium", "swimming pool", "renovation", "facilities"],
  },

  /* ─────────────── Notifications & Exams ─────────────── */
  {
    title: "UG II Semester Examinations – 2026 Notification",
    description:
      "Notification and schedule for the Undergraduate second semester examinations for the academic year 2026.",
    href: "/",
    category: "Notification",
    date: "2026-06-30",
    keywords: ["exam", "examination", "ug", "semester", "time table", "hall ticket"],
  },
  {
    title: "Ph.D. Admission Notification 2026-27",
    description: "Applications invited for Ph.D. admissions for the 2026-27 session across departments.",
    href: "/centers",
    category: "Notification",
    date: "2026-07-01",
    keywords: ["phd", "admission", "research", "apply online", "notification"],
  },
  {
    title: "Fee Payment Deadline Extended for Ph.D. Scholars",
    description:
      "The last date for submission of annual research and registration fees has been extended up to August 15, 2026 without fine.",
    href: "/",
    category: "Notification",
    date: "2026-08-05",
    keywords: ["fee", "payment", "deadline", "phd", "scholars"],
  },
  {
    title: "Time Table for Engineering B.Tech Regular Exams",
    description:
      "The detailed schedule and timetable for SVUCE B.Tech 1st & 3rd Year regular examinations have been released.",
    href: "/colleges/engineering",
    category: "Notification",
    date: "2026-08-22",
    keywords: ["time table", "btech", "engineering", "svuce", "exam schedule"],
  },
  {
    title: "Applications Invited for Gold Medal Awards 2026",
    description:
      "Eligible toppers from all branches are invited to submit their applications for the academic year gold medal awards.",
    href: "/",
    category: "Notification",
    date: "2026-09-12",
    keywords: ["gold medal", "awards", "toppers", "applications"],
  },
  {
    title: "Convocation 2026 Registration Now Open",
    description:
      "Registration is now open for eligible graduates to attend the Sri Venkateswara University Convocation 2026.",
    href: "/",
    category: "Notification",
    date: "2026-09-01",
    keywords: ["convocation", "graduation", "degree", "registration", "ceremony"],
  },
  {
    title: "National Scholarship Portal — Last Date Extended",
    description:
      "The last date to apply on the National Scholarship Portal has been extended to 30 September 2026.",
    href: "/about",
    category: "Notification",
    date: "2026-09-05",
    keywords: ["scholarship", "nsp", "financial aid", "last date", "portal"],
  },
  {
    title: "Tenders Called for Central Library Digitization Project",
    description:
      "Sealed tenders are invited from eligible agencies for the digitization of the Central Library archives.",
    href: "/about",
    category: "Notification",
    date: "2026-07-20",
    keywords: ["tender", "library", "digitization", "procurement"],
  },
];

export interface SearchResult extends SearchEntry {
  score: number;
}

/** Rank index entries against a free-text query. */
export function searchSite(rawQuery: string): SearchResult[] {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return [];

  const terms = query.split(/\s+/).filter(Boolean);

  const results: SearchResult[] = [];

  for (const entry of SEARCH_INDEX) {
    const title = entry.title.toLowerCase();
    const desc = entry.description.toLowerCase();
    const kw = (entry.keywords ?? []).join(" ").toLowerCase();
    const haystack = `${title} ${desc} ${kw} ${entry.category.toLowerCase()}`;

    let score = 0;
    let matchedAll = true;

    for (const term of terms) {
      if (!haystack.includes(term)) {
        matchedAll = false;
        break;
      }
      if (title.includes(term)) score += 10;
      if (title.startsWith(term)) score += 6;
      if (kw.includes(term)) score += 5;
      if (desc.includes(term)) score += 2;
      if (entry.category.toLowerCase().includes(term)) score += 3;
    }

    // Full phrase bonus.
    if (haystack.includes(query)) score += 8;

    if (matchedAll && score > 0) {
      results.push({ ...entry, score });
    }
  }

  return results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (a.date && b.date) return b.date.localeCompare(a.date);
    return a.title.localeCompare(b.title);
  });
}
