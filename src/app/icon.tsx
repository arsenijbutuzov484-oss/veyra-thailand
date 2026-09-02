import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1F2528",
          color: "#C8B99A",
          fontSize: 34,
          fontFamily: "Georgia, serif",
        }}
      >
        V
      </div>
    ),
    { ...size },
  );
}
