"use client";

import { useEffect, useState } from "react";

const UNITS = [
  { key: "days", ta: "நாட்கள்", en: "Days", ms: 86_400_000 },
  { key: "hours", ta: "மணி", en: "Hours", ms: 3_600_000 },
  { key: "minutes", ta: "நிமிடம்", en: "Minutes", ms: 60_000 },
  { key: "seconds", ta: "வினாடி", en: "Seconds", ms: 1_000 },
] as const;

export default function Countdown({ target }: { target: string }) {
  // Render nothing time-dependent on the server to avoid hydration mismatch.
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const end = new Date(target).getTime();
  const diff = now === null ? null : end - now;

  if (diff !== null && diff <= 0) {
    const sameDay = diff > -24 * 3_600_000;
    return (
      <p className="countdown__done">
        {sameDay ? "இன்று திருமண நாள்! · Today is the day" : "திருமணம் இனிதே நடைபெற்றது · Thank you for your blessings"}
      </p>
    );
  }

  let rest = diff ?? 0;
  return (
    <div className="countdown" role="timer" aria-live="off">
      {UNITS.map((u) => {
        const value = Math.floor(rest / u.ms);
        rest -= value * u.ms;
        return (
          <div key={u.key} className="countdown__cell">
            <span className="countdown__num">{now === null ? "--" : String(value).padStart(2, "0")}</span>
            <span className="countdown__ta">{u.ta}</span>
            <span className="countdown__en">{u.en}</span>
          </div>
        );
      })}
    </div>
  );
}
