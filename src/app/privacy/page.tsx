import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How takehomepal handles your data: the short version is we barely touch it. Calculators run in your browser.",
  alternates: { canonical: "/privacy/" },
};

export default function Privacy() {
  return (
    <section className="wrap">
      <div style={{ paddingTop: "clamp(36px,6vw,64px)" }}>
        <h1>Privacy policy</h1>
        <p className="lede" style={{ color: "var(--slate)", maxWidth: "52ch" }}>
          Short version: the numbers you type never leave your browser. We don't want your
          salary — we just help you do the math.
        </p>
      </div>
      <div className="prose">
        <h2>What we collect</h2>
        <p>
          Nothing you enter into a calculator. Every calculation runs locally in your
          browser. Your salary, filing status, loan amounts — none of it is sent to us,
          stored, or logged.
        </p>
        <p>There's no account, no login, and no email signup anywhere on this site.</p>

        <h2>Analytics</h2>
        <p>
          We use Google Analytics to count which pages and calculators get used. It only loads
          if you click &ldquo;Allow analytics&rdquo; in the banner; until then no Google script
          runs and no analytics cookies are set. Google signals and ad personalization are
          turned off, and it never sees what you type into a calculator. To change your mind,
          clear this site&apos;s data in your browser and the banner will ask again.
        </p>

        <h2>Advertising</h2>
        <p>
          This site may show ads through Google AdSense. Google and its partners use cookies
          to serve ads based on your prior visits to this and other websites. You can opt out
          of personalized advertising in{" "}
          <a href="https://www.google.com/settings/ads" rel="nofollow noopener">Google Ads Settings</a>,
          or learn more at{" "}
          <a href="https://policies.google.com/technologies/ads" rel="nofollow noopener">Google's advertising policy</a>.
        </p>

        <h2>Cookies</h2>
        <p>
          We store your analytics choice in your browser. With your consent, Google Analytics
          sets its own cookies; where ads are shown, the advertising cookies described above
          apply. You can block cookies in your browser settings.
        </p>

        <h2>Changes</h2>
        <p>
          If this policy changes, the updated version will be posted here with a new date.
          Questions? See the <a href="/contact/">contact page</a>.
        </p>
      </div>
    </section>
  );
}
