import type { Metadata } from "next";

// TODO(launch): confirm this inbox exists and is monitored before go-live.
const CONTACT_EMAIL = "hello@takehomepal.com";

export const metadata: Metadata = {
  title: "Contact",
  description: "Found a bug, a wrong number, or a calculator we should build? Tell us.",
  alternates: { canonical: "/contact/" },
};

export default function Contact() {
  return (
    <section className="wrap">
      <div style={{ paddingTop: "clamp(36px,6vw,64px)" }}>
        <h1>Get in touch</h1>
        <p className="lede" style={{ color: "var(--slate)", maxWidth: "52ch" }}>
          Spotted a number that looks off? Want a calculator we don't have yet? We read
          everything.
        </p>
      </div>
      <div className="prose">
        <h2>Email</h2>
        <p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="money" style={{ fontSize: "1.1rem", color: "var(--take-deep)" }}>
            {CONTACT_EMAIL}
          </a>
        </p>
        <p>
          Reporting a wrong figure? Include the calculator, the inputs you used, and the
          number you expected. That helps us fix it fast.
        </p>

        <h2>What to expect</h2>
        <p>
          We're a small operation, so replies aren't instant — but corrections to tax data
          jump the queue. Accuracy is the whole point.
        </p>
      </div>
    </section>
  );
}
