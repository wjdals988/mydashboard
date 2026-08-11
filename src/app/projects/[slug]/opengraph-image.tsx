import { ImageResponse } from "next/og";
import { getProject, projects } from "@/lib/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "JM project board";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

const statusText = {
  live: "LIVE",
  building: "IN PROGRESS",
  "personal-use": "PERSONAL USE",
} as const;

// 한글 자형이 없는 기본 글꼴을 쓰므로 영문 eyebrow와 slug만 노출한다.
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  const accent = project?.accent ?? "#3ecf8e";

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
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 8,
            background: accent,
          }}
        />

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

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "8px 18px",
              borderRadius: 999,
              border: `1px solid ${accent}`,
              color: accent,
              fontSize: 20,
              letterSpacing: 1.5,
              alignSelf: "flex-start",
            }}
          >
            {statusText[project?.status ?? "building"]}
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            {project?.eyebrow ?? "Project"}
          </div>
          <div style={{ fontSize: 26, color: "#9aa4af", fontFamily: "monospace" }}>
            {`/projects/${slug}`}
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, fontSize: 20 }}>
          {(project?.tags ?? []).slice(0, 5).map((tag) => (
            <div
              key={tag}
              style={{
                padding: "12px 20px",
                borderRadius: 12,
                border: "1px solid #1e232a",
                background: "#0e1014",
                color: "#9aa4af",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
