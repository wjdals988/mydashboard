import {
  ArrowDownToLine,
  ArrowUpRight,
  ChevronRight,
  Globe,
  Smartphone,
} from "lucide-react";

import Link from "next/link";
import { ProjectArtwork } from "@/components/project-artwork";
import {
  type Project,
  platformsOf,
  statusDot,
  statusTone,
} from "@/lib/projects";

export function ProjectCard({
  project,
  catalogHref = "/#projects",
}: {
  project: Project;
  catalogHref?: string;
}) {
  const detailHref = `/projects/${project.slug}?from=${encodeURIComponent(catalogHref)}`;
  const platforms = platformsOf(project);
  const action = project.liveUrl
    ? { href: project.liveUrl, label: "서비스 열기", icon: ArrowUpRight }
    : project.apk
      ? { href: project.apk.url, label: "앱 다운로드", icon: ArrowDownToLine }
      : null;
  const ActionIcon = action?.icon;

  return (
    <article className="project-card" data-project-key={project.slug}>
      <Link
        className="project-cover"
        data-tilt
        href={detailHref}
        aria-label={`${project.title} 화면과 상세 정보 보기`}
      >
        <ProjectArtwork project={project} />
      </Link>
      <div className="project-card-body">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className={`status ${statusTone[project.status]}`}>
            <span
              aria-hidden="true"
              className={`size-1.5 rounded-full ${statusDot[project.status]}`}
            />
            {project.statusLabel}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted">
            {platforms.includes("web") ? (
              <Globe aria-hidden="true" size={14} />
            ) : (
              <Smartphone aria-hidden="true" size={14} />
            )}
            {platforms.map((x) => (x === "web" ? "웹" : "Android")).join(" / ")}
          </span>
        </div>
        <div>
          <h3>
            <Link href={detailHref}>{project.title}</Link>
          </h3>
          <p className="project-summary mt-2">{project.summary}</p>
        </div>
        <div className="project-tags" aria-label="주요 기술">
          {project.tags.slice(0, 3).join(" / ")}
        </div>
        {project.apk && (
          <p className="text-xs text-muted">
            {project.apk.label === "signed release APK"
              ? "정식 서명 릴리스"
              : "개발 프리뷰"}{" "}
            <span className="num">v{project.apk.version}</span>
          </p>
        )}
        {platforms.includes("android") && !project.apk && (
          <p className="text-xs text-muted">
            설치 파일은 아직 공개하지 않았어요.
          </p>
        )}
        <div className="project-actions">
          {action && ActionIcon && (
            <a
              className="text-link"
              href={action.href}
              aria-label={`${project.title} ${action.label}${project.liveUrl ? " (새 탭)" : ""}`}
              target={project.liveUrl ? "_blank" : undefined}
              rel="noreferrer"
              download={project.liveUrl ? undefined : true}
            >
              {action.label}
              <ActionIcon aria-hidden="true" size={16} />
            </a>
          )}
          <Link
            className="text-link project-detail-link"
            href={detailHref}
            aria-label={`${project.title} 상세 보기`}
          >
            작업 기록
            <ChevronRight aria-hidden="true" size={16} />
          </Link>
        </div>
        <p className="num text-xs text-subtle">
          업데이트{" "}
          <time dateTime={project.updatedAt.replaceAll(".", "-")}>
            {project.updatedAt}
          </time>
        </p>
      </div>
    </article>
  );
}
