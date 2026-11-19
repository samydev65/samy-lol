import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

// The preview image shown when samy.lol is shared on Discord, iMessage, X, etc.
export const alt = "samy.lol, my personal homepage";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const sprite = fs.readFileSync(path.join(process.cwd(), "public", "me.png")).toString("base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", alignItems: "center",
          background: "#f6f6f6", padding: "60px 80px", gap: 70,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${sprite}`}
          width={352}
          height={440}
          style={{ border: "2px solid #a2a9b1", imageRendering: "pixelated" }}
          alt=""
        />
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 96, fontFamily: "serif", color: "#202122", borderBottom: "2px solid #a2a9b1", paddingBottom: 10 }}>
            samy.lol
          </div>
          <div style={{ fontSize: 30, color: "#54595d", marginTop: 18 }}>From samy.lol, the personal homepage</div>
          <div style={{ fontSize: 40, color: "#202122", marginTop: 40, lineHeight: 1.3 }}>
            Projects, videos and notes on computer engineering, cloud and AI.
          </div>
        </div>
      </div>
    ),
    size
  );
}
