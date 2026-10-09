import Script from "next/script";
import type { Metadata, Viewport } from "next";
import PageTransition from "@/components/v2/PageTransition";
import MobileAppShell from "@/components/mobile/MobileAppShell";
import GoToTopSling from "@/components/GoToTopSling";
import { Libre_Baskerville, Lato } from "next/font/google";
import "./globals.css";

// Titles: Libre Baskerville (--font-serif, and --font-heading via globals.css)
const baskerville = Libre_Baskerville({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "variable",
});

// Body text: Lato
const lato = Lato({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Sri Venkateswara University, Tirupati",
  description:
    "NAAC A+ accredited Sri Venkateswara University, Tirupati — admissions, notifications, colleges, research centres and campus services.",
  applicationName: "SVU",
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
  // Installed-app look on iOS (home-screen launch, status bar, title)
  appleWebApp: {
    capable: true,
    title: "SVU",
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#001546",
  width: "device-width",
  initialScale: 1,
  // Lets the app draw under the notch / home indicator (safe-area insets)
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${baskerville.variable} ${lato.variable} scroll-smooth`} suppressHydrationWarning>
      {/* Phones/tablets: navy so the strip reserved under the content for the
          bottom tab bar continues the footer (pages paint their own ivory) */}
      <body
        className="font-sans antialiased text-[#0C1230] bg-[#001546] lg:bg-[#FFF9EE] selection:bg-[#D23F12] selection:text-white"
        suppressHydrationWarning
      >
        {/* Capture Chrome's install prompt before React hydrates — it can fire
            early, and a missed event means the Install button can't install */}
        <Script
          id="svu-pwa-install-prompt"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html:
              "window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();window.__svuInstallPrompt=e;window.dispatchEvent(new Event('svu:install-ready'));});",
          }}
        />
        <PageTransition />
        {children}
        <MobileAppShell />
        <GoToTopSling />
      </body>
    </html>
  );
}
