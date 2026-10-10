import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "takehomepal — paycheck, bonus and 1099 tax calculators",
    short_name: "takehomepal",
    description: "See what actually lands in your bank account after taxes.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f4ee",
    theme_color: "#14312a",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any", purpose: "any" },
      { src: "/icon-192.png", type: "image/png", sizes: "192x192", purpose: "any" },
      { src: "/icon-512.png", type: "image/png", sizes: "512x512", purpose: "any" },
      { src: "/icon-maskable-512.png", type: "image/png", sizes: "512x512", purpose: "maskable" },
    ],
  };
}
