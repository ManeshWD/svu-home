import type { Metadata } from "next";
import "./globals.css";
import "./site-chrome.css";
import PageTransition from "@/components/v2/PageTransition";
import GoToTopSling from "@/components/GoToTopSling";
import { fontVariables } from "./fonts";

export const metadata: Metadata = {
  title: "Sri Venkateswara University | Tirupati",
  description: "NAAC 'A+' Accredited State University established in 1954 in Tirupati, Andhra Pradesh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontVariables} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <PageTransition />
        {children}
        <GoToTopSling />
      </body>
    </html>
  );
}
