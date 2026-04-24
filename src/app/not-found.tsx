import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-5">
      <section className="max-w-md rounded-lg border border-black/10 bg-[var(--panel)] p-6 text-center shadow-sm">
        <p className="font-mono text-sm text-[var(--muted)]">404</p>
        <h1 className="mt-2 text-3xl font-semibold">프로젝트를 찾을 수 없습니다</h1>
        <p className="mt-3 leading-7 text-[var(--muted)]">
          요청한 프로젝트가 없거나 주소가 변경되었습니다.
        </p>
        <Link
          className="mt-6 inline-flex h-10 items-center rounded-md bg-[var(--foreground)] px-4 text-sm font-semibold text-white"
          href="/"
        >
          홈으로 이동
        </Link>
      </section>
    </main>
  );
}
