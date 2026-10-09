"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Bell, ChevronRight, Download, House, Landmark, LayoutGrid, Share, SquarePlus, WifiOff, X } from "lucide-react";
import MenuToggleIcon, { MenuBarsIcon } from "../MenuToggleIcon";
import { noticeCategories } from "@/data/notices";
import { quickServices } from "@/data/services";
import BottomSheet from "./BottomSheet";
import ServiceTile from "./ServiceTile";
import {
  APP_EVENTS,
  allAlerts,
  emitAppEvent,
  goToHref,
  markAlertsSeen,
  useAlertsSeen,
  useUnreadCount,
} from "./appEvents";

type Sheet = "services" | "alerts" | null;
type TabKey = "home" | "services" | "alerts" | "colleges" | "menu";

const ease = [0.22, 1, 0.36, 1] as const;

// Minimal typing for the (Chromium-only) install prompt event
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/**
 * App-like shell for phones/tablets (hidden from lg up): bottom tab bar,
 * scroll-up top bar, Services & Alerts bottom sheets, install prompt,
 * offline banner and service-worker registration.
 */
export default function MobileAppShell() {
  const [sheet, setSheet] = useState<Sheet>(null);
  const unread = useUnreadCount();
  const activeTab = useScrollSpyTab(sheet);
  const showTopBar = useShowOnScrollUp();
  const install = useInstallPrompt();
  const online = useOnline();

  // Register the service worker (production only — dev rebuilds constantly)
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" }).catch(() => {});
  }, []);

  // Other components (hero header, quick-access strip) can open the sheets
  useEffect(() => {
    const openServices = () => setSheet("services");
    const openAlerts = () => setSheet("alerts");
    window.addEventListener(APP_EVENTS.openServices, openServices);
    window.addEventListener(APP_EVENTS.openAlerts, openAlerts);
    return () => {
      window.removeEventListener(APP_EVENTS.openServices, openServices);
      window.removeEventListener(APP_EVENTS.openAlerts, openAlerts);
    };
  }, []);

  // Every sheet change goes through here so leaving Alerts marks them read
  const switchSheet = useCallback(
    (next: Sheet) => {
      if (sheet === "alerts" && next !== "alerts") markAlertsSeen();
      setSheet(next);
    },
    [sheet],
  );
  const closeSheet = useCallback(() => switchSheet(null), [switchSheet]);

  const tabs: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; onPress: () => void; badge?: number }[] = [
    { key: "home", label: "Home", icon: House, onPress: () => { switchSheet(null); goToHref("#hero"); } },
    { key: "services", label: "Services", icon: LayoutGrid, onPress: () => switchSheet(sheet === "services" ? null : "services") },
    { key: "alerts", label: "Alerts", icon: Bell, onPress: () => switchSheet(sheet === "alerts" ? null : "alerts"), badge: unread },
    { key: "colleges", label: "Colleges", icon: Landmark, onPress: () => { switchSheet(null); goToHref("#colleges"); } },
    { key: "menu", label: "Menu", icon: MenuBarsIcon, onPress: () => { switchSheet(null); emitAppEvent(APP_EVENTS.openMenu); } },
  ];

  return (
    <div className="lg:hidden">
      {/* ---------------- Offline banner ---------------- */}
      <AnimatePresence>
        {!online && (
          <motion.div
            initial={{ y: -60 }}
            animate={{ y: 0 }}
            exit={{ y: -60 }}
            transition={{ duration: 0.3, ease }}
            className="fixed inset-x-0 top-0 z-[70] flex items-center justify-center gap-2 bg-[#D23F12] px-4 pb-2 pt-[calc(env(safe-area-inset-top)+8px)] text-[13px] font-semibold text-white"
            role="status"
          >
            <WifiOff className="h-4 w-4" />
            You&apos;re offline — showing saved content
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------- Top app bar (appears when scrolling back up) ---------------- */}
      <div
        className={`fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#001546]/90 pt-[env(safe-area-inset-top)] backdrop-blur-xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          showTopBar ? "translate-y-0" : "-translate-y-full"
        }`}
        aria-hidden={!showTopBar}
        inert={!showTopBar}
      >
        <div className="flex h-14 items-center justify-between px-4">
          <button type="button" onClick={() => goToHref("#hero")} className="flex items-center gap-2.5">
            <Image src="/svu-color-crest.webp" unoptimized alt="" width={36} height={36} className="h-9 w-auto object-contain" />
            <span className="text-left">
              <span className="block font-serif text-[13px] font-bold uppercase leading-none tracking-tight text-white">
                Sri Venkateswara
              </span>
              <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-widest text-[#23B5E9]">
                University
              </span>
            </span>
          </button>
          <div className="flex items-center gap-2">
            <IconButton label="Alerts" onClick={() => switchSheet("alerts")} badge={unread}>
              <Bell className="h-5 w-5" />
            </IconButton>
            <IconButton label="Open menu" onClick={() => emitAppEvent(APP_EVENTS.openMenu)}>
              <MenuToggleIcon open={false} className="h-5 w-5" />
            </IconButton>
          </div>
        </div>
      </div>

      {/* ---------------- Bottom tab bar ---------------- */}
      <nav
        className="fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+10px)] z-40 rounded-[22px] border border-white/10 bg-[#001546]/92 px-1.5 py-1.5 shadow-[0_12px_32px_-8px_rgba(0,21,70,0.55)] backdrop-blur-xl"
        aria-label="App navigation"
      >
        <ul className="grid grid-cols-5">
          {tabs.map(({ key, label, icon: Icon, onPress, badge }) => {
            const active = activeTab === key;
            return (
              <li key={key}>
                <button
                  type="button"
                  onClick={onPress}
                  aria-current={active ? "page" : undefined}
                  className="relative flex h-14 w-full flex-col items-center justify-center gap-1 rounded-2xl active:scale-95 transition-transform"
                >
                  {active && (
                    <motion.span
                      layoutId="svu-tab-pill"
                      className="absolute inset-x-1.5 inset-y-0.5 rounded-2xl bg-white/10"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">
                    <Icon className={`h-[22px] w-[22px] transition-colors ${active ? "text-[#FFB21A]" : "text-[#FFE9C2]/70"}`} strokeWidth={active ? 2.3 : 2} />
                    {!!badge && <Badge count={badge} />}
                  </span>
                  <span className={`relative text-[10.5px] font-semibold tracking-wide transition-colors ${active ? "text-[#FFB21A]" : "text-[#FFE9C2]/70"}`}>
                    {label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ---------------- Install prompt ---------------- */}
      <AnimatePresence>
        {install.visible && !sheet && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+92px)] z-40 rounded-[22px] border border-[#001546]/10 bg-white p-4 pr-3.5 shadow-[0_16px_40px_-12px_rgba(0,21,70,0.45)]"
            role="dialog"
            aria-label="Install the SVU app"
          >
            {/* Row 1: crest + title, close top-right */}
            <div className="flex items-center gap-3.5 pr-10">
              <Image src="/SV-logo.webp" unoptimized alt="Sri Venkateswara University crest" width={56} height={65} className="h-16 w-auto shrink-0 object-contain" />
              <div className="min-w-0">
                <p className="font-serif text-[20px] font-bold leading-tight text-[#001546]">Get the SVU app</p>
                <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D23F12]">
                  Sri Venkateswara University
                </p>
              </div>
            </div>
            <CountdownClose key={install.showId} paused={install.needsHelp} onDone={install.dismiss} />

            {/* Row 2: description + install button */}
            <div className="mt-3 flex items-center gap-3 border-t border-[#001546]/[0.08] pt-3">
              {install.ios ? (
                <p className="min-w-0 flex-1 text-[13px] leading-snug text-[#5A6382]">
                  Tap <Share className="inline h-3.5 w-3.5 align-[-2px]" /> then{" "}
                  <span className="whitespace-nowrap">
                    <SquarePlus className="inline h-3.5 w-3.5 align-[-2px]" /> Add to Home Screen
                  </span>
                </p>
              ) : install.needsHelp ? (
                <p className="min-w-0 flex-1 text-[13px] leading-snug text-[#5A6382]">
                  Open your browser menu <span className="font-bold">⋮</span> and choose{" "}
                  <span className="font-semibold text-[#001546]">Install app</span> or{" "}
                  <span className="font-semibold text-[#001546]">Add to Home screen</span>
                </p>
              ) : (
                <p className="min-w-0 flex-1 text-[13px] leading-snug text-[#5A6382]">
                  Instant alerts, quick services &amp; offline access — right from your home screen
                </p>
              )}
              {!install.ios && !install.needsHelp && (
                <button
                  type="button"
                  onClick={install.prompt}
                  disabled={install.waiting}
                  className="flex h-11 shrink-0 items-center gap-1.5 rounded-full bg-[#FFB21A] px-5 text-sm font-bold text-[#001546] shadow-[0_6px_16px_-6px_rgba(255,178,26,0.7)] active:scale-95"
                >
                  {install.waiting ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#001546]/30 border-t-[#001546]" aria-hidden="true" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  {install.waiting ? "Preparing…" : "Install"}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------- Services sheet ---------------- */}
      <BottomSheet
        open={sheet === "services"}
        onClose={closeSheet}
        title="Services"
        subtitle="Frequently used student & campus services"
        footer={
          install.canInstall ? (
            <button
              type="button"
              onClick={install.prompt}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#001546] text-sm font-bold text-[#FFE9C2] active:scale-[0.98]"
            >
              <Download className="h-4 w-4" />
              Install SVU app
            </button>
          ) : undefined
        }
      >
        <div className="grid grid-cols-4 gap-x-2 gap-y-5 pb-4 pt-2">
          {quickServices.map((s) => (
            <ServiceTile key={s.label} service={s} onSelect={closeSheet} />
          ))}
        </div>
      </BottomSheet>

      {/* ---------------- Alerts sheet ---------------- */}
      <AlertsSheet open={sheet === "alerts"} onClose={closeSheet} />
    </div>
  );
}

/* ========================================================================== */

function AlertsSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const seen = useAlertsSeen();
  const [filter, setFilter] = useState<string>("all");
  const items = useMemo(() => (filter === "all" ? allAlerts : allAlerts.filter((a) => a.categoryKey === filter)), [filter]);
  const chipColor: Record<string, string> = { circulars: "#1F45D6", exams: "#D23F12", announcements: "#0E8050" };

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title="Alerts"
      subtitle="Circulars, exam notifications & announcements"
      footer={
        <button
          type="button"
          onClick={() => {
            onClose();
            goToHref("#notifications");
          }}
          className="flex h-12 w-full items-center justify-center gap-1.5 rounded-2xl bg-[#001546] text-sm font-bold text-[#FFE9C2] active:scale-[0.98]"
        >
          View all notifications
          <ChevronRight className="h-4 w-4" />
        </button>
      }
    >
      {/* Filter chips */}
      <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {[{ key: "all", label: "All" }, ...noticeCategories.map((c) => ({ key: c.key, label: c.label }))].map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setFilter(c.key)}
            className={`h-9 shrink-0 rounded-full px-4 text-[13px] font-semibold transition-colors ${
              filter === c.key ? "bg-[#001546] text-[#FFE9C2]" : "bg-[#001546]/[0.06] text-[#001546]"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <ul className="divide-y divide-[#001546]/10">
        {items.map((a) => {
          const isNew = a.time > seen;
          return (
            <li key={a.categoryKey + a.title}>
              <a
                href={a.href}
                className="flex gap-3 py-3.5 active:bg-[#001546]/[0.04]"
                onClick={(e) => {
                  if (a.href === "#") {
                    e.preventDefault();
                    onClose();
                    goToHref("#notifications");
                  }
                }}
              >
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: chipColor[a.categoryKey] ?? "#001546" }} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#5A6382]">
                    {a.category}
                    {isNew && (
                      <span className="rounded-full bg-[#FFB21A] px-1.5 py-px text-[9.5px] font-bold tracking-wide text-[#001546]">
                        NEW
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 block text-[15px] font-semibold leading-snug text-[#001546]">{a.title}</span>
                  <span className="mt-0.5 line-clamp-2 block text-[13px] leading-snug text-[#5A6382]">{a.note}</span>
                </span>
                <time className="shrink-0 pt-0.5 font-mono text-[11px] text-[#5A6382]/80">{a.date.slice(0, 6)}</time>
              </a>
            </li>
          );
        })}
      </ul>
    </BottomSheet>
  );
}

/** ✕ wrapped in a ring that fills over INSTALL_CARD_MS, then closes the card */
function CountdownClose({ onDone, paused }: { onDone: () => void; paused?: boolean }) {
  const r = 15;
  const c = 2 * Math.PI * r;
  return (
    <button
      type="button"
      onClick={onDone}
      className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full text-[#5A6382] active:bg-black/5"
      aria-label="Dismiss"
    >
      <svg className="absolute inset-0 h-9 w-9 -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
        <circle cx="18" cy="18" r={r} fill="none" stroke="#001546" strokeOpacity="0.1" strokeWidth="2.5" />
        <circle
          cx="18"
          cy="18"
          r={r}
          fill="none"
          stroke="#FFB21A"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={c}
          style={{
            strokeDashoffset: c,
            animation: `svu-countdown-ring ${INSTALL_CARD_MS}ms linear forwards`,
            animationPlayState: paused ? "paused" : "running",
          }}
          onAnimationEnd={onDone}
        />
      </svg>
      <X className="relative h-4 w-4" />
    </button>
  );
}

function Badge({ count }: { count: number }) {
  return (
    <span className="absolute -right-2.5 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-[#001546] bg-[#D23F12] px-1 text-[10px] font-bold leading-none text-white">
      {count > 9 ? "9+" : count}
    </span>
  );
}

function IconButton({ label, onClick, badge, children }: { label: string; onClick: () => void; badge?: number; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={badge ? `${label} (${badge} new)` : label}
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#001B54] text-white active:scale-95"
    >
      {children}
      {!!badge && <Badge count={badge} />}
    </button>
  );
}

/* ========================================================================== */
/* Hooks                                                                       */
/* ========================================================================== */

/** Active tab: an open sheet wins; otherwise Colleges while that section is in view, else Home */
function useScrollSpyTab(sheet: Sheet): TabKey {
  const [inColleges, setInColleges] = useState(false);
  useEffect(() => {
    const el = document.getElementById("colleges");
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInColleges(entry.isIntersecting), {
      rootMargin: "-45% 0px -45% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  if (sheet) return sheet;
  return inColleges ? "colleges" : "home";
}

/** Top bar: shown while scrolling up once past most of the first screen */
function useShowOnScrollUp() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (y < window.innerHeight * 0.8) setShow(false);
      else if (delta < -6) setShow(true);
      else if (delta > 6) setShow(false);
      if (Math.abs(delta) > 6) lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return show;
}

/** How long the install card stays up before its countdown ring closes it */
export const INSTALL_CARD_MS = 8000;

/**
 * Install card visibility: slides in as soon as the page loads, and once more
 * when the visitor reaches the end of the footer. Chromium's native prompt is
 * captured for the Install button; iOS Safari gets Add-to-Home-Screen steps.
 */
const INSTALL_READY_EVENT = "svu:install-ready";

const getCapturedPrompt = () =>
  (window as Window & { __svuInstallPrompt?: BeforeInstallPromptEvent }).__svuInstallPrompt ?? null;

/** Resolves with the install prompt event if the browser offers it within ms */
function waitForInstallPrompt(ms: number) {
  return new Promise<BeforeInstallPromptEvent | null>((resolve) => {
    const ready = () => {
      clearTimeout(t);
      resolve(getCapturedPrompt());
    };
    const t = setTimeout(() => {
      window.removeEventListener(INSTALL_READY_EVENT, ready);
      resolve(null);
    }, ms);
    window.addEventListener(INSTALL_READY_EVENT, ready, { once: true });
  });
}

function useInstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [ios, setIos] = useState(false);
  const [visible, setVisible] = useState(false);
  // Bumped on every show so the countdown ring restarts
  const [showId, setShowId] = useState(0);
  const [needsHelp, setNeedsHelp] = useState(false);
  // Install tapped before the browser was ready — waiting briefly for it
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    if (standalone) return;

    const ua = navigator.userAgent;
    const isIos = /iphone|ipad|ipod/i.test(ua) && /safari/i.test(ua) && !/crios|fxios/i.test(ua);

    const show = () => {
      setNeedsHelp(false);
      setVisible(true);
      setShowId((n) => n + 1);
    };

    // On load — a short beat so it slides in after the page settles
    const timer = setTimeout(() => {
      setIos(isIos);
      show();
    }, 700);

    // Once more when the visitor reaches the end of the footer
    let shownAtEnd = false;
    const onScroll = () => {
      if (shownAtEnd) return;
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
      if (atEnd) {
        shownAtEnd = true;
        show();
      }
    };

    // The inline script in layout.tsx captures the event (even before hydration)
    const onPrompt = () => {
      const e = (window as Window & { __svuInstallPrompt?: BeforeInstallPromptEvent }).__svuInstallPrompt;
      if (e) setDeferred(e);
    };
    onPrompt();
    const onInstalled = () => {
      setDeferred(null);
      setVisible(false);
      window.removeEventListener("scroll", onScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener(INSTALL_READY_EVENT, onPrompt);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener(INSTALL_READY_EVENT, onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const dismiss = () => setVisible(false);

  const prompt = async () => {
    let ev = deferred ?? getCapturedPrompt();
    if (!ev) {
      // Not offered yet — wait a moment (the tap keeps its user-gesture
      // window for a few seconds) before falling back to manual steps
      setWaiting(true);
      ev = await waitForInstallPrompt(3000);
      setWaiting(false);
      if (!ev) {
        setNeedsHelp(true);
        return;
      }
    }
    try {
      // Opens the browser's native install dialog directly
      await ev.prompt();
      await ev.userChoice;
      setVisible(false);
    } catch {
      setNeedsHelp(true);
    } finally {
      // A prompt event can only be used once
      setDeferred(null);
      (window as Window & { __svuInstallPrompt?: BeforeInstallPromptEvent }).__svuInstallPrompt = undefined;
    }
  };

  return { visible, showId, ios, needsHelp, waiting, canInstall: !!deferred, prompt, dismiss };
}

function useOnline() {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);
  return online;
}
