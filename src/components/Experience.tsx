"use client";

import { useEffect, useRef, useState } from "react";
import DoorIntro from "./DoorIntro";
import Invitation from "./Invitation";
import PetalRain from "./PetalRain";

/** Orchestrates the gate → petal burst → invitation reveal sequence. */
export default function Experience() {
  const [burst, setBurst] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [entered, setEntered] = useState(false);
  const [petalsOn, setPetalsOn] = useState(false);
  const [guestName, setGuestName] = useState("");
  const burstTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const guest = new URLSearchParams(window.location.search).get("guest");
    if (guest?.trim()) setGuestName(guest.trim().replace(/\s+/g, " ").slice(0, 50));
    return () => window.clearTimeout(burstTimer.current);
  }, []);

  return (
    <>
      <Invitation revealed={revealed} guestName={guestName} entered={entered} />
      <PetalRain active={petalsOn} burst={burst} />
      <DoorIntro
        guestName={guestName}
        onGuestNameChange={setGuestName}
        onOpenStart={() => {
          setRevealed(true);
          const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          if (!reduced) {
            burstTimer.current = window.setTimeout(() => {
              setBurst((b) => b + 1);
              setPetalsOn(true);
            }, 850);
          }
        }}
        onOpenComplete={() => {
          setEntered(true);
          window.requestAnimationFrame(() => document.getElementById("invitation-title")?.focus({ preventScroll: true }));
        }}
      />
      {entered && (
        <button
          type="button"
          className="petal-toggle"
          onClick={() => {
            setPetalsOn((on) => !on);
            if (!petalsOn) setBurst((b) => b + 1);
          }}
          aria-pressed={petalsOn}
          title={petalsOn ? "Pause flower shower" : "Shower flowers"}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {[0, 72, 144, 216, 288].map((r) => (
              <ellipse key={r} cx="12" cy="6.5" rx="3.2" ry="5" transform={`rotate(${r} 12 12)`} fill="currentColor" />
            ))}
            <circle cx="12" cy="12" r="2.6" fill="#ffd54f" />
          </svg>
          <span className="sr-only">{petalsOn ? "Pause flower shower" : "Shower flowers"}</span>
        </button>
      )}
    </>
  );
}
