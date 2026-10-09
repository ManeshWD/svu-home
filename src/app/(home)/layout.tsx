import type { Metadata, Viewport } from "next";
import MobileAppShell from "@/components/mobile/MobileAppShell";
import { Plus_Jakarta_Sans, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
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
    <html lang="en" className={`${jakarta.variable} ${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-[#0C1230] bg-[#FFF9EE] selection:bg-[#D23F12] selection:text-white">
        {/* Capture Chrome's install prompt before React hydrates — it can fire
            early, and a missed event means the Install button can't install */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();window.__svuInstallPrompt=e;window.dispatchEvent(new Event('svu:install-ready'));});",
          }}
        />
        {children}
        <MobileAppShell />
      </body>
    </html>
  );
}
