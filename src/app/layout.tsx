import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Great_Vibes, Mukta_Malar, Noto_Serif_Tamil } from "next/font/google";
import { wedding } from "@/data/wedding";
import "./globals.css";

const serifTamil = Noto_Serif_Tamil({
  subsets: ["tamil", "latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-serif-ta",
  display: "swap",
});

const sansTamil = Mukta_Malar({
  subsets: ["tamil", "latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans-ta",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif-en",
  display: "swap",
});

const script = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

const title = `${wedding.groom.english} & ${wedding.bride.english} · திருமண அழைப்பிதழ்`;
const description = `${wedding.dateLongEn} · ${wedding.events[0].venueEn}, ${wedding.events[0].addressEn}. You are cordially invited.`;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title,
  description,
  openGraph: { title, description, type: "website", locale: "ta_IN" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#3b0a12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ta"
      className={`${serifTamil.variable} ${sansTamil.variable} ${cormorant.variable} ${script.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
