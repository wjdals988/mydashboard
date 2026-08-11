import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ProjectIcon } from "@/components/project-icon";
import { projects } from "@/lib/projects";

export default function NotFound() {
  return (
    <main className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="space-y-4">
          <p className="num font-mono text-xs uppercase tracking-[0.16em] text-accent">
            404
          </p>
          <h1 className="text-3xl font-medium tracking-[-0.02em] md:text-4xl">
            찾는 페이지가 없습니다
          </h1>
          <p className="text-sm leading-6 text-muted">
            주소가 바뀌었거나 아직 공개하지 않은 프로젝트일 수 있습니다. 아래
            목록에서 골라 주세요.
          </p>
        </div>

        <ul className="grid gap-2">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                className="flex items-center gap-3 rounded-xl border border-line bg-surface p-4 transition hover:border-line-strong hover:bg-surface-2"
                href={`/projects/${project.slug}`}
              >
                <span
                  className="grid size-9 shrink-0 place-items-center rounded-lg text-white"
                  style={{ backgroundColor: project.accent }}
                >
                  <ProjectIcon name={project.icon} size={16} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">
                    {project.title}
                  </span>
                  <span className="block truncate text-xs text-subtle">
                    {project.summary}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          className="inline-flex h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg transition hover:opacity-90"
          href="/"
        >
          <ArrowLeft aria-hidden="true" size={15} />
          홈으로
        </Link>
      </div>
    </main>
  );
}
