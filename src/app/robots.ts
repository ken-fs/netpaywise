import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    // Next writes __next.*.txt RSC payloads next to every page; they duplicate the HTML and
    // get reported as soft 404s (Ship/AGENTS.md, new-site pitfall 4).
    rules: { userAgent: "*", allow: "/", disallow: ["/*__next"] },
    sitemap: "https://takehomepal.com/sitemap.xml",
  };
}
