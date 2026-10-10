import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Fonts are self-hosted (src/fonts, OFL). next/font/google downloads them during the build,
// and when that download flakes on Cloudflare's builders the whole build fails
// ("Can't resolve '@vercel/turbopack-next/internal/font/google/font'", 2026-10-06).
const display = localFont({
  src: "../fonts/fraunces-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-display",
  display: "swap",
});
const body = localFont({
  src: "../fonts/public-sans-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-body",
  display: "swap",
});
const mono = localFont({
  src: [
    { path: "../fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/ibm-plex-mono-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://takehomepal.com"),
  title: {
    default: "takehomepal — See your real take-home pay",
    template: "%s | takehomepal",
  },
  description:
    "Free US paycheck, bonus and 1099 tax calculators. See what actually lands in your bank account — no signup, no email.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <header className="wrap site-head">
          <a href="/" className="brand" style={{ textDecoration: "none" }}>
            takehome<b>pal</b>
          </a>
          <nav className="nav">
            <a href="/paycheck-calculator/">Paycheck</a>
            <a href="/1099-tax-calculator/">1099</a>
            <a href="/bonus-tax-calculator/">Bonus</a>
            <a href="/overtime-calculator/">Overtime</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="wrap site-foot">
          <nav className="foot-nav">
            <a href="/about/">About</a>
            <a href="/contact/">Contact</a>
            <a href="/privacy/">Privacy</a>
            <a href="/terms/">Terms</a>
          </nav>
          <div>© {new Date().getFullYear()} takehomepal · Estimates, not advice.</div>
        </footer>
      </body>
    </html>
  );
}
