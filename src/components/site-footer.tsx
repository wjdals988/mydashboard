import { ArrowUpRight } from "lucide-react";
import { GithubMark } from "@/components/github-mark";
import { projectStats } from "@/lib/projects";
import { site } from "@/lib/site";

export function SiteFooter() {
  const stats = projectStats();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-12 md:grid-cols-[1.2fr_1fr] md:px-8">
        <div className="space-y-3">
          <p className="flex items-center gap-2.5 text-sm font-medium">
            <span className="grid size-7 place-items-center rounded-md bg-fg text-[11px] font-semibold text-bg">
              JM
            </span>
            {site.name}
          </p>
          <p className="max-w-md text-sm leading-6 text-muted">
            {site.description}
          </p>
          <p className="num text-xs text-subtle">
            프로젝트 {stats.total}개 · 마지막 갱신 {stats.lastUpdatedAt}
          </p>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <a
            className="inline-flex h-10 w-fit items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-medium transition hover:border-line-strong"
            href={site.github}
            rel="noreferrer"
            target="_blank"
          >
            <GithubMark size={15} />
            GitHub
            <ArrowUpRight aria-hidden="true" size={14} />
          </a>
          <p className="text-xs leading-5 text-subtle md:text-right">
            본문 글꼴은 Pretendard Std(SIL Open Font License 1.1)를 사용합니다.
            <br />
            © {new Date().getFullYear()} {site.author}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
