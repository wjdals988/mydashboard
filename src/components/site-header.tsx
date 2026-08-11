import Link from "next/link";
import { GithubMark } from "@/components/github-mark";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-[color-mix(in_srgb,var(--bg)_86%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <Link
          className="flex items-center gap-2.5 text-sm font-medium"
          href="/"
        >
          <span className="grid size-7 place-items-center rounded-md bg-fg text-[11px] font-semibold text-bg">
            JM
          </span>
          <span className="hidden sm:inline">{site.name}</span>
          <span className="sm:hidden">{site.shortName}</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            className="hidden h-8 items-center rounded-full px-3 text-sm text-muted transition hover:text-fg sm:inline-flex"
            href="/#projects"
          >
            프로젝트
          </Link>
          <Link
            className="hidden h-8 items-center rounded-full px-3 text-sm text-muted transition hover:text-fg sm:inline-flex"
            href="/#downloads"
          >
            다운로드
          </Link>
          <a
            aria-label="GitHub 프로필 열기"
            className="grid size-8 place-items-center rounded-full border border-line bg-surface text-muted transition hover:border-line-strong hover:text-fg"
            href={site.github}
            rel="noreferrer"
            target="_blank"
          >
            <GithubMark size={15} />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
