import { Lato, Libre_Baskerville } from "next/font/google";

// Fonts for the inner pages — shared by layout.tsx and the global 404 page,
// which renders outside every layout. Same families as the homepage:
// Libre Baskerville for titles, Lato for body text.

const baskerville = Libre_Baskerville({
  variable: "--font-baskerville",
  subsets: ["latin"],
  weight: "variable",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

/** All font variables, for the <html> className */
export const fontVariables = [baskerville, lato].map((f) => f.variable).join(" ");
