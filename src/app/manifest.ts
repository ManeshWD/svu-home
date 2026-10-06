import type { MetadataRoute } from "next";

// Web app manifest — lets visitors install the site to their home screen and
// open it full-screen like a native app.
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Sri Venkateswara University",
    short_name: "SVU",
    description:
      "Sri Venkateswara University, Tirupati — admissions, notifications, colleges, results and campus services.",
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#FFF9EE",
    theme_color: "#001546",
    categories: ["education"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    // Long-press shortcuts on the home-screen icon
    shortcuts: [
      {
        name: "Notifications",
        short_name: "Notices",
        url: "/?source=pwa#notifications",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Admission queries",
        short_name: "Admissions",
        url: "/?source=pwa#queries",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Contact",
        short_name: "Contact",
        url: "/?source=pwa#contact",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
    ],
  };
}
