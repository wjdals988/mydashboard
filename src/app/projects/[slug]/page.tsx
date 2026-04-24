import { ArrowLeft, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectVisual } from "@/components/project-visual";
import { getProject, projects, statusTone } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: "프로젝트 없음 | JM 프로젝트 보드",
    };
  }

  return {
    title: `${project.title} | JM 프로젝트 보드`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const Icon = project.icon;

  return (
    <main className="min-h-screen px-5 py-8 md:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <nav className="flex items-center justify-between gap-4">
          <Link
            className="inline-flex h-10 items-center gap-2 rounded-md border border-black/10 bg-white/70 px-4 text-sm font-semibold"
            href="/"
          >
            <ArrowLeft aria-hidden="true" size={16} />
            목록으로
          </Link>
          <span className="font-mono text-xs text-[var(--muted)]">
            최근 업데이트 {project.updatedAt}
          </span>
        </nav>

        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusTone[project.status]}`}
              >
                {project.statusLabel}
              </span>
              <span className="flex items-center gap-2 text-sm font-semibold text-[var(--muted)]">
                <Icon aria-hidden="true" size={17} />
                {project.eyebrow}
              </span>
              <span className="font-mono text-xs text-[var(--muted)]">
                {project.year}
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-normal md:text-6xl">
                {project.title}
              </h1>
              <p className="text-lg leading-8 text-[var(--muted)]">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  className="rounded-full border border-black/10 bg-white/80 px-3 py-1 text-sm"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>

            {project.liveUrl && (
              <a
                className="inline-flex h-11 items-center gap-2 rounded-md bg-emerald-800 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-900"
                href={project.liveUrl}
                rel="noreferrer"
                target="_blank"
              >
                서비스 열기
                <ExternalLink aria-hidden="true" size={16} />
              </a>
            )}
          </div>

          <ProjectVisual
            accent={project.accent}
            liveUrl={project.liveUrl}
            title={project.title}
            type={project.visual}
          />
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <DetailBlock title="주요 기능" items={project.highlights} />
          <DetailBlock title="추후 과제" items={project.nextSteps} />
        </section>
      </div>
    </main>
  );
}

function DetailBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-lg border border-black/10 bg-[var(--panel)] p-5 shadow-sm">
      <h2 className="text-xl font-semibold">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li className="flex gap-3 leading-7 text-[var(--muted)]" key={item}>
            <span className="mt-3 size-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
