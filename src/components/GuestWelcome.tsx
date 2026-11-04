"use client";

import { useEffect, useRef, useState } from "react";

export default function GuestWelcome({ guestName }: { guestName: string }) {
  const [status, setStatus] = useState("");
  const resetTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  async function copyLink() {
    const url = new URL(window.location.href);
    url.searchParams.set("guest", guestName);
    url.hash = "";
    try {
      await navigator.clipboard.writeText(url.toString());
      setStatus("Personal invitation link copied");
    } catch {
      setStatus("Copy this page’s address to share your personal invitation.");
    }
    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setStatus(""), 5000);
  }

  return (
    <div className="guest-welcome stagger" style={{ ["--d" as string]: "0.1s" }}>
      <span className="guest-welcome__ornament" aria-hidden="true">✦</span>
      <p>Welcome, <strong>{guestName}</strong><small>You and your family are a special part of our celebration.</small></p>
      <button type="button" onClick={copyLink} aria-label={`Copy invitation link for ${guestName}`} title="Copy your personal invitation link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="3" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></svg></button>
      <span className="guest-welcome__status" role="status">{status}</span>
    </div>
  );
}
