"use client";

import { useEffect, useState } from "react";
import { GA_ID } from "@/lib/site";

/**
 * Consent-gated Google Analytics (same gate as aistatement / robloxoutfits).
 *
 * Nothing from Google loads until the visitor accepts: gtag.js is injected at runtime, so a
 * declined or undecided visit makes zero third-party requests and sets no analytics cookies.
 * Google signals and ad personalisation stay off — page counts only.
 */

const KEY = "thp-consent";

type Choice = "accepted" | "declined";

export function AnalyticsConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(KEY);
    } catch {
      // Private mode: undecided, which means no tracking.
    }
    if (stored === "accepted") {
      loadAnalytics();
      return;
    }
    if (stored === "declined") return;
    // Delay so the banner never competes with first paint, and a visitor who bounces is never tracked.
    const t = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(t);
  }, []);

  function decide(choice: Choice) {
    try {
      localStorage.setItem(KEY, choice);
    } catch {
      /* the choice still applies for this page view */
    }
    setShow(false);
    if (choice === "accepted") loadAnalytics();
  }

  if (!show) return null;

  return (
    <div role="dialog" aria-live="polite" aria-label="Analytics consent" className="consent">
      <div className="wrap consent-inner">
        <p>
          <strong>Analytics:</strong> we use Google Analytics to count which calculators get used. It
          sets cookies, so it stays off until you say yes. Your numbers never leave your browser
          either way. <a href="/privacy/">Privacy</a>
        </p>
        <div className="consent-actions">
          <button type="button" className="btn ghost" onClick={() => decide("declined")}>No thanks</button>
          <button type="button" className="btn" onClick={() => decide("accepted")}>Allow analytics</button>
        </div>
      </div>
    </div>
  );
}

/** Injects gtag.js once; repeated calls are no-ops. */
function loadAnalytics() {
  const w = window as unknown as { __thpGaLoaded?: boolean; dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };
  if (w.__thpGaLoaded) return;
  w.__thpGaLoaded = true;

  w.dataLayer = w.dataLayer || [];
  // Must push the `arguments` object, exactly like Google's snippet. gtag.js ignores plain arrays,
  // so a rest-args version (push(args)) silently records nothing.
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  };
  w.gtag("js", new Date());
  w.gtag("config", GA_ID, { allow_google_signals: false, allow_ad_personalization_signals: false });

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}
