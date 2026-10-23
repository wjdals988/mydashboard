import {
  ArrowDownToLine,
  ArrowUpRight,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { GithubMark } from "@/components/github-mark";
import { ProjectGrid } from "@/components/project-grid";
import { ProjectIcon } from "@/components/project-icon";
import { downloadableProjects, projectStats, projects } from "@/lib/projects";
import { site } from "@/lib/site";

const capabilities = [
  {
    icon: Smartphone,
    title: "Android 네이티브",
    body: "Kotlin, Jetpack Compose, Firebase로 설계부터 서명 배포까지 직접 진행합니다.",
  },
  {
    icon: Sparkles,
    title: "웹 서비스",
    body: "Next.js와 서버리스 백엔드로 운영 중인 서비스를 만들고 유지합니다.",
  },
  {
    icon: ShieldCheck,
    title: "품질 검증",
    body: "보안 규칙 테스트, 회귀 테스트, 수동 QA 체크리스트를 함께 남깁니다.",
  },
];

export default function Home() {
  const stats = projectStats();
  const recent = [...projects]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 3);

  return (
    <main>
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="grid-veil pointer-events-none absolute inset-0 opacity-50"
        />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-8 pt-10 md:px-8 md:pb-10 md:pt-14">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-center">
            <div className="space-y-5">
              <p className="inline-flex items-center gap-2 rounded-full border border-accent-line bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                </span>
                프로젝트 {stats.total}개 · 마지막 갱신 {stats.lastUpdatedAt}
              </p>

              <h1 className="text-4xl font-medium leading-[1.2] tracking-[-0.04em] text-balance md:text-5xl">
                {site.tagline}
              </h1>

              <p className="max-w-2xl text-base leading-7 text-muted md:text-lg md:leading-8">
                {site.description}
              </p>

              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg transition hover:opacity-90"
                  href="#projects"
                >
                  프로젝트 보기
                  <ArrowUpRight aria-hidden="true" size={15} />
                </a>
                <a
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-surface px-5 text-sm font-medium transition hover:border-line-strong"
                  href="#downloads"
                >
                  APK 다운로드
                  <ArrowDownToLine aria-hidden="true" size={15} />
                </a>
                <a
                  className="inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-medium text-muted transition hover:text-fg"
                  href={site.github}
                  rel="noreferrer"
                  target="_blank"
                >
                  <GithubMark size={15} />
                  GitHub
                </a>
              </div>
            </div>

            <aside
              aria-label="최근 프로젝트 업데이트"
              className="rounded-2xl border border-line bg-surface p-5 md:p-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-sm font-medium">최근 업데이트</h2>
                <span className="font-mono text-xs tracking-wider text-accent">
                  CHANGELOG
                </span>
              </div>
              <ul className="space-y-1">
                {recent.map((project) => (
                  <li key={project.slug}>
                    <Link
                      className="group flex min-h-20 items-center gap-3 rounded-xl p-2 transition hover:bg-surface-2"
                      href={`/projects/${project.slug}`}
                    >
                      <span
                        className="grid size-10 shrink-0 place-items-center rounded-xl text-white"
                        style={{ backgroundColor: project.accent }}
                      >
                        <ProjectIcon name={project.icon} size={19} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium">
                          {project.title}
                        </span>
                        <span className="mt-1 block text-xs text-muted">
                          {project.statusLabel} · {project.updatedAt}
                        </span>
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="text-muted transition group-hover:text-accent"
                        size={17}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-line pt-4 text-xs leading-5 text-muted">
                업데이트 날짜 기준 · 상세 페이지에서 구현 범위와 남은 과제를
                확인하세요.
              </p>
            </aside>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            <Metric label="전체 프로젝트" value={stats.total} />
            {stats.byStatus.map((item) => (
              <Metric key={item.status} label={item.label} value={item.count} />
            ))}
          </dl>
        </div>
      </section>

      <section className="px-5 py-10 md:px-8 md:py-14" id="projects">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
                Explore projects
              </p>
              <h2 className="text-2xl font-medium tracking-[-0.02em] md:text-3xl">
                프로젝트 탐색
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-6 text-muted">
              운영 중인 서비스와 구현 중인 시스템을 같은 기준으로 정리했습니다.
              각 상세 화면에는 구현한 기능과 남은 과제를 그대로 적어 둡니다.
            </p>
          </div>

          <ProjectGrid projects={projects} />
        </div>
      </section>

      <section
        className="border-b border-line px-5 py-14 md:px-8 md:py-16"
        id="downloads"
      >
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
              Direct install
            </p>
            <h2 className="text-2xl font-medium tracking-[-0.02em] md:text-3xl">
              Android APK 다운로드
            </h2>
            <p className="max-w-md text-sm leading-6 text-muted">
              정식 서명 릴리스와 개발 미리보기를 구분해 제공합니다. 버전, 용량,
              SHA-256 해시와 각 앱의 서명 상태를 설치 전에 확인해 주세요.
            </p>
          </div>

          <ul className="grid gap-2.5">
            {downloadableProjects.map((project) =>
              project.apk ? (
                <li key={project.slug}>
                  <div className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-surface p-4">
                    <span
                      className="grid size-10 shrink-0 place-items-center rounded-lg text-white"
                      style={{ backgroundColor: project.accent }}
                    >
                      <ProjectIcon name={project.icon} size={18} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <Link
                        className="text-sm font-medium hover:text-accent"
                        href={`/projects/${project.slug}`}
                      >
                        {project.title}
                      </Link>
                      <p className="mt-1 text-xs text-muted">
                        v{project.apk.version} ({project.apk.versionCode}) ·{" "}
                        {project.apk.size}
                      </p>
                      <span
                        className={`mt-2 inline-flex rounded-md px-2 py-1 text-xs ${project.apk.label === "signed release APK" ? "bg-accent-soft text-accent" : "bg-[var(--building-soft)] text-[var(--building)]"}`}
                      >
                        {project.apk.label === "signed release APK"
                          ? "서명 릴리스"
                          : "개발 미리보기 · 디버그 APK"}
                      </span>
                    </div>
                    <div className="flex w-full gap-2 pl-[52px] sm:w-auto sm:pl-0">
                      <Link
                        aria-label={`${project.title} 설치 정보 확인`}
                        className="inline-flex min-h-11 items-center rounded-lg border border-line px-3 text-xs text-muted hover:text-fg"
                        href={`/projects/${project.slug}#download`}
                      >
                        설치 정보
                      </Link>
                      <a
                        aria-label={`${project.title} APK 다운로드`}
                        className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-fg px-3 text-xs font-medium text-bg hover:opacity-90"
                        download
                        href={project.apk.url}
                        rel="noreferrer"
                      >
                        APK
                        <ArrowDownToLine aria-hidden="true" size={15} />
                      </a>
                    </div>
                  </div>
                </li>
              ) : null,
            )}
          </ul>
        </div>
      </section>

      <section className="border-t border-line px-5 py-14 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {capabilities.map((item) => {
              const Icon = item.icon;

              return (
                <div className="bg-surface p-6" key={item.title}>
                  <Icon aria-hidden="true" className="text-accent" size={19} />
                  <h3 className="mt-4 text-base font-medium">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-line bg-surface p-6 md:flex-row md:items-center md:p-8">
            <div className="space-y-2">
              <h2 className="text-xl font-medium tracking-[-0.01em] md:text-2xl">
                작업 방식이나 코드가 궁금하시면
              </h2>
              <p className="text-sm leading-6 text-muted">
                모든 프로젝트의 소스와 릴리스는 GitHub에 공개해 두었습니다.
              </p>
            </div>
            <a
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg transition hover:opacity-90"
              href={site.github}
              rel="noreferrer"
              target="_blank"
            >
              <GithubMark size={15} />
              GitHub에서 보기
              <ArrowUpRight aria-hidden="true" size={14} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-surface px-5 py-4">
      <dt className="text-xs text-subtle">{label}</dt>
      <dd className="num mt-1.5 text-3xl font-medium tracking-[-0.02em]">
        {value}
      </dd>
    </div>
  );
}
