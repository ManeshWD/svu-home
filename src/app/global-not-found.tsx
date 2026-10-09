// 404 for URLs that match no route. The app has two root layouts ((home) and
// (pages)), so this page renders outside both and brings its own styles/fonts.
import "./(pages)/globals.css";
import "./(pages)/site-chrome.css";
import type { Metadata } from "next";
import { fontVariables } from "./(pages)/fonts";
import NotFoundView from "@/components/NotFoundView";
import GoToTopSling from "@/components/GoToTopSling";

export const metadata: Metadata = {
  title: "Page not found — Sri Venkateswara University",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <NotFoundView />
        <GoToTopSling />
      </body>
    </html>
  );
}
