"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import {
  type Project,
  type ProjectStatus,
  platformsOf,
  statusLabels,
  statusOrder,
} from "@/lib/projects";

type Filter = "all" | ProjectStatus | "web" | "android";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const filters = useMemo(() => {
    const base: { value: Filter; label: string; count: number }[] = [
      { value: "all", label: "전체", count: projects.length },
    ];

    for (const status of statusOrder) {
      const count = projects.filter((item) => item.status === status).length;

      if (count > 0) {
        base.push({ value: status, label: statusLabels[status], count });
      }
    }

    const web = projects.filter((item) => platformsOf(item).includes("web"));
    const android = projects.filter((item) =>
      platformsOf(item).includes("android"),
    );

    if (web.length > 0) {
      base.push({ value: "web", label: "웹", count: web.length });
    }

    if (android.length > 0) {
      base.push({ value: "android", label: "Android", count: android.length });
    }

    return base;
  }, [projects]);

  const visible = useMemo(() => {
    if (filter === "all") {
      return projects;
    }

    if (filter === "web" || filter === "android") {
      return projects.filter((item) => platformsOf(item).includes(filter));
    }

    return projects.filter((item) => item.status === filter);
  }, [filter, projects]);

  return (
    <div className="space-y-6">
      <div
        aria-label="프로젝트 필터"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0"
        role="group"
      >
        {filters.map((item) => {
          const active = filter === item.value;

          return (
            <button
              aria-pressed={active}
              className={`inline-flex h-9 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition ${
                active
                  ? "border-transparent bg-fg text-bg"
                  : "border-line bg-surface text-muted hover:border-line-strong hover:text-fg"
              }`}
              key={item.value}
              onClick={() => setFilter(item.value)}
              type="button"
            >
              {item.label}
              <span
                className={`num font-mono text-xs ${active ? "opacity-70" : "text-subtle"}`}
              >
                {item.count}
              </span>
            </button>
          );
        })}
      </div>

      <div aria-live="polite" className="sr-only">
        {visible.length}개 프로젝트 표시 중
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {visible.map((project, index) => (
          <ProjectCard index={index} key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
