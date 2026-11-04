import { wedding } from "@/data/wedding";

const toICSDate = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

/** Builds and downloads an .ics file so guests can save the date. */
export function downloadCalendarInvite() {
  const start = new Date(wedding.dateISO);
  const date = wedding.dateISO.slice(0, 10).replace(/-/g, "");
  const nextDay = new Date(`${wedding.dateISO.slice(0, 10)}T00:00:00Z`);
  nextDay.setUTCDate(nextDay.getUTCDate() + 1);
  const endDate = nextDay.toISOString().slice(0, 10).replace(/-/g, "");
  const venue = wedding.events[0];
  const title = `${wedding.groom.english} & ${wedding.bride.english} — Wedding`;

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${start.getTime()}-wedding@invite`,
    `DTSTAMP:${toICSDate(new Date())}`,
    `DTSTART;VALUE=DATE:${date}`,
    `DTEND;VALUE=DATE:${endDate}`,
    `SUMMARY:${title}`,
    `LOCATION:${`${venue.venueEn}, ${venue.addressEn}`.replace(/,/g, "\\,")}`,
    `DESCRIPTION:${wedding.invitationEn}`,
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    `DESCRIPTION:${title} tomorrow`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "suresh-vaanmathi-wedding.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export const mapsUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
