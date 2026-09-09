import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "VEYRA ESTATE — недвижимость в Таиланде";

export default function OpengraphImage() {
  const lockup = readFileSync(join(process.cwd(), "public/assets/veyra-lockup.svg")).toString("base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 46,
          background: "#14201E",
        }}
      >
        <img src={`data:image/svg+xml;base64,${lockup}`} width={300} height={224} alt="" />
        <div style={{ display: "flex", width: 150, height: 1, background: "#C39A5F", opacity: 0.5 }} />
        <div
          style={{
            display: "flex",
            color: "#F2EDE4",
            fontSize: 30,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          Недвижимость в Таиланде
        </div>
        <div style={{ display: "flex", color: "#C39A5F", fontSize: 26, opacity: 0.85 }}>
          Пхукет и Паттайя · инвестиции, аренда, зимовка
        </div>
      </div>
    ),
    { ...size },
  );
}
