import { GithubMark } from "@/components/github-mark";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col justify-between gap-5 py-8 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span className="brand-mark">JM</span>
          <div>
            <p className="text-sm font-semibold">
              아이디어를 만들고, 계속 다듬습니다.
            </p>
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
