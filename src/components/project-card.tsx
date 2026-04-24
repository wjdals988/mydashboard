import { ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { ProjectVisual } from "@/components/project-visual";
import { type Project, statusTone } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const Icon = project.icon;

  return (
    <article className="grid gap-5 rounded-lg border border-black/10 bg-[var(--panel)] p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:grid-cols-[minmax(0,0.95fr)_minmax(260px,1fr)]">
      <div className="flex flex-col justify-between gap-6 p-1">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusTone[project.status]}`}
            >
              {project.statusLabel}
            </span>
            <span className="font-mono text-xs text-[var(--muted)]">
              {project.year}
            </span>
            <span className="font-mono text-xs text-[var(--muted)]">
              최근 업데이트 {project.updatedAt}
            </span>
          </div>
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-sm font-semibold text-[var(--muted)]">
              <Icon aria-hidden="true" size={17} />
              {project.eyebrow}
            </p>
            <h3 className="text-2xl font-semibold tracking-normal">
              {project.title}
            </h3>
            <p className="max-w-xl leading-7 text-[var(--muted)]">
              {project.summary}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-[var(--ink)]"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            className="inline-flex h-10 items-center gap-2 rounded-md bg-emerald-800 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-900"
            href={`/projects/${project.slug}`}
          >
            상세 보기
            <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
          {project.liveUrl && (
            <a
              className="inline-flex h-10 items-center gap-2 rounded-md border border-emerald-800/25 bg-white px-4 text-sm font-semibold text-emerald-950 shadow-sm transition hover:border-emerald-800/45 hover:bg-emerald-50"
              href={project.liveUrl}
              rel="noreferrer"
              target="_blank"
            >
              바로가기
              <ExternalLink aria-hidden="true" size={16} />
            </a>
          )}
        </div>
      </div>
      <ProjectVisual
        accent={project.accent}
        liveUrl={project.liveUrl}
        title={project.title}
        type={project.visual}
      />
    </article>
  );
}
