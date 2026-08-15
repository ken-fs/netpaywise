import type { Metadata } from "next";
import { Fraunces, Public_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const body = Public_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://netpaywise.com"),
  title: {
    default: "netpaywise — See your real take-home pay",
    template: "%s | netpaywise",
  },
  description:
    "Free US paycheck, income tax, and loan calculators. See what actually lands in your bank account, by state — no signup, no email.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <header className="wrap site-head">
          <a href="/" className="brand" style={{ textDecoration: "none" }}>
            net<b>pay</b>wise
          </a>
          <nav className="nav">
            <a href="/paycheck-calculator/">Paycheck</a>
            <a href="/income-tax-calculator/">Taxes</a>
            <a href="/loan-calculator/">Loans</a>
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
          <div>© {new Date().getFullYear()} netpaywise · Estimates, not advice.</div>
        </footer>
      </body>
    </html>
  );
}
