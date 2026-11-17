import {
  ArrowDown,
  ArrowDownToLine,
  ArrowUpRight,
  Code2,
  ExternalLink,
  Smartphone,
} from "lucide-react";
import { Suspense } from "react";
import { WorkshopFeature } from "@/components/workshop-feature";
import Link from "next/link";
import { ProjectGrid, ProjectGridFallback } from "@/components/project-grid";
import { ProjectIcon } from "@/components/project-icon";
import { downloadableProjects, projectStats, projects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function Home() {
  const stats = projectStats();
  const recent = [...projects].sort((a, b) =>
    b.updatedAt.localeCompare(a.updatedAt),
  );
  const previews = recent.slice(0, 3).map((project) => ({
    slug: project.slug,
    title: project.title,
    summary: project.summary,
    statusLabel: project.statusLabel,
    visual: project.visual,
    accent: project.accent,
    screenshots: project.screenshots,
    version: project.apk?.version,
  }));

  return (
    <main>
      <section className="shell hero" aria-labelledby="intro-title">
        <div className="hero-note">
          <p className="hero-byline">JM의 개인 프로젝트</p>
          <h1 className="hero-title" id="intro-title">
            <span>만든 것들.</span>
          </h1>
          <p className="hero-intro">
            달리기 기록, 여행 준비, 반응속도 게임.
            <br />
            만들어 놓은 것과 만들고 있는 것을 모았습니다.
          </p>
          <div className="hero-links">
            <a className="text-link" href="#projects">
              프로젝트 {stats.total}개 보기{" "}
              <ArrowDown aria-hidden="true" size={17} />
            </a>
            <a
              className="text-link text-muted"
              href={site.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub <ArrowUpRight aria-hidden="true" size={16} />
            </a>
          </div>
          <p className="hero-footnote">
            웹 서비스 {stats.liveServices}개 / 설치 파일 {stats.downloads}개
          </p>
        </div>
        <WorkshopFeature projects={previews} />
      </section>

      <section
        className="shell pb-16 pt-4 md:pb-24 md:pt-8"
        id="projects"
        aria-labelledby="projects-title"
      >
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="section-title" id="projects-title" data-draw>
              프로젝트
            </h2>
            <p className="section-description mt-3">
              운영 중인 서비스와 개발 중인 앱을 함께 모아 두었습니다.
            </p>
          </div>
          <span className="text-[13px] text-subtle">
            마지막 갱신{" "}
            <time
              className="num"
              dateTime={stats.lastUpdatedAt?.replaceAll(".", "-")}
            >
              {stats.lastUpdatedAt}
            </time>
          </span>
        </div>
        <Suspense fallback={<ProjectGridFallback projects={projects} />}>
          <ProjectGrid projects={projects} />
        </Suspense>
      </section>

      <section
        className="border-y border-line bg-surface-2 py-14 md:py-20"
        id="downloads"
        aria-labelledby="downloads-title"
      >
        <div className="shell">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="section-title" id="downloads-title" data-draw>
                Android 설치 파일
              </h2>
              <p className="section-description mt-3">
                Android 설치 파일을 모았습니다. 정식 서명 릴리스와 개발 프리뷰를
                구분해서 확인하세요.
              </p>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-line-strong px-3 py-1.5 text-[13px] text-muted">
              <Smartphone aria-hidden="true" size={15} /> Android 전용
            </span>
          </div>
          <ul className="grid gap-3 lg:grid-cols-2">
            {downloadableProjects.map((project) =>
              project.apk ? (
                <li className="download-row" key={project.slug}>
                  <div className="flex min-w-0 items-start gap-3.5">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-line bg-surface-2 text-fg">
                      <ProjectIcon name={project.icon} size={23} />
                    </span>
                    <div className="min-w-0">
                      <Link
                        className="text-base font-semibold hover:text-accent"
                        href={`/projects/${project.slug}#download`}
                      >
                        {project.title}
                      </Link>
                      <p className="num mt-1 text-[13px] text-muted">
                        v{project.apk.version} <span className="mx-1">/</span>{" "}
                        {project.apk.size}
                      </p>
                      <p
                        className={`mt-2 text-[12px] font-medium ${project.apk.label === "signed release APK" ? "text-[var(--live)]" : "text-[var(--building)]"}`}
                      >
                        {project.apk.label === "signed release APK"
                          ? "정식 서명 릴리스"
                          : "개발 프리뷰 · 검증 상태 확인 필요"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      aria-label={`${project.title} 설치 안내`}
                      className="button button-secondary"
                      href={`/projects/${project.slug}#download`}
                    >
                      설치 안내
                    </Link>
                    <a
                      aria-label={`${project.title} APK 다운로드`}
                      className="button button-primary"
                      href={project.apk.url}
                      download
                      rel="noreferrer"
                    >
                      <ArrowDownToLine aria-hidden="true" size={17} /> APK
                    </a>
                  </div>
                </li>
              ) : null,
            )}
          </ul>
          <p className="mt-5 text-sm leading-7 text-muted">
            Play Store를 통한 설치가 아닙니다. 설치 안내에서 지원 기기, 서명
            상태와 파일 검증 정보를 확인할 수 있어요.
          </p>
        </div>
      </section>

      <section className="shell flex flex-col justify-between gap-7 py-14 md:flex-row md:items-center md:py-20">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            코드와 릴리스
          </h2>
          <p className="section-description mt-3">
            소스 코드와 개발 기록은 GitHub에 공개합니다.
          </p>
        </div>
        <a
          className="button button-secondary shrink-0 self-start"
          href={site.github}
          target="_blank"
          rel="noreferrer"
        >
          <Code2 aria-hidden="true" size={18} /> GitHub에서 코드 보기{" "}
          <ExternalLink aria-hidden="true" size={15} />
        </a>
      </section>
    </main>
  );
}
