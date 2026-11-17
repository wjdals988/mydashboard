import {
  ArrowDown,
  ArrowDownToLine,
  ArrowUpRight,
  ChevronRight,
  Code2,
  ExternalLink,
  Smartphone,
} from "lucide-react";
import { Suspense } from "react";
import Image from "next/image";
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
  const featured = recent[0];
  const shots = featured.screenshots?.slice(0, 2);

  return (
    <main>
      <section className="shell hero" aria-labelledby="intro-title">
        <div className="entry">
          <p className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-muted">
            <span
              aria-hidden="true"
              className="size-2 rounded-full bg-accent"
            />
            JM의 프로젝트 작업실
          </p>
          <h1 className="hero-title" id="intro-title">
            작은 아이디어가,
            <br />
            쓸모 있는 제품으로.
          </h1>
          <p className="hero-intro">
            직접 만들고 다듬어 가는 웹 서비스와 Android 앱입니다. 마음에 드는
            프로젝트를 열어 보고, 그 안의 이야기도 살펴보세요.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            <a className="button button-primary" href="#projects">
              프로젝트 둘러보기 <ArrowDown aria-hidden="true" size={17} />
            </a>
            <a className="button button-quiet" href="#downloads">
              <Smartphone aria-hidden="true" size={17} /> 앱 다운로드
            </a>
          </div>
          <dl className="hero-stat">
            <div>
              <dt>만든 프로젝트</dt>
              <dd className="num">
                {stats.total}
                <span className="ml-1 text-sm font-normal text-muted">개</span>
              </dd>
            </div>
            <div>
              <dt>열어 볼 웹 서비스</dt>
              <dd className="num">
                {stats.liveServices}
                <span className="ml-1 text-sm font-normal text-muted">개</span>
              </dd>
            </div>
            <div>
              <dt>설치 가능한 앱</dt>
              <dd className="num">
                {stats.downloads}
                <span className="ml-1 text-sm font-normal text-muted">개</span>
              </dd>
            </div>
          </dl>
        </div>

        <Link
          className="featured-project entry entry-preview"
          href={`/projects/${featured.slug}`}
          aria-label={`최근 업데이트: ${featured.title} 상세 보기`}
        >
          <div className="flex items-center justify-between gap-3 text-[13px] font-medium">
            <span>최근에 다듬은 프로젝트</span>
            <time dateTime={featured.updatedAt.replaceAll(".", "-")}>
              {featured.updatedAt}
            </time>
          </div>
          <div className="mt-5 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">
                {featured.title}
              </h2>
              <p className="mt-2 max-w-[30ch] text-sm leading-6">
                {featured.summary}
              </p>
            </div>
            <span className="grid size-11 shrink-0 place-items-center rounded-full border border-current/25">
              <ArrowUpRight aria-hidden="true" size={20} />
            </span>
          </div>
          {shots?.length ? (
            <div className="featured-stage" aria-hidden="true">
              {shots.map((shot, index) => (
                <Image
                  key={shot.src}
                  src={shot.src}
                  alt=""
                  width={shot.width}
                  height={shot.height}
                  sizes="160px"
                  priority
                  className={`featured-phone ${index === 0 ? "featured-phone-first" : "featured-phone-second"}`}
                />
              ))}
            </div>
          ) : (
            <div className="my-8">
              <ProjectIcon name={featured.icon} size={64} />
            </div>
          )}
          <div className="featured-footer">
            <span>
              {featured.apk ? `v${featured.apk.version}` : "최근 업데이트"}
              <span className="mt-1 block text-xs font-normal">
                {featured.statusLabel}
              </span>
            </span>
            <span className="inline-flex items-center gap-1">
              자세히 보기 <ChevronRight aria-hidden="true" size={17} />
            </span>
          </div>
        </Link>
      </section>

      <section
        className="shell pb-16 pt-4 md:pb-24 md:pt-8"
        id="projects"
        aria-labelledby="projects-title"
      >
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="section-title" id="projects-title">
              어떤 프로젝트가 궁금하세요?
            </h2>
            <p className="section-description mt-3">
              일상의 도구부터 작은 게임까지. 직접 써 보고, 만드는 과정도
              확인하세요.
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
              <h2 className="section-title" id="downloads-title">
                내 폰에서 직접 써 보세요.
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
            만드는 과정도 열어 두었습니다.
          </h2>
          <p className="section-description mt-3">
            각 프로젝트의 코드, 구현한 기능과 남은 과제를 확인해 보세요.
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
