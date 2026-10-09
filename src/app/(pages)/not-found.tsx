import type { Metadata } from "next";
import NotFoundView from "@/components/NotFoundView";

export const metadata: Metadata = {
  title: "Page not found — Sri Venkateswara University",
};

export default function NotFound() {
  return <NotFoundView />;
}
