"use client";

import { useEffect, useRef, useState } from "react";
import { wedding } from "@/data/wedding";
import { JasmineString, Kuthuvilakku, Mandala } from "./Ornaments";

export type GateState = "closed" | "opening" | "open";

interface DoorIntroProps {
  guestName: string;
  onGuestNameChange: (name: string) => void;
  onOpenStart: () => void;
  onOpenComplete: () => void;
}

/** Synthesised temple bell — inharmonic partials with a long decay. */
function ringBell() {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AC();
    const master = ctx.createGain();
    master.gain.value = 0.22;
    master.connect(ctx.destination);
    const strike = (at: number) => {
      const base = 523;
      [1, 2.76, 5.4, 8.93].forEach((ratio, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = base * ratio;
        const t = ctx.currentTime + at;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(1 / (i + 1), t + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 3.2 / (i * 0.6 + 1));
        osc.connect(gain).connect(master);
        osc.start(t);
        osc.stop(t + 3.5);
      });
    };
    strike(0);
    strike(0.55);
    setTimeout(() => ctx.close(), 5000);
  } catch {
    /* audio is a nicety; ignore failures */
  }
}

export default function DoorIntro({ guestName, onGuestNameChange, onOpenStart, onOpenComplete }: DoorIntroProps) {
  const [state, setState] = useState<GateState>("closed");
  const opening = useRef(false);
  const timer = useRef<number | undefined>(undefined);
  const guestInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("is-locked", state !== "open");
    return () => document.documentElement.classList.remove("is-locked");
  }, [state]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const open = () => {
    if (opening.current) return;
    const name = guestName.trim().replace(/\s+/g, " ");
    if (!name) {
      guestInput.current?.focus();
      return;
    }
    opening.current = true;
    onGuestNameChange(name);
    const url = new URL(window.location.href);
    url.searchParams.set("guest", name);
    window.history.replaceState(null, "", url);
    ringBell();
    setState("opening");
    onOpenStart();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timer.current = window.setTimeout(() => {
      setState("open");
      onOpenComplete();
    }, reduced ? 1000 : 3600);
  };

  if (state === "open") return null;

  return (
    <div className="gate gate--compact" data-state={state} role="dialog" aria-modal="true" aria-labelledby="gate-heading" aria-describedby="gate-description" onKeyDown={(event) => {
      if (event.key !== "Tab") return;
      if (state !== "closed") { event.preventDefault(); return; }
      const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("input:not(:disabled), button:not(:disabled)"));
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && (document.activeElement === first || !event.currentTarget.contains(document.activeElement))) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !event.currentTarget.contains(document.activeElement))) {
        event.preventDefault(); first?.focus();
      }
    }}>
      <div className="gate__light" aria-hidden="true" />

      <div className="gate__stage">
        <div className="gate__arch" aria-hidden="true" />
        <div className="gate__doors">
          {(["left", "right"] as const).map((side) => (
            <div key={side} className={`door door--${side}`}>
              <div className="door__face">
                <div className="door__studs door__studs--top" />
                <div className="door__panels">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="door__panel" />
                  ))}
                </div>
                <div className="door__studs door__studs--bottom" />
                <Mandala className="door__medallion" size="min(76vmin, 640px)" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <JasmineString className="gate__jasmine gate__jasmine--l" length={12} />
      <JasmineString className="gate__jasmine gate__jasmine--r" length={12} />
      <Kuthuvilakku className="gate__lamp gate__lamp--l" />
      <Kuthuvilakku className="gate__lamp gate__lamp--r" />

      <div className="gate__center">
      <div className="gate__content">
        <span className="gate__pillaiyar">உ</span>
        <p className="gate__eyebrow">A special invitation</p>
        <h1 id="gate-heading" className="gate__welcome">{guestName.trim() ? <>Welcome, <span>{guestName.trim()}</span></> : <>You’re <span>invited</span></>}</h1>
        <p id="gate-description" className="gate__message">You and your family are warmly invited<br />to celebrate the wedding of</p>
        <p className="gate__names">
          <span>{wedding.groom.english}</span>
          <em>&amp;</em>
          <span>{wedding.bride.english}</span>
        </p>
        <p className="gate__date">
          {wedding.dateDisplay} · {wedding.dayTa}
        </p>
        <form className="gate__form" onSubmit={(event) => { event.preventDefault(); open(); }}>
          <label className="sr-only" htmlFor="guest-name">Enter your name</label>
          <div className="gate__input-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path d="M5 21v-3a7 7 0 0 1 14 0v3" /></svg>
            <input ref={guestInput} id="guest-name" name="guest" autoComplete="given-name" enterKeyHint="go" aria-describedby="guest-name-hint" value={guestName} maxLength={50} required disabled={state !== "closed"} onChange={(event) => onGuestNameChange(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && event.nativeEvent.isComposing) event.preventDefault(); }} placeholder="Enter your name" />
            <button type="submit" className="gate__enter" disabled={state !== "closed" || !guestName.trim()} aria-label="Open invitation"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></button>
          </div>
          <p id="guest-name-hint" className="gate__hint">Press Enter to open your invitation <span aria-hidden="true">↵</span></p>
        </form>
        <p className="gate__footnote">With love, from our family to yours</p>
      </div>
      </div>
      <div className="gate__opening-welcome" role="status">
        {state === "opening" && <><span>வாருங்கள், வரவேற்கிறோம்</span><p>Welcome, {guestName}</p><small>Come celebrate with our family</small></>}
      </div>
    </div>
  );
}
