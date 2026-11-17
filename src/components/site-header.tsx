/* Native anchors keep repeated section navigation predictable. */
/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import { GithubMark } from "@/components/github-mark";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur-lg">
      <div className="shell flex min-h-20 items-center justify-between gap-3 py-3">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
          aria-label="JM 프로젝트 작업실 홈"
        >
          <span className="brand-mark">JM</span>
          <span className="hidden text-base font-semibold tracking-tight sm:block">
            프로젝트 작업실
          </span>
        </Link>
        <nav
          aria-label="주요 메뉴"
          className="hidden items-center gap-1 md:flex"
        >
          <a href="/#projects" className="nav-link">
            프로젝트
          </a>
          <a href="/#downloads" className="nav-link">
            앱 다운로드
          </a>
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <a
            className="grid size-11 place-items-center rounded-xl border border-line bg-surface text-muted transition-colors hover:border-line-strong hover:text-fg"
            aria-label="GitHub 프로필 열기 (새 탭)"
            href={site.github}
            target="_blank"
            rel="noreferrer"
          >
            <GithubMark size={19} />
          </a>
        </div>
      </div>
      <nav
        aria-label="모바일 주요 메뉴"
        className="shell flex gap-1 border-t border-line pb-2 pt-1 md:hidden"
      >
        <a href="/#projects" className="nav-link flex-1 justify-center">
          프로젝트
        </a>
        <a href="/#downloads" className="nav-link flex-1 justify-center">
          앱 다운로드
        </a>
      </nav>
    </header>
  );
}
