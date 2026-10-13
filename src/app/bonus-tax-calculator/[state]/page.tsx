import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { loadFederal, loadSupplementalStates } from "@/lib/data";
import { BonusTaxCalculator } from "@/components/BonusTaxCalculator";
import { ToolPage, type Faq } from "@/components/ToolPage";
import { bonusAfterTax } from "@/lib/engine/tax";
import { usd } from "@/lib/format";

export function generateStaticParams() {
  return loadSupplementalStates().map((s) => ({ state: s.slug }));
}

const getState = (slug: string) => loadSupplementalStates().find((s) => s.slug === slug.toLowerCase());

const pct = (r: number) => `${+(r * 100).toFixed(5)}%`;

interface Copy {
  title: string;
  description: string;
  h1: string;
  lede: string;
  faq: Faq[];
  prose: ReactNode;
}

function copyFor(slug: string): Copy | null {
  const federal = loadFederal();
  const y = federal.taxYear;
  const st = getState(slug);
  if (!st) return null;
  const fedKeep = bonusAfterTax(5000, federal).net;

  if (slug === "ny") {
    const nyc = st.locals.find((l) => l.id === "nyc")!;
    const yk = st.locals.find((l) => l.id === "yonkers")!;
    const pfl = st.payroll[0];
    const base = bonusAfterTax(5000, federal, st.rate * 100);
    const keepNy = base.net - 5000 * pfl.rate;
    const keepNyc = keepNy - 5000 * nyc.rate;
    return {
      title: `New York Bonus Tax Calculator ${y} — NYC, Yonkers and NY State`,
      description: `See your bonus after tax in New York for ${y}: 22% federal, ${pct(st.rate)} NY State, ${pct(nyc.rate)} NYC if you live there, Paid Family Leave, Social Security and Medicare. Free, no signup.`,
      h1: "New York bonus tax calculator: what's left after Albany and the city.",
      lede: "New York takes a bigger bite of a bonus than most states, and New York City adds its own. Pick where you live and see what actually lands.",
      faq: [
        { q: "How much is a bonus taxed in New York?", a: `When it's paid as its own check: 22% federal, 7.65% Social Security and Medicare, ${pct(st.rate)} New York State and ${pct(pfl.rate)} for Paid Family Leave. That's about 41.8% withheld. On a $5,000 bonus you'd keep about ${usd(keepNy)}.` },
        { q: "How much is a bonus taxed in NYC?", a: `New York City residents get another ${pct(nyc.rate)} withheld for city income tax, so roughly 46% in total. A $5,000 bonus leaves about ${usd(keepNyc)}.` },
        { q: "I work in Manhattan but live in New Jersey. Do I pay NYC tax?", a: "No. NYC income tax is based on where you live, not where you work. You'll still have New York State tax withheld as a nonresident working in the state." },
        { q: "What's the New York supplemental tax rate?", a: `${pct(st.rate)} for New York State in ${y}, ${pct(nyc.rate)} for New York City and ${pct(yk.rate)} for Yonkers residents (0.5% for nonresidents working in Yonkers). Employers can use these flat rates or add the bonus to a regular check and withhold on the total.` },
        { q: "Why did my bonus get taxed at almost 50%?", a: "Withholding, not the final tax. Federal, state and city all take a flat cut, and if the bonus was added to a regular paycheck the federal part can be even higher. When you file, the bonus is just more income at your real rates, so a chunk often comes back." },
        { q: "Does Paid Family Leave come out of a bonus?", a: `Yes, bonuses count as wages for PFL. In ${y} it's ${pct(pfl.rate)} of gross pay, but it stops once you've paid ${usd(pfl.annualMax ?? 0)} for the year. If you earn over about $95,000, you've probably hit the cap before a year-end bonus.` },
      ],
      prose: (
        <>
          <h2>Five cuts from a New York bonus</h2>
          <ul>
            <li><strong>Federal</strong> — a flat 22% (37% on anything over $1 million in bonuses for the year).</li>
            <li><strong>Social Security and Medicare</strong> — 6.2% and 1.45%.</li>
            <li><strong>New York State</strong> — a flat {pct(st.rate)} on supplemental pay.</li>
            <li><strong>New York City or Yonkers</strong> — {pct(nyc.rate)} for NYC residents, {pct(yk.rate)} for Yonkers residents.</li>
            <li><strong>Paid Family Leave</strong> — {pct(pfl.rate)}, up to {usd(pfl.annualMax ?? 0)} a year.</li>
          </ul>
          <p>
            New York also has state disability insurance, but it&apos;s capped at 60 cents a week, so
            your regular paycheck already covers it.
          </p>
          <h2>It usually evens out when you file</h2>
          <p>
            The {pct(st.rate)} state bonus rate is set high on purpose: unless you earn well over $1 million,
            New York&apos;s own brackets top out below it. So New Yorkers often get part of their bonus
            withholding back as a state refund. Same with the {pct(nyc.rate)} city rate, which sits a bit
            above NYC&apos;s top rate of 3.876%.
          </p>
          <p>
            Compare with a no-tax state on the <a href="/bonus-tax-calculator/tx/">Texas bonus tax calculator</a>,
            or use the main <a href="/bonus-tax-calculator/">bonus tax calculator</a> for any other state.
            Overtime instead of a bonus? Try the <a href="/overtime-calculator/">overtime calculator with taxes</a>.
          </p>
          <p style={{ fontSize: "0.88rem", color: "var(--muted)" }}>
            Sources: NYS Department of Taxation and Finance, NYS-50-T-NYS, NYS-50-T-NYC and NYS-50-T-Y
            (January 2026); NY Paid Family Leave, 2026 rates; IRS Publication 15.
          </p>
        </>
      ),
    };
  }

  if (slug === "tx") {
    return {
      title: `Texas Bonus Tax Calculator ${y} — Bonus After Tax in TX`,
      description: `Texas has no state income tax, so your ${y} bonus only loses the 22% federal withholding plus Social Security and Medicare. See exactly what you keep. Free, no signup.`,
      h1: "Texas bonus tax calculator: no state tax, just the federal cut.",
      lede: "Texas doesn't touch your bonus. Only federal withholding, Social Security and Medicare come out. Here's what that leaves.",
      faq: [
        { q: "Does Texas tax bonuses?", a: "No. Texas has no personal income tax, so there's no state withholding on a bonus, commission or any other pay. There's no state disability or paid leave deduction for employees either." },
        { q: "How much is a bonus taxed in Texas?", a: `About 29.65% when it's paid as its own check: 22% federal plus 7.65% for Social Security and Medicare. A $5,000 bonus leaves about ${usd(fedKeep)}.` },
        { q: "Why did my Texas bonus get taxed more than 22%?", a: "Two common reasons. Social Security and Medicare add 7.65% on top of the 22%. And if your employer added the bonus to a regular paycheck, payroll withholds federal tax as if you earned that much every period, which can push it past 22%. Switch to “Added to a paycheck” to see that version." },
        { q: "Will I get some of it back?", a: "Possibly. If your real federal bracket is 12%, the 22% withholding is more than you'll owe on the bonus, and the difference comes back as a refund. At 24% or higher, you may owe a little more." },
        { q: "Is a bonus taxed differently than my salary?", a: "No, it's all income on your tax return. Only the withholding method is different." },
      ],
      prose: (
        <>
          <h2>What comes out of a Texas bonus</h2>
          <ul>
            <li><strong>Federal</strong> — a flat 22%, or the aggregate method if it rides on a normal paycheck. Over $1 million in bonuses for the year, the excess is withheld at 37%.</li>
            <li><strong>Social Security</strong> — 6.2%, until your pay for the year passes {usd(federal.fica.socialSecurity.wageBase)}.</li>
            <li><strong>Medicare</strong> — 1.45%, plus 0.9% on pay above $200,000.</li>
            <li><strong>Texas</strong> — nothing.</li>
          </ul>
          <p>
            That makes a Texas bonus about as good as it gets: the same $10,000 bonus that leaves about
            {" "}{usd(bonusAfterTax(10000, federal).net)} in Texas leaves much less in New York City. See the difference
            on the <a href="/bonus-tax-calculator/ny/">New York bonus tax calculator</a>.
          </p>
          <p>
            For your regular pay, the <a href="/paycheck-calculator/tx/">Texas paycheck calculator</a> shows
            what each check comes to after federal tax and FICA. For any other state, use the main{" "}
            <a href="/bonus-tax-calculator/">bonus tax calculator</a>.
          </p>
        </>
      ),
    };
  }
  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params;
  const c = copyFor(state);
  if (!c) return {};
  return { title: c.title, description: c.description, alternates: { canonical: `/bonus-tax-calculator/${state}/` } };
}

export default async function StateBonusTax({ params }: { params: Promise<{ state: string }> }) {
  const { state: slug } = await params;
  const st = getState(slug);
  const c = copyFor(slug);
  if (!st || !c) notFound();
  return (
    <ToolPage appName={`takehomepal ${st.name} Bonus Tax Calculator`} title={c.h1} lede={c.lede} faq={c.faq} prose={c.prose}>
      <BonusTaxCalculator federal={loadFederal()} state={st} />
    </ToolPage>
  );
}
