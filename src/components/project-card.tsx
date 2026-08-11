import { ArrowDownToLine, ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { ProjectIcon } from "@/components/project-icon";
import { ProjectVisual } from "@/components/project-visual";
import { type Project, statusDot, statusTone } from "@/lib/projects";

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <article
      className="rise group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 hover:border-line-strong hover:shadow-[var(--shadow-lift)]"
      style={{ animationDelay: `${Math.min(index, 5) * 60}ms` }}
    >
      <div className="border-b border-line bg-surface-2 p-3">
        <ProjectVisual
          accent={project.accent}
          title={project.title}
          type={project.visual}
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusTone[project.status]}`}
          >
            <span className={`size-1.5 rounded-full ${statusDot[project.status]}`} />
            {project.statusLabel}
          </span>
          <span className="num font-mono text-xs text-subtle">
            {project.updatedAt}
          </span>
        </div>

        <div className="space-y-2">
          <p className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
            <ProjectIcon name={project.icon} size={13} />
            {project.eyebrow}
          </p>
          <h3 className="text-xl font-medium tracking-[-0.01em]">
            {project.title}
          </h3>
          <p className="text-sm leading-6 text-muted">{project.summary}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              className="rounded-md border border-line bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
          <Link
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-fg px-4 text-sm font-medium text-bg transition hover:opacity-90"
            href={`/projects/${project.slug}`}
          >
            상세 보기
            <ArrowUpRight
              aria-hidden="true"
              className="transition group-hover:translate-x-0.5"
              size={14}
            />
          </Link>
          {project.liveUrl && (
            <a
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-surface-2 px-4 text-sm font-medium transition hover:border-line-strong"
              href={project.liveUrl}
              rel="noreferrer"
              target="_blank"
            >
              바로가기
              <ExternalLink aria-hidden="true" size={14} />
            </a>
          )}
          {project.apk && (
            <a
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-surface-2 px-4 text-sm font-medium transition hover:border-line-strong"
              download
              href={project.apk.url}
              rel="noreferrer"
            >
              APK
              <span className="num font-mono text-xs text-subtle">
                v{project.apk.version}
              </span>
              <ArrowDownToLine aria-hidden="true" size={14} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
