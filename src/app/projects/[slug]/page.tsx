import {
  ArrowDownToLine,
  ArrowLeft,
  ChevronDown,
  ArrowUpRight,
  Check,
  CircleDot,
  ExternalLink,
} from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogReturnLink } from "@/components/catalog-return-link";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CopyButton } from "@/components/copy-button";
import { ProjectIcon } from "@/components/project-icon";
import { ProjectArtwork } from "@/components/project-artwork";
import { ProjectVisual } from "@/components/project-visual";
import {
  type ProjectApk,
  type ProjectReleaseNote,
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

  const others = projects
    .filter((item) => item.slug !== project.slug)
    .slice(0, 3);
  const cover = project.screenshots?.[0];

  return (
    <main className="shell py-8 md:py-12">
      <div className="space-y-10 md:space-y-14">
        <div className="flex items-center justify-between gap-4">
          <Suspense
            fallback={
              <Link className="button button-secondary" href="/#projects">
                <ArrowLeft aria-hidden="true" size={17} />
                프로젝트 목록
              </Link>
            }
          >
            <CatalogReturnLink />
          </Suspense>
          <span className="num font-mono text-xs text-subtle">
            최근 업데이트 {project.updatedAt}
          </span>
        </div>

        <section className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className={`status ${statusTone[project.status]}`}>
                <span
                  className={`size-1.5 rounded-full ${statusDot[project.status]}`}
                />
                {project.statusLabel}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[13px] text-subtle">
                <ProjectIcon name={project.icon} size={13} />
                {project.eyebrow}
              </span>
              <span className="num text-[13px] text-subtle">
                {project.year}
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="detail-heading">{project.title}</h1>
              <p className="max-w-[56ch] text-base leading-8 text-muted md:text-lg md:leading-9">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  className="rounded-md bg-surface-2 px-2.5 py-1 text-[13px] text-muted"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {project.liveUrl && (
                <a
                  className="button button-primary"
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
                  className={`button ${project.liveUrl ? "button-secondary" : "button-primary"}`}
                  download
                  href={project.apk.url}
                  rel="noreferrer"
                >
                  APK 다운로드
                  <span className="num text-xs">v{project.apk.version}</span>
                  <ArrowDownToLine aria-hidden="true" size={15} />
                </a>
              )}
              {project.sourceUrl && (
                <a
                  className="button button-secondary"
                  href={project.sourceUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  GitHub 소스
                  <ExternalLink aria-hidden="true" size={15} />
                </a>
              )}
            </div>
          </div>

          {cover ? (
            <figure className="space-y-4 rounded-3xl border border-line bg-surface-2 p-6 text-center">
              <a
                className="screenshot-link inline-block rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4"
                href={cover.src}
                target="_blank"
                rel="noreferrer"
                aria-label={`${cover.alt} 원본 보기`}
              >
                <Image
                  src={cover.src}
                  alt={cover.alt}
                  width={cover.width}
                  height={cover.height}
                  className="mx-auto h-auto max-h-[540px] w-auto rounded-3xl border border-line"
                  sizes="(min-width: 1024px) 304px, 280px"
                  priority
                />
              </a>
              <figcaption className="text-sm leading-6 text-muted">
                {cover.caption}
              </figcaption>
            </figure>
          ) : project.liveUrl ? (
            <ProjectVisual
              accent={project.accent}
              live
              liveUrl={project.liveUrl}
              title={project.title}
              type={project.visual}
            />
          ) : (
            <div className="detail-artwork">
              <ProjectArtwork project={project} />
            </div>
          )}
        </section>

        <nav className="detail-nav" aria-label="프로젝트 상세 메뉴">
          <a href="#features">기능과 개발 상태</a>
          {project.screenshots && project.screenshots.length > 0 && (
            <a href="#app-screenshots-heading">앱 화면</a>
          )}
          {project.apk && <a href="#download">설치 안내</a>}
          {project.releaseNotes && project.releaseNotes.length > 0 && (
            <a href="#release-notes">업데이트 노트</a>
          )}
        </nav>

        {project.screenshots && project.screenshots.length > 0 && (
          <section
            className="space-y-5"
            aria-labelledby="app-screenshots-heading"
          >
            <div className="space-y-2">
              <h2
                className="text-xl font-semibold tracking-tight"
                id="app-screenshots-heading"
              >
                앱 화면 둘러보기
              </h2>
              <p className="text-sm leading-6 text-muted">
                {project.screenshotsNote ??
                  "앱 검토 화면입니다. 화면을 선택하면 원본을 볼 수 있습니다."}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 min-[480px]:grid-cols-2 lg:grid-cols-4">
              {project.screenshots.map((shot) => (
                <figure className="space-y-3" key={shot.src}>
                  <a
                    className="screenshot-link block overflow-hidden rounded-2xl border border-line bg-surface-2 p-3 focus-visible:outline-2 focus-visible:outline-offset-4"
                    href={shot.src}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${shot.alt} 원본 보기`}
                  >
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={shot.width}
                      height={shot.height}
                      className="mx-auto h-auto max-h-[480px] w-auto"
                      sizes="(min-width: 1024px) 280px, (min-width: 480px) 40vw, 280px"
                    />
                  </a>
                  <figcaption className="text-sm leading-6 text-muted">
                    {shot.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
            {project.screenshotsReviewUrl && (
              <a
                className="inline-flex min-h-11 items-center gap-2 text-sm font-medium underline underline-offset-4"
                href={project.screenshotsReviewUrl}
                target="_blank"
                rel="noreferrer"
              >
                화면 개편 PR 보기 <ExternalLink aria-hidden="true" size={14} />
              </a>
            )}
          </section>
        )}

        <section
          className="grid gap-5 lg:grid-cols-2"
          id="features"
          aria-label="기능과 개발 상태"
        >
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

        {project.releaseNotes && project.releaseNotes.length > 0 && (
          <ReleaseNotes notes={project.releaseNotes} />
        )}

        <section className="space-y-5 border-t border-line pt-10">
          <h2 className="text-xl font-semibold tracking-tight">
            다른 프로젝트
          </h2>
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

function ReleaseNotes({ notes }: { notes: ProjectReleaseNote[] }) {
  return (
    <section
      className="space-y-5 border-t border-line pt-10"
      id="release-notes"
    >
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">업데이트 노트</h2>
        <p className="mt-2 text-sm text-muted">
          새로 추가하고 다듬은 내용을 최신순으로 확인하세요.
        </p>
      </div>
      <div className="divide-y divide-[var(--line)] border-y border-line">
        {notes.map((release, index) => (
          <article
            className="grid gap-3 py-5 md:grid-cols-[150px_1fr]"
            key={release.version}
          >
            <div>
              <p className="font-mono text-sm font-medium text-fg">
                v{release.version}{" "}
                <span className="text-subtle">({release.versionCode})</span>
              </p>
              <p className="num mt-1 font-mono text-xs text-subtle">
                {release.date}
              </p>
              {index === 0 && (
                <span className="mt-2 inline-flex rounded-md bg-accent-soft px-2 py-1 text-xs font-medium text-accent">
                  최신
                </span>
              )}
            </div>
            <ul className="space-y-2">
              {release.notes.map((note) => (
                <li
                  className="flex gap-2.5 text-base leading-8 text-muted"
                  key={note}
                >
                  <Check
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-accent"
                    size={14}
                  />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function ApkBlock({ apk }: { apk: ProjectApk }) {
  return (
    <section
      className="overflow-hidden rounded-2xl border border-line bg-surface"
      id="download"
    >
      <div className="flex flex-col justify-between gap-4 border-b border-line p-6 md:flex-row md:items-center">
        <div className="min-w-0 space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            Android 앱 설치
          </h2>
          <p className="num text-sm text-muted">
            v{apk.version} / {apk.size}
          </p>
          <p
            className={`text-sm font-medium ${apk.label === "signed release APK" ? "text-[var(--live)]" : "text-[var(--building)]"}`}
          >
            {apk.label === "signed release APK"
              ? "정식 서명 릴리스"
              : "개발 프리뷰"}
          </p>
          {apk.label !== "signed release APK" && (
            <p className="max-w-[60ch] text-sm leading-7 text-muted">
              {apk.label} — 테스트용 배포입니다. 검증 상태와 아래 릴리스 정보를
              확인하고 설치해 주세요.
            </p>
          )}
        </div>
        <a
          className="button button-primary shrink-0"
          download
          href={apk.url}
          rel="noreferrer"
        >
          APK 다운로드
          <ArrowDownToLine aria-hidden="true" size={15} />
        </a>
      </div>

      <div className="px-6 py-5 text-sm leading-7 text-muted">
        <p>
          다운로드한 APK를 Android 기기에서 열어 설치하세요. 설치 화면에서
          요청하면 해당 브라우저나 파일 앱의 &ldquo;출처를 알 수 없는 앱
          설치&rdquo;를 허용해 주세요.
        </p>
      </div>
      <details className="install-details border-t border-line">
        <summary>
          파일 검증 및 릴리스 정보 <ChevronDown aria-hidden="true" size={18} />
        </summary>
        <dl className="divide-y divide-[var(--line)]">
          <div className="grid gap-2 p-6 md:grid-cols-[120px_1fr] md:gap-4">
            <dt className="text-sm text-subtle">설치 파일</dt>
            <dd className="min-w-0 space-y-2 text-sm">
              <code className="break-all">{apk.fileName}</code>
              <p className="num text-muted">
                빌드 {apk.versionCode} / {apk.label}
              </p>
            </dd>
          </div>
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
                Play Store를 거치지 않는 파일이라 설치 시 &ldquo;출처를 알 수
                없는 앱&rdquo; 허용이 필요합니다.
              </p>
              <code className="block break-all rounded-lg border border-line bg-surface-2 px-3 py-2 font-mono text-xs">
                shasum -a 256 {apk.fileName}
              </code>
            </dd>
          </div>
        </dl>
      </details>
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
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <span className="num rounded-full border border-line bg-surface-2 px-2.5 py-0.5 font-mono text-xs text-subtle">
          {items.length}
        </span>
      </div>
      <ul className="mt-5 space-y-3.5">
        {items.map((item) => (
          <li className="flex gap-3 text-base leading-8 text-muted" key={item}>
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
