import { GithubMark } from "@/components/github-mark";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col justify-between gap-5 py-8 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span className="brand-mark">jm.</span>
          <div>
            <p className="text-sm font-semibold">JM의 개인 프로젝트</p>
            <p className="mt-1 text-xs text-subtle">
              © {new Date().getFullYear()} {site.author}. Pretendard Std / SIL
              OFL 1.1
            </p>
          </div>
        </div>
        <a
          className="button button-quiet self-start"
          href={site.github}
          target="_blank"
          rel="noreferrer"
        >
          <GithubMark size={17} /> GitHub
        </a>
      </div>
    </footer>
  );
}
