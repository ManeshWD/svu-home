"use client";

import { useSyncExternalStore } from "react";
import { noticeCategories, type Notice } from "@/data/notices";

/* --------------------------------------------------------------------------
   Cross-component app events (mobile shell ⇄ hero / sections)
   -------------------------------------------------------------------------- */
export const APP_EVENTS = {
  openMenu: "svu:open-menu",
  openServices: "svu:open-services",
  openAlerts: "svu:open-alerts",
} as const;

export const emitAppEvent = (name: (typeof APP_EVENTS)[keyof typeof APP_EVENTS]) =>
  window.dispatchEvent(new Event(name));

/** Smooth-scroll to an in-page anchor (or open external links in a new tab) */
export function goToHref(href: string, external?: boolean) {
  if (external || /^https?:/.test(href)) {
    window.open(href, "_blank", "noopener,noreferrer");
    return;
  }
  if (!href.startsWith("#")) {
    window.location.href = href;
    return;
  }
  const el = href.length > 1 ? document.querySelector(href) : null;
  // Wait a frame so a just-closed sheet has released the scroll lock
  requestAnimationFrame(() => {
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", href);
  });
}

/* --------------------------------------------------------------------------
   Alerts: flattened notices + "unread" tracking (persisted per device)
   -------------------------------------------------------------------------- */
const MONTHS: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

/** Parses "03 Oct 2026" without relying on Date.parse quirks (Safari) */
export function noticeTime(date: string) {
  const [d, m, y] = date.split(" ");
  return new Date(Number(y), MONTHS[m] ?? 0, Number(d)).getTime();
}

export interface AlertItem extends Notice {
  category: string;
  categoryKey: string;
  time: number;
}

export const allAlerts: AlertItem[] = noticeCategories
  .flatMap((c) => c.items.map((n) => ({ ...n, category: c.label, categoryKey: c.key, time: noticeTime(n.date) })))
  .sort((a, b) => b.time - a.time);

const SEEN_KEY = "svu-alerts-seen";
const newest = allAlerts[0]?.time ?? 0;
// First visit: notices from the last week of the feed count as new
const DEFAULT_SEEN = newest - 7 * 24 * 60 * 60 * 1000;

let lastSeen: number | null = null;
const listeners = new Set<() => void>();

function readSeen() {
  if (lastSeen !== null) return lastSeen;
  try {
    const v = localStorage.getItem(SEEN_KEY);
    lastSeen = v ? Number(v) : DEFAULT_SEEN;
  } catch {
    lastSeen = DEFAULT_SEEN;
  }
  return lastSeen;
}

export function markAlertsSeen() {
  lastSeen = newest;
  try {
    localStorage.setItem(SEEN_KEY, String(newest));
  } catch {
    /* storage unavailable — keep in memory */
  }
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

/** Timestamp of the newest notice the visitor has seen */
export function useAlertsSeen() {
  return useSyncExternalStore(subscribe, readSeen, () => DEFAULT_SEEN);
}

export function useUnreadCount() {
  const seen = useAlertsSeen();
  return allAlerts.filter((a) => a.time > seen).length;
}
