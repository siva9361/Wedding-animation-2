/**
 * All invitation content lives here — edit this file to change names,
 * venues or timings. Values were transcribed from the printed card.
 */

export interface Person {
  tamil: string;
  english: string;
  degree: string;
}

export interface WeddingEvent {
  id: string;
  titleTa: string;
  titleEn: string;
  venueTa: string;
  venueEn: string;
  addressTa: string;
  addressEn: string;
  /** Free text shown under the date, e.g. "காலை 6.00 – 7.30". Leave empty to hide. */
  timeTa: string;
  /** Google Maps search query for the "Directions" button. */
  mapQuery: string;
}

export interface Wedding {
  couplePhoto: { src: string; alt: string; isSample: boolean };
  groom: Person;
  bride: Person;
  initial: string;
  dateISO: string;
  dateDisplay: string;
  dayTa: string;
  dayEn: string;
  dateLongEn: string;
  events: WeddingEvent[];
  invitationTa: string;
  invitationEn: string;
  hostsTa: string;
  closingTa: string;
}

export const wedding: Wedding = {
  couplePhoto: { src: "/images/couple.webp", alt: "Suresh and Vaanmathi together at their wedding celebration", isSample: false },
  groom: { tamil: "சுரேஷ்", english: "Suresh", degree: "B.Com.," },
  bride: { tamil: "வான்மதி", english: "Vaanmathi", degree: "M.A., B.Ed.," },
  initial: "M.",

  /** The printed card gives a date without a time; count down to the day in IST. */
  dateISO: "2026-11-15T00:00:00+05:30",
  dateDisplay: "15 · 11 · 2026",
  dayTa: "ஞாயிற்றுக்கிழமை",
  dayEn: "Sunday",
  dateLongEn: "Sunday, 15 November 2026",

  events: [
    {
      id: "muhurtham",
      titleTa: "திருமண முகூர்த்தம்",
      titleEn: "Wedding Ceremony",
      venueTa: "அருள்மிகு ஸ்ரீ பாலசுப்பிரமணியசுவாமி திருக்கோவில்",
      venueEn: "Arulmigu Sri Balasubramaniya Swamy Temple",
      addressTa: "வெண்ணெய்மலை, கரூர்",
      addressEn: "Vennaimalai, Karur",
      timeTa: "",
      mapQuery: "Arulmigu Balasubramaniya Swamy Temple Vennaimalai Karur",
    },
    {
      id: "reception",
      titleTa: "வரவேற்பு",
      titleEn: "Reception",
      venueTa: "M.S. திருமண மண்டபம்",
      venueEn: "M.S. Thirumana Mandapam",
      addressTa: "வடக்குபாளையம், கரூர்",
      addressEn: "Vadakkupalayam, Karur",
      timeTa: "",
      mapQuery: "M.S. Thirumana Mandapam Vadakkupalayam Karur",
    },
  ],

  invitationTa:
    "எங்கள் இல்லத் திருமண விழாவிற்கு தாங்கள் தங்கள் குடும்பத்தினருடன் வருகை தந்து, மணமக்களை வாழ்த்தி அருளுமாறு அன்புடன் அழைக்கிறோம்.",
  invitationEn:
    "With the blessings of the Almighty and our elders, we joyfully invite you and your family to grace the wedding and bless the couple.",

  hostsTa: "உற்றார் · உறவினர்கள் · நண்பர்கள்",
  closingTa: "தங்கள் நல்வரவை விரும்பும்",
};
