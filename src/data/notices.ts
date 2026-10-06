// Placeholder notices — replace with the university's live circulars, exam
// notifications and announcements (or wire this to the notices feed).
export interface Notice {
  title: string;
  note: string;
  date: string;
  href: string;
}

export interface NoticeCategory {
  key: string;
  label: string;
  description: string;
  range: string;
  all: { label: string; href: string };
  items: Notice[];
}

export const noticeCategories: NoticeCategory[] = [
  {
    key: "circulars",
    label: "Circulars",
    description:
      "Official circulars from the Registrar's office on academics, administration and campus policy.",
    range: "(Sep–Oct 2026)",
    all: { label: "View all circulars", href: "#" },
    items: [
      { title: "Revised academic calendar — odd semester 2026–27", note: "Updated teaching, assessment and holiday schedule for all constituent colleges.", date: "03 Oct 2026", href: "#" },
      { title: "Biometric attendance for teaching staff", note: "Guidelines on daily attendance logging across departments.", date: "29 Sep 2026", href: "#" },
      { title: "Hostel fee payment — second instalment", note: "Due dates and online payment procedure for hostel residents.", date: "24 Sep 2026", href: "#" },
      { title: "Anti-ragging undertaking for new admissions", note: "Mandatory affidavit submission for first-year students.", date: "18 Sep 2026", href: "#" },
      { title: "Library working hours during examinations", note: "Extended reading-room timings for the examination period.", date: "11 Sep 2026", href: "#" },
    ],
  },
  {
    key: "exams",
    label: "Exam Notifications",
    description:
      "Timetables, results, revaluation and hall-ticket notices from the Controller of Examinations.",
    range: "(Sep–Oct 2026)",
    all: { label: "View all exam notifications", href: "#" },
    items: [
      { title: "PG semester examinations — timetable released", note: "Date sheet for M.A., M.Sc. and M.Com. semester examinations.", date: "04 Oct 2026", href: "#" },
      { title: "Hall tickets available for download", note: "Download from the examinations portal using your registration number.", date: "01 Oct 2026", href: "#" },
      { title: "UG supplementary results declared", note: "Results for supplementary examinations held in August.", date: "26 Sep 2026", href: "#" },
      { title: "Revaluation applications open", note: "Apply online within the notified window with the prescribed fee.", date: "20 Sep 2026", href: "#" },
      { title: "Ph.D. course-work examination schedule", note: "Course-work examination dates for the current research cohort.", date: "12 Sep 2026", href: "#" },
    ],
  },
  {
    key: "announcements",
    label: "Announcements",
    description:
      "Admissions, events, scholarships and news from across the university.",
    range: "(Sep–Oct 2026)",
    all: { label: "View all announcements", href: "#" },
    items: [
      { title: "Admissions 2026 — spot counselling", note: "Spot admission for remaining seats in select PG programmes.", date: "05 Oct 2026", href: "#" },
      { title: "Campus placement drive — registrations open", note: "Final-year students can register for the upcoming drive.", date: "30 Sep 2026", href: "#" },
      { title: "Merit scholarships — applications invited", note: "Eligibility criteria and the online application process.", date: "22 Sep 2026", href: "#" },
      { title: "National Science Symposium — call for papers", note: "Submissions open for research talks and poster sessions.", date: "15 Sep 2026", href: "#" },
      { title: "Foundation Day celebrations", note: "Programme schedule for the university's Foundation Day.", date: "08 Sep 2026", href: "#" },
    ],
  },
];
