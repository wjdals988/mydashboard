"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import {
  type Project,
  type ProjectStatus,
  platformsOf,
  statusLabels,
  statusOrder,
} from "@/lib/projects";

type Platform = "all" | "web" | "android";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | ProjectStatus>("all");
  const [platform, setPlatform] = useState<Platform>("all");
  const [downloadOnly, setDownloadOnly] = useState(false);
  const [sort, setSort] = useState("curated");
  const active =
    query !== "" ||
    status !== "all" ||
    platform !== "all" ||
    downloadOnly ||
    sort !== "curated";
  function reset() {
    setQuery("");
    setStatus("all");
    setPlatform("all");
    setDownloadOnly(false);
    setSort("curated");
  }
  const visible = useMemo(() => {
    const terms = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
    const result = projects.filter((project) => {
      const text = [
        project.title,
        project.eyebrow,
        project.summary,
        ...project.tags,
      ]
        .join(" ")
        .toLocaleLowerCase();
      return (
        terms.every((term) => text.includes(term)) &&
        (status === "all" || project.status === status) &&
        (platform === "all" || platformsOf(project).includes(platform)) &&
        (!downloadOnly || Boolean(project.apk))
      );
    });
    return sort === "updated"
      ? result.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
      : result;
  }, [projects, query, status, platform, downloadOnly, sort]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-line bg-surface p-4 md:p-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              aria-hidden="true"
              className="absolute left-3.5 top-3.5 text-muted"
              size={18}
            />
            <input
              aria-label="프로젝트 검색"
              className="h-12 w-full rounded-xl border border-line bg-bg pl-11 pr-12 text-sm placeholder:text-subtle focus:border-accent"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="프로젝트 이름, 기능, 기술 검색"
              type="search"
              value={query}
            />
            {query && (
              <button
                aria-label="검색어 지우기"
                className="absolute right-1 top-1 grid size-10 place-items-center rounded-lg text-muted hover:bg-surface-2"
                onClick={() => setQuery("")}
                type="button"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <label className="flex h-12 items-center gap-2 rounded-xl border border-line px-3 text-sm text-muted">
            <SlidersHorizontal aria-hidden="true" size={16} />
            <span className="sr-only">정렬</span>
            <select
              aria-label="프로젝트 정렬"
              className="h-full min-w-28 bg-transparent text-fg"
              onChange={(event) => setSort(event.target.value)}
              value={sort}
            >
              <option value="curated">기본 순서</option>
              <option value="updated">최근 업데이트</option>
            </select>
          </label>
        </div>
        <div
          aria-label="프로젝트 상태"
          className="mt-4 flex flex-wrap gap-2"
          role="group"
        >
          {(["all", ...statusOrder] as const).map((value) => (
            <button
              aria-pressed={status === value}
              className={`inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm transition ${status === value ? "bg-fg text-bg" : "bg-surface-2 text-muted hover:text-fg"}`}
              key={value}
              onClick={() => setStatus(value)}
              type="button"
            >
              {value === "all" ? "전체" : statusLabels[value]}
              <span className="num text-xs opacity-70">
                {
                  projects.filter(
                    (item) => value === "all" || item.status === value,
                  ).length
                }
              </span>
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-4">
          <label className="flex min-h-11 items-center gap-2 text-sm text-muted">
            플랫폼
            <select
              aria-label="플랫폼"
              className="h-11 rounded-lg border border-line bg-surface-2 px-3 text-fg"
              onChange={(event) => setPlatform(event.target.value as Platform)}
              value={platform}
            >
              <option value="all">모든 플랫폼</option>
              <option value="web">웹</option>
              <option value="android">Android</option>
            </select>
          </label>
          <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm text-muted">
            <input
              checked={downloadOnly}
              className="size-4 accent-[var(--accent)]"
              onChange={(event) => setDownloadOnly(event.target.checked)}
              type="checkbox"
            />
            APK 다운로드 가능
          </label>
          {active && (
            <button
              className="min-h-11 text-sm text-accent hover:underline sm:ml-auto"
              onClick={reset}
              type="button"
            >
              조건 초기화
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 text-sm text-muted">
        <p aria-live="polite" aria-atomic="true">
          <span className="num font-medium text-fg">{visible.length}</span> /{" "}
          {projects.length}개 프로젝트
        </p>
        <span className="text-xs">구현 상태와 설치 가능 여부를 확인하세요</span>
      </div>
      {visible.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((project, index) => (
            <ProjectCard index={index} key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-line-strong bg-surface px-5 py-16 text-center">
          <Search aria-hidden="true" className="mx-auto text-muted" size={28} />
          <h3 className="mt-4 text-lg font-medium">
            일치하는 프로젝트가 없어요
          </h3>
          <p className="mt-2 text-sm text-muted">
            검색어를 줄이거나 다른 상태와 플랫폼을 선택해 보세요.
          </p>
          <button
            className="mt-5 min-h-11 rounded-full bg-fg px-5 text-sm text-bg"
            onClick={reset}
            type="button"
          >
            모든 프로젝트 보기
          </button>
        </div>
      )}
    </div>
  );
}
