"use client";

import { useDeferredValue, useId, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown, RotateCcw, Search, X } from "lucide-react";
import { filterProjects } from "@/lib/project-catalog.mjs";
import { useCatalogMotion } from "@/components/use-catalog-motion";
import { ProjectCard } from "@/components/project-card";
import {
  type Project,
  type ProjectStatus,
  statusLabels,
  statusOrder,
} from "@/lib/projects";

type Platform = "all" | "web" | "android";

type Filters = {
  query: string;
  status: "all" | ProjectStatus;
  platform: Platform;
  downloadOnly: boolean;
  sort: "updated" | "curated";
};

function readFilters(params: Pick<URLSearchParams, "get">): Filters {
  const status = params.get("status");
  const platform = params.get("platform");
  return {
    query: params.get("q") ?? "",
    status: statusOrder.includes(status as ProjectStatus)
      ? (status as ProjectStatus)
      : "all",
    platform: platform === "web" || platform === "android" ? platform : "all",
    downloadOnly: params.get("download") === "1",
    sort: params.get("sort") === "updated" ? "updated" : "curated",
  };
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const params = useSearchParams();
  const inputId = useId();
  const urlKey = params.toString();
  const [previousUrl, setPreviousUrl] = useState(urlKey);
  const [filters, setFilters] = useState(() => readFilters(params));
  // Controls respond in the current event; the router may publish URL updates later.
  // Reconcile subsequent URL navigation (including back/forward) before committing.
  if (previousUrl !== urlKey) {
    setPreviousUrl(urlKey);
    setFilters(readFilters(params));
  }
  const { query, status, platform, downloadOnly, sort } = filters;
  const deferredQuery = useDeferredValue(query);
  const visible = filterProjects(projects, {
    query: deferredQuery,
    status,
    platform,
    downloadOnly,
    sort,
  });
  const { root: catalogRef, capture: captureMotion } = useCatalogMotion(
    visible.map((project) => project.slug).join("|"),
  );
  const active = Boolean(
    query ||
      status !== "all" ||
      platform !== "all" ||
      downloadOnly ||
      sort !== "curated",
  );
  const extraCount = Number(platform !== "all") + Number(downloadOnly);
  const catalogHref = `/${params.size ? `?${params.toString()}` : ""}#projects`;

  function update(key: string, value: string) {
    captureMotion();
    const next = new URLSearchParams(window.location.search);
    if (!value || value === "all" || value === "curated") next.delete(key);
    else next.set(key, value);
    setFilters(readFilters(next));
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${next.size ? `?${next}` : ""}${window.location.hash}`,
    );
  }
  function reset() {
    captureMotion();
    const next = new URLSearchParams(window.location.search);
    ["q", "status", "platform", "download", "sort"].forEach((key) =>
      next.delete(key),
    );
    setFilters(readFilters(next));
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${next.size ? `?${next}` : ""}${window.location.hash}`,
    );
  }

  return (
    <div className="space-y-6">
      <div className="catalog-panel">
        <div className="flex flex-col items-end gap-4 sm:flex-row">
          <div className="w-full flex-1">
            <label
              htmlFor={inputId}
              className="mb-2 block text-sm font-semibold"
            >
              프로젝트 검색
            </label>
            <div className="search-field">
              <Search
                aria-hidden="true"
                className="absolute left-3.5 top-4 text-muted"
                size={19}
              />
              <input
                id={inputId}
                autoComplete="off"
                type="search"
                value={query}
                onChange={(e) => update("q", e.target.value)}
                placeholder="이름, 기능 또는 기술로 찾아보세요"
              />
              {query && (
                <button
                  className="absolute right-1 top-1 grid size-11 place-items-center rounded-lg text-muted hover:bg-surface-2"
                  onClick={() => update("q", "")}
                  type="button"
                  aria-label="검색어 지우기"
                >
                  <X aria-hidden="true" size={18} />
                </button>
              )}
            </div>
          </div>
          <label className="flex w-full flex-col gap-2 text-sm font-semibold sm:w-auto">
            정렬
            <select
              className="filter-select min-h-[50px]"
              aria-label="정렬"
              value={sort}
              onChange={(e) => update("sort", e.target.value)}
            >
              <option value="curated">기본 순서</option>
              <option value="updated">최근 업데이트순</option>
            </select>
          </label>
        </div>
        <div
          className="mt-5 flex flex-wrap gap-2"
          role="group"
          aria-label="프로젝트 상태"
        >
          {(["all", ...statusOrder] as const).map((value) => (
            <button
              className="filter-chip"
              key={value}
              aria-pressed={status === value}
              onClick={() => update("status", value)}
              type="button"
            >
              {value === "all" ? "전체" : statusLabels[value]}
              <span className="num text-xs">
                {
                  projects.filter(
                    (item) => value === "all" || item.status === value,
                  ).length
                }
              </span>
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-start justify-between gap-x-4 border-t border-line pt-2">
          <details className="filter-details flex-1">
            <summary>
              추가 필터
              {extraCount > 0 && (
                <span className="rounded-md bg-accent-soft px-2 text-accent">
                  {extraCount}개 적용
                </span>
              )}
              <ChevronDown aria-hidden="true" size={16} />
            </summary>
            <div className="filter-content">
              <label className="flex flex-col gap-2 text-sm text-muted">
                플랫폼
                <select
                  className="filter-select"
                  aria-label="플랫폼"
                  value={platform}
                  onChange={(e) => update("platform", e.target.value)}
                >
                  <option value="all">모든 플랫폼</option>
                  <option value="web">웹 서비스</option>
                  <option value="android">Android 앱</option>
                </select>
              </label>
              <label className="flex min-h-11 cursor-pointer items-center gap-2.5 text-sm text-muted">
                <input
                  type="checkbox"
                  className="size-5 accent-[var(--accent)]"
                  checked={downloadOnly}
                  onChange={(e) =>
                    update("download", e.target.checked ? "1" : "")
                  }
                />
                설치 파일이 있는 앱만 보기
              </label>
            </div>
          </details>
          {active && (
            <button
              className="button button-quiet"
              type="button"
              onClick={reset}
            >
              <RotateCcw aria-hidden="true" size={15} />
              초기화
            </button>
          )}
        </div>
        {extraCount > 0 && (
          <div
            className="mt-3 flex flex-wrap gap-2"
            aria-label="적용한 추가 필터"
          >
            {platform !== "all" && (
              <button
                className="filter-chip border-line bg-surface-2"
                type="button"
                onClick={() => update("platform", "all")}
                aria-label="플랫폼 필터 해제"
              >
                {platform === "web" ? "웹 서비스" : "Android 앱"}
                <X aria-hidden="true" size={14} />
              </button>
            )}
            {downloadOnly && (
              <button
                className="filter-chip border-line bg-surface-2"
                type="button"
                onClick={() => update("download", "")}
                aria-label="설치 파일 필터 해제"
              >
                설치 파일 있음
                <X aria-hidden="true" size={14} />
              </button>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
        <p aria-live="polite" aria-atomic="true">
          {active ? "검색 결과" : "전체 프로젝트"}{" "}
          <span className="num font-semibold text-fg">{visible.length}개</span>
          <span className="ml-2 text-subtle">/ 전체 {projects.length}개</span>
        </p>
        <p className="text-[13px]">
          {sort === "updated" ? "최근 업데이트순" : "기본 순서"}
        </p>
      </div>
      <div ref={catalogRef} aria-busy={query !== deferredQuery}>
        {visible.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                catalogHref={catalogHref}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-line-strong bg-surface px-6 py-16 text-center">
            <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-accent-soft text-accent">
              <Search aria-hidden="true" size={26} />
            </span>
            <h3 className="mt-5 text-xl font-semibold">
              찾으시는 프로젝트가 없어요.
            </h3>
            <p className="mt-3 text-base leading-7 text-muted">
              검색어를 줄이거나 적용한 필터를 해제해 보세요.
            </p>
            <button
              className="button button-primary mt-6"
              type="button"
              onClick={reset}
            >
              모든 프로젝트 보기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function ProjectGridFallback({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-6">
      <div className="catalog-panel min-h-[248px]">
        <p className="text-sm font-semibold">프로젝트 검색과 필터</p>
        <p className="mt-3 text-sm text-muted">
          이름과 기능, 플랫폼으로 프로젝트를 찾아보세요.
        </p>
        <noscript>
          <p className="mt-3 text-sm text-muted">
            검색과 필터를 사용하려면 JavaScript를 켜 주세요. 아래에서 전체
            프로젝트를 볼 수 있습니다.
          </p>
        </noscript>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard project={project} key={project.slug} />
        ))}
      </div>
    </div>
  );
}
