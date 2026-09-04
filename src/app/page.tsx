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

  return (
    <main>
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="grid-veil pointer-events-none absolute inset-0 opacity-50"
        />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-14 pt-16 md:px-8 md:pb-20 md:pt-24">
          <div className="max-w-3xl space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-accent-line bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
              </span>
              프로젝트 {stats.total}개 운영 · 마지막 갱신 {stats.lastUpdatedAt}
            </p>

            <h1 className="text-4xl font-medium leading-[1.1] tracking-[-0.03em] text-balance md:text-6xl">
              {site.tagline}
            </h1>

            <p className="max-w-2xl text-base leading-7 text-muted md:text-lg md:leading-8">
              {site.description}
            </p>

            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                className="inline-flex h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg transition hover:opacity-90"
                href="#projects"
              >
                프로젝트 보기
                <ArrowUpRight aria-hidden="true" size={15} />
              </Link>
              <Link
                className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-surface px-5 text-sm font-medium transition hover:border-line-strong"
                href="#downloads"
              >
                APK 다운로드
                <ArrowDownToLine aria-hidden="true" size={15} />
              </Link>
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

          <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            <Metric label="전체 프로젝트" value={stats.total} />
            {stats.byStatus.map((item) => (
              <Metric key={item.status} label={item.label} value={item.count} />
            ))}
          </dl>
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
                  <a
                    className="group flex items-center gap-4 rounded-xl border border-line bg-surface p-4 transition hover:border-line-strong hover:bg-surface-2"
                    download
                    href={project.apk.url}
                    rel="noreferrer"
                  >
                    <span
                      className="grid size-10 shrink-0 place-items-center rounded-lg text-white"
                      style={{ backgroundColor: project.accent }}
                    >
                      <ProjectIcon name={project.icon} size={18} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">
                        {project.title}
                      </span>
                      <span className="num mt-0.5 block truncate font-mono text-xs text-subtle">
                        v{project.apk.version} ({project.apk.versionCode}) ·{" "}
                        {project.apk.size}
                      </span>
                    </span>
                    <ArrowDownToLine
                      aria-hidden="true"
                      className="shrink-0 text-subtle transition group-hover:translate-y-0.5 group-hover:text-fg"
                      size={17}
                    />
                  </a>
                </li>
              ) : null,
            )}
          </ul>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8 md:py-20" id="projects">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
                Selected work
              </p>
              <h2 className="text-2xl font-medium tracking-[-0.02em] md:text-3xl">
                프로젝트 현황
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

      <section className="border-t border-line px-5 py-14 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {capabilities.map((item) => {
              const Icon = item.icon;

              return (
                <div className="bg-surface p-6" key={item.title}>
                  <Icon
                    aria-hidden="true"
                    className="text-accent"
                    size={19}
                  />
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
    <div className="bg-surface px-5 py-5">
      <dt className="text-xs text-subtle">{label}</dt>
      <dd className="num mt-1.5 text-3xl font-medium tracking-[-0.02em]">
        {value}
      </dd>
    </div>
  );
}
