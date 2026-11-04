import { ImageResponse } from "next/og";
import { wedding } from "@/data/wedding";

export const alt = `${wedding.groom.english} & ${wedding.bride.english} — Wedding Invitation`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Link-preview card shown when the invitation is shared on WhatsApp etc. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 50% 40%, #7a1426 0%, #3b0a12 70%)",
          color: "#f6d98b",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 1120,
            height: 550,
            border: "3px solid #d4a843",
            borderRadius: 12,
          }}
        >
          <div style={{ fontSize: 30, letterSpacing: 12, textTransform: "uppercase", color: "#e9c770" }}>
            Wedding Invitation
          </div>
          <div style={{ fontSize: 96, marginTop: 24, color: "#fff3cf", fontStyle: "italic" }}>
            {`${wedding.groom.english} & ${wedding.bride.english}`}
          </div>
          <div style={{ width: 360, height: 2, background: "#d4a843", margin: "28px 0" }} />
          <div style={{ fontSize: 40, color: "#f6d98b" }}>{wedding.dateLongEn}</div>
          <div style={{ fontSize: 30, marginTop: 14, color: "#e8cfa0" }}>Vennaimalai · Karur</div>
        </div>
      </div>
    ),
    size,
  );
}
