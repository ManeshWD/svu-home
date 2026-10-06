import {
  Award,
  BedDouble,
  CalendarDays,
  CalendarHeart,
  ClipboardCheck,
  CreditCard,
  GraduationCap,
  Landmark,
  Library,
  MapPin,
  Phone,
  Ticket,
  type LucideIcon,
} from "lucide-react";

export interface QuickService {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Icon tile colour (theme palette) */
  tint: string;
  ink: string;
  external?: boolean;
}

// Frequently used services — placeholder targets point at homepage sections
// until the dedicated portals/pages are linked.
export const quickServices: QuickService[] = [
  { label: "Admissions", href: "#queries", icon: GraduationCap, tint: "#FFB21A", ink: "#001546" },
  { label: "Results", href: "#notifications", icon: ClipboardCheck, tint: "#1F45D6", ink: "#FFFFFF" },
  { label: "Hall Tickets", href: "#notifications", icon: Ticket, tint: "#D23F12", ink: "#FFFFFF" },
  { label: "Timetables", href: "#notifications", icon: CalendarDays, tint: "#0E8050", ink: "#FFFFFF" },
  { label: "Fee Payment", href: "#contact", icon: CreditCard, tint: "#23B5E9", ink: "#001546" },
  { label: "Scholarships", href: "#queries", icon: Award, tint: "#001546", ink: "#FFE9C2" },
  { label: "Colleges", href: "#colleges", icon: Landmark, tint: "#FFB21A", ink: "#001546" },
  { label: "Library", href: "#centres", icon: Library, tint: "#1F45D6", ink: "#FFFFFF" },
  { label: "Hostels", href: "#gallery", icon: BedDouble, tint: "#D23F12", ink: "#FFFFFF" },
  { label: "Events", href: "#events", icon: CalendarHeart, tint: "#0E8050", ink: "#FFFFFF" },
  {
    label: "Campus Map",
    href: "https://maps.google.com/?q=Sri+Venkateswara+University+Tirupati",
    icon: MapPin,
    tint: "#23B5E9",
    ink: "#001546",
    external: true,
  },
  { label: "Contact", href: "#contact", icon: Phone, tint: "#001546", ink: "#FFE9C2" },
];
