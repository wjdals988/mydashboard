"use client";

import { ArrowUpRight } from "lucide-react";
import {
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import Link from "next/link";
import {
  ProjectArtwork,
  type ArtworkProject,
} from "@/components/project-artwork";

type Preview = ArtworkProject & {
  slug: string;
  summary: string;
  statusLabel: string;
  version?: string;
};

export function WorkshopFeature({ projects }: { projects: Preview[] }) {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const project = projects[selected];

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next =
      event.key === "ArrowRight"
        ? (index + 1) % projects.length
        : event.key === "ArrowLeft"
          ? (index + projects.length - 1) % projects.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? projects.length - 1
              : null;
    if (next === null) return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }

  return (
    <section className="workbench" aria-label="최근 프로젝트 미리보기">
      <div className="workbench-heading">
        <span>최근 작업</span>
        <span className="num">
          {String(selected + 1).padStart(2, "0")} /{" "}
          {String(projects.length).padStart(2, "0")}
        </span>
      </div>
      <div
        className="workbench-tabs"
        role="tablist"
        aria-label="미리볼 프로젝트"
        style={
          {
            "--tab-index": selected,
            "--tab-count": projects.length,
          } as CSSProperties
        }
      >
        {projects.map((item, index) => (
          <button
            key={item.slug}
            id={`${id}-tab-${index}`}
            ref={(el) => {
              tabs.current[index] = el;
            }}
            type="button"
            role="tab"
            aria-selected={index === selected}
            aria-controls={`${id}-panel`}
            tabIndex={index === selected ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${selected}`}
        className="workbench-panel"
      >
        <Link
          href={`/projects/${project.slug}`}
          className="workbench-link"
          aria-label={`${project.title} 상세 보기`}
        >
          <div key={project.slug} className="workbench-scene" data-tilt>
            <ProjectArtwork project={project} priority={selected === 0} />
          </div>
          <div key={`${project.slug}-caption`} className="workbench-caption">
            <div>
              <h2>{project.title}</h2>
              <p>{project.summary}</p>
              <span className="workbench-status">
                {project.statusLabel}
                {project.version ? ` / v${project.version}` : ""}
              </span>
            </div>
            <span className="workbench-open">
              <ArrowUpRight aria-hidden="true" size={23} />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
