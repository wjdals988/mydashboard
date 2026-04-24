import {
  ArrowUpRight,
  Code2,
  Mail,
  NotebookText,
  PanelsTopLeft,
} from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";

const stats = [
  { label: "운영 중", value: "2" },
  { label: "구현 중", value: "1" },
  { label: "앱 프로젝트", value: "1" },
];

export default function Home() {
  return (
    <main>
      <section className="mx-auto grid w-full max-w-7xl gap-8 px-5 pb-10 pt-6 md:px-8 md:pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="space-y-7">
          <nav className="flex items-center justify-between gap-4">
            <Link className="flex items-center gap-2 font-semibold" href="/">
              <span className="grid size-9 place-items-center rounded-md bg-[var(--foreground)] text-sm text-white">
                JM
              </span>
              포트폴리오
            </Link>
            <a
              className="inline-flex h-10 items-center gap-2 rounded-md border border-black/10 bg-white/70 px-4 text-sm font-semibold"
              href="#projects"
            >
              프로젝트
              <ArrowUpRight aria-hidden="true" size={16} />
            </a>
          </nav>

          <div className="max-w-3xl space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-sm font-semibold text-[var(--accent-strong)]">
              <PanelsTopLeft aria-hidden="true" size={16} />
              Project dashboard
            </p>
            <div className="space-y-4">
              <h1 className="text-5xl font-semibold tracking-normal text-balance md:text-7xl">
                JM 포트폴리오
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[var(--muted)] md:text-xl">
                직접 만들고 운영하거나 실험 중인 웹, 모바일, 자동화 프로젝트를
                한곳에 정리한 개인 대시보드입니다.
              </p>
            </div>
          </div>
        </div>

        <aside className="rounded-lg border border-black/10 bg-[var(--panel)] p-5 shadow-sm lg:mt-14">
          <div className="grid grid-cols-3 gap-3">
            {stats.map((item) => (
              <div
                className="rounded-md border border-black/10 bg-white/80 p-4"
                key={item.label}
              >
                <p className="font-mono text-3xl font-semibold">{item.value}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <ContactSlot icon={Code2} label="GitHub" value="준비 중" />
            <ContactSlot icon={Mail} label="Email" value="준비 중" />
            <ContactSlot icon={NotebookText} label="Blog" value="준비 중" />
          </div>
        </aside>
      </section>

      <section
        className="border-t border-black/10 bg-white/35 px-5 py-12 md:px-8"
        id="projects"
      >
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold text-[var(--accent-strong)]">
                Selected projects
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-normal md:text-4xl">
                프로젝트 현황
              </h2>
            </div>
            <p className="max-w-lg leading-7 text-[var(--muted)]">
              운영 중인 서비스와 앱 프로토타입, 구현 중인 시스템을 같은 기준으로
              볼 수 있게 정리했습니다.
            </p>
          </div>

          <div className="grid gap-5">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactSlot({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Code2;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-md border border-black/10 bg-white/70 p-3">
      <Icon aria-hidden="true" className="shrink-0 text-[var(--muted)]" size={18} />
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold">{label}</p>
        <p className="truncate text-xs text-[var(--muted)]">{value}</p>
      </div>
    </div>
  );
}
