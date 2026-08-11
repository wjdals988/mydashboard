import { ImageResponse } from "next/og";
import { projectStats } from "@/lib/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "JM project board";

// Satori는 woff2 가변 글꼴을 읽지 못하고 기본 글꼴에 한글 자형이 없다.
// 그래서 OG 이미지 문자열은 의도적으로 영문/숫자만 사용한다.
export default function OpengraphImage() {
  const stats = projectStats();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08090b",
          padding: 72,
          color: "#f3f5f7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 12,
              background: "#3ecf8e",
              color: "#04231a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            JM
          </div>
          <div style={{ fontSize: 22, color: "#9aa4af", letterSpacing: 2 }}>
            PROJECT BOARD
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            <div>Products I build,</div>
            <div>ship and run</div>
          </div>
          <div style={{ fontSize: 26, color: "#9aa4af" }}>
            Web services and signed Android releases
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {[
            [`${stats.total}`, "projects"],
            [`${stats.liveServices}`, "live services"],
            [`${stats.downloads}`, "APK downloads"],
          ].map(([value, label]) => (
            <div
              key={label}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                padding: "18px 26px",
                borderRadius: 16,
                border: "1px solid #1e232a",
                background: "#0e1014",
              }}
            >
              <div style={{ fontSize: 34, fontWeight: 700 }}>{value}</div>
              <div style={{ fontSize: 18, color: "#6c757f" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
