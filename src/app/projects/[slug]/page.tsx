import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowUpRight,
  Check,
  CircleDot,
  ExternalLink,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyButton } from "@/components/copy-button";
import { ProjectIcon } from "@/components/project-icon";
import { ProjectVisual } from "@/components/project-visual";
import {
  type ProjectApk,
  getProject,
  projects,
  statusDot,
  statusTone,
} from "@/lib/projects";

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
    return { title: "프로젝트 없음" };
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/projects/${project.slug}`,
      title: project.title,
      description: project.summary,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const others = projects.filter((item) => item.slug !== project.slug).slice(0, 3);

  return (
    <main className="px-5 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="flex items-center justify-between gap-4">
          <Link
            className="inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-medium text-muted transition hover:border-line-strong hover:text-fg"
            href="/#projects"
          >
            <ArrowLeft aria-hidden="true" size={14} />
            목록으로
          </Link>
          <span className="num font-mono text-xs text-subtle">
            최근 업데이트 {project.updatedAt}
          </span>
        </div>

        <section className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusTone[project.status]}`}
              >
                <span
                  className={`size-1.5 rounded-full ${statusDot[project.status]}`}
                />
                {project.statusLabel}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
                <ProjectIcon name={project.icon} size={13} />
                {project.eyebrow}
              </span>
              <span className="num font-mono text-[11px] text-subtle">
                {project.year}
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-medium leading-[1.12] tracking-[-0.03em] md:text-5xl">
                {project.title}
              </h1>
              <p className="text-base leading-7 text-muted md:text-lg md:leading-8">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  className="rounded-md border border-line bg-surface-2 px-2.5 py-1 font-mono text-xs text-muted"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {project.liveUrl && (
                <a
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg transition hover:opacity-90"
                  href={project.liveUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  서비스 열기
                  <ExternalLink aria-hidden="true" size={15} />
                </a>
              )}
              {project.apk && (
                <a
                  className={`inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium transition ${
                    project.liveUrl
                      ? "border border-line bg-surface hover:border-line-strong"
                      : "bg-fg text-bg hover:opacity-90"
                  }`}
                  download
                  href={project.apk.url}
                  rel="noreferrer"
                >
                  APK 다운로드
                  <span className="num font-mono text-xs opacity-70">
                    v{project.apk.version}
                  </span>
                  <ArrowDownToLine aria-hidden="true" size={15} />
                </a>
              )}
            </div>
          </div>

          <ProjectVisual
            accent={project.accent}
            live
            liveUrl={project.liveUrl}
            title={project.title}
            type={project.visual}
          />
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <DetailBlock
            accent={project.accent}
            items={project.highlights}
            kind="done"
            title="구현한 기능"
          />
          <DetailBlock
            accent={project.accent}
            items={project.nextSteps}
            kind="todo"
            title="남은 과제"
          />
        </section>

        {project.apk && <ApkBlock apk={project.apk} />}

        <section className="space-y-5 border-t border-line pt-10">
          <h2 className="text-lg font-medium">다른 프로젝트</h2>
          <div className="grid gap-2.5 md:grid-cols-3">
            {others.map((item) => (
              <Link
                className="group flex items-center gap-3 rounded-xl border border-line bg-surface p-4 transition hover:border-line-strong hover:bg-surface-2"
                href={`/projects/${item.slug}`}
                key={item.slug}
              >
                <span
                  className="grid size-9 shrink-0 place-items-center rounded-lg text-white"
                  style={{ backgroundColor: item.accent }}
                >
                  <ProjectIcon name={item.icon} size={16} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">
                    {item.title}
                  </span>
                  <span className="block truncate text-xs text-subtle">
                    {item.statusLabel}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="shrink-0 text-subtle transition group-hover:translate-x-0.5 group-hover:text-fg"
                  size={15}
                />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function ApkBlock({ apk }: { apk: ProjectApk }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="flex flex-col justify-between gap-4 border-b border-line p-6 md:flex-row md:items-center">
        <div className="min-w-0 space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
            Android 다운로드
          </p>
          <h2 className="truncate font-mono text-base font-medium">
            {apk.fileName}
          </h2>
          <p className="num text-sm text-muted">
            {apk.label} · v{apk.version} ({apk.versionCode}) · {apk.size}
          </p>
        </div>
        <a
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg transition hover:opacity-90"
          download
          href={apk.url}
          rel="noreferrer"
        >
          APK 다운로드
          <ArrowDownToLine aria-hidden="true" size={15} />
        </a>
      </div>

      <dl className="divide-y divide-[var(--line)]">
        <div className="grid gap-2 p-6 md:grid-cols-[120px_1fr] md:items-center md:gap-4">
          <dt className="text-sm text-subtle">SHA-256</dt>
          <dd className="flex flex-wrap items-center gap-2.5">
            <code className="min-w-0 flex-1 break-all rounded-lg border border-line bg-surface-2 px-3 py-2 font-mono text-xs text-muted">
              {apk.sha256}
            </code>
            <CopyButton label="해시 복사" value={apk.sha256} />
          </dd>
        </div>
        <div className="grid gap-2 p-6 md:grid-cols-[120px_1fr] md:items-center md:gap-4">
          <dt className="text-sm text-subtle">릴리스</dt>
          <dd>
            <a
              className="inline-flex items-center gap-1.5 break-all font-mono text-xs text-accent underline-offset-4 hover:underline"
              href={apk.releaseUrl}
              rel="noreferrer"
              target="_blank"
            >
              {apk.releaseUrl}
              <ExternalLink aria-hidden="true" size={13} />
            </a>
          </dd>
        </div>
        <div className="grid gap-2 p-6 md:grid-cols-[120px_1fr] md:gap-4">
          <dt className="text-sm text-subtle">설치 확인</dt>
          <dd className="space-y-2 text-sm leading-6 text-muted">
            <p>
              Play Store를 거치지 않는 파일이라 설치 시 &ldquo;출처를 알 수 없는
              앱&rdquo; 허용이 필요합니다.
            </p>
            <code className="block break-all rounded-lg border border-line bg-surface-2 px-3 py-2 font-mono text-xs">
              shasum -a 256 {apk.fileName}
            </code>
          </dd>
        </div>
      </dl>
    </section>
  );
}

function DetailBlock({
  title,
  items,
  kind,
  accent,
}: {
  title: string;
  items: string[];
  kind: "done" | "todo";
  accent: string;
}) {
  return (
    <section className="rounded-2xl border border-line bg-surface p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-medium">{title}</h2>
        <span className="num rounded-full border border-line bg-surface-2 px-2.5 py-0.5 font-mono text-xs text-subtle">
          {items.length}
        </span>
      </div>
      <ul className="mt-5 space-y-3.5">
        {items.map((item) => (
          <li className="flex gap-3 text-sm leading-6 text-muted" key={item}>
            {kind === "done" ? (
              <Check
                aria-hidden="true"
                className="mt-0.5 shrink-0"
                size={15}
                style={{ color: accent }}
              />
            ) : (
              <CircleDot
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-subtle"
                size={15}
              />
            )}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
