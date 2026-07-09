import { ImageResponse } from "next/og";

export const alt = "Poole Media — AI-Driven Digital Marketing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#080810",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: "50%",
            marginLeft: -400,
            width: 800,
            height: 800,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: "white",
              letterSpacing: "-3px",
              lineHeight: 1,
            }}
          >
            Poole Media
          </div>

          {/* Gradient accent bar */}
          <div
            style={{
              width: 180,
              height: 4,
              borderRadius: 2,
              background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
            }}
          />

          <div
            style={{
              fontSize: 26,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.5px",
              marginTop: 4,
            }}
          >
            AI-Driven Digital Marketing · Tri-Cities, WA
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
