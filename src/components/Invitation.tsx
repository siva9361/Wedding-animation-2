"use client";

import { useEffect, useRef } from "react";
import { wedding } from "@/data/wedding";
import { downloadCalendarInvite, mapsUrl } from "@/lib/calendar";
import Countdown from "./Countdown";
import CouplePortrait from "./CouplePortrait";
import GuestWelcome from "./GuestWelcome";
import { BetelLeaf, Corner, Divider, Kuthuvilakku, Mandala, Thoranam } from "./Ornaments";

function TempleIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
        <path d="M24 3v4M20 7h8l2 6H18zM16 13h16l2 7H14zM12 20h24l2 8H10zM8 28h32v16H8z" />
        <path d="M20 44v-9a4 4 0 0 1 8 0v9" />
      </g>
    </svg>
  );
}

function GarlandIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M8 8c0 18 8 28 16 28S40 26 40 8" />
        {[10, 13, 17, 22, 26, 31, 35, 38].map((x, i) => (
          <circle key={i} cx={x} cy={8 + Math.sin((i / 7) * Math.PI) * 26} r="2.4" fill="currentColor" />
        ))}
        <path d="M24 36v6M20 44l4-2 4 2" />
      </g>
    </svg>
  );
}

export default function Invitation({ revealed, guestName, entered }: { revealed: boolean; guestName: string; entered: boolean }) {
  const root = useRef<HTMLDivElement>(null);

  // Scroll-triggered reveals
  useEffect(() => {
    if (!revealed || !root.current) return;
    const items = root.current.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [revealed]);

  const share = async () => {
    const url = window.location.href;
    const text = `${wedding.groom.english} & ${wedding.bride.english} — Wedding Invitation · ${wedding.dateLongEn}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: text, text, url });
        return;
      } catch {
        /* user cancelled — fall through to nothing */
        return;
      }
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`, "_blank", "noopener");
  };

  return (
    <main ref={root} inert={!entered} aria-hidden={!entered} className={`invite ${revealed ? "invite--revealed" : ""}`}>
      {/* ───────── HERO ───────── */}
      <section className="hero">
        <Thoranam className="hero__thoranam" id="hero-th" />
        <Mandala className="hero__bg-mandala" size="min(130vw, 980px)" spin />

        <Kuthuvilakku className="hero__lamp hero__lamp--l" />
        <Kuthuvilakku className="hero__lamp hero__lamp--r" />

        <div className="hero__inner">
          <GuestWelcome guestName={guestName} />
          <Mandala className="hero__seal" size={112}>
            <span className="hero__pillaiyar">உ</span>
          </Mandala>

          <p className="hero__blessing stagger" style={{ ["--d" as string]: "0.2s" }}>
            இறைவன் திருவருளுடன்
          </p>
          <h1 id="invitation-title" tabIndex={-1} className="hero__title stagger" style={{ ["--d" as string]: "0.35s" }}>
            திருமண அழைப்பிதழ்
          </h1>
          <p className="hero__subtitle stagger" style={{ ["--d" as string]: "0.5s" }}>
            Wedding Invitation
          </p>

          <div className="couple stagger" style={{ ["--d" as string]: "0.7s" }}>
            <div className="couple__person">
              <span className="couple__honor">திருநிறைச்செல்வன்</span>
              <span className="couple__name">
                {wedding.initial} {wedding.groom.tamil}
              </span>
              <span className="couple__degree">{wedding.groom.degree}</span>
            </div>

            <div className="couple__amp" aria-hidden="true">
              <span>&amp;</span>
            </div>

            <div className="couple__person">
              <span className="couple__honor">திருநிறைச்செல்வி</span>
              <span className="couple__name">
                {wedding.initial} {wedding.bride.tamil}
              </span>
              <span className="couple__degree">{wedding.bride.degree}</span>
            </div>
          </div>

          <p className="hero__script stagger" style={{ ["--d" as string]: "0.95s" }}>
            {wedding.groom.english} <span>weds</span> {wedding.bride.english}
          </p>

          <div className="date-ribbon stagger" style={{ ["--d" as string]: "1.1s" }}>
            <span className="date-ribbon__day">{wedding.dayTa}</span>
            <span className="date-ribbon__date">{wedding.dateDisplay}</span>
            <span className="date-ribbon__en">{wedding.dateLongEn}</span>
          </div>

        </div>
      </section>

      <CouplePortrait />

      {/* ───────── MESSAGE ───────── */}
      <section id="invitation" className="section">
        <div className="paper" data-reveal>
          <Corner className="paper__corner paper__corner--tl" />
          <Corner className="paper__corner paper__corner--tr" />
          <Corner className="paper__corner paper__corner--bl" />
          <Corner className="paper__corner paper__corner--br" />

          <p className="paper__eyebrow">அன்பிற்கினிய {guestName} &amp; family,</p>
          <p className="paper__ta">{wedding.invitationTa}</p>
          <Divider className="paper__divider" />
          <p className="paper__en">{wedding.invitationEn}</p>
        </div>
      </section>

      {/* ───────── COUNTDOWN ───────── */}
      <section className="section section--count">
        <h2 className="section__title" data-reveal>
          மங்கல நாள் வரை
          <small>Counting down to the auspicious day</small>
        </h2>
        <div data-reveal>
          <Countdown target={wedding.dateISO} />
        </div>
      </section>

      {/* ───────── EVENTS ───────── */}
      <section className="section">
        <h2 className="section__title" data-reveal>
          விழா விவரம்
          <small>Celebrations</small>
        </h2>

        <div className="events">
          {wedding.events.map((ev, i) => (
            <article key={ev.id} className="event" data-reveal style={{ ["--d" as string]: `${i * 0.15}s` }}>
              <BetelLeaf className="event__leaf">{i === 0 ? <TempleIcon /> : <GarlandIcon />}</BetelLeaf>
              <h3 className="event__title">{ev.titleTa}</h3>
              <p className="event__title-en">{ev.titleEn}</p>
              <Divider className="event__divider" />
              <p className="event__date">
                {wedding.dateDisplay} · {wedding.dayTa}
              </p>
              {ev.timeTa && <p className="event__time">{ev.timeTa}</p>}
              <p className="event__venue">{ev.venueTa}</p>
              <p className="event__address">{ev.addressTa}</p>
              <p className="event__venue-en">{ev.venueEn}</p>
              <p className="event__address-en">{ev.addressEn}</p>
              <a className="btn btn--ghost" href={mapsUrl(ev.mapQuery)} target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"
                  />
                </svg>
                வழி காட்டி · Directions
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* ───────── ACTIONS ───────── */}
      <section className="section section--actions" data-reveal>
        <button type="button" className="btn btn--gold" onClick={downloadCalendarInvite}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7zm-2 8h14v10H5V10zm2 2v2h2v-2H7zm4 0v2h2v-2h-2z"
            />
          </svg>
          நாட்காட்டியில் சேர் · Save the Date
        </button>
        <button type="button" className="btn btn--leaf" onClick={share}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M18 16a3 3 0 0 0-2.4 1.2l-6.7-3.4a3 3 0 0 0 0-1.6l6.7-3.4A3 3 0 1 0 15 7c0 .3 0 .5.1.8L8.4 11.2a3 3 0 1 0 0 3.6l6.7 3.4A3 3 0 1 0 18 16z"
            />
          </svg>
          பகிர்க · Share
        </button>
      </section>

      {/* ───────── FOOTER ───────── */}
      <footer className="footer" data-reveal>
        <Divider className="footer__divider" />
        <p className="footer__closing">{wedding.closingTa}</p>
        <p className="footer__hosts">{wedding.hostsTa}</p>
        <p className="footer__couple">
          {wedding.groom.english} <span>&amp;</span> {wedding.bride.english}
        </p>
        <Thoranam className="footer__thoranam" id="foot-th" />
      </footer>
    </main>
  );
}
