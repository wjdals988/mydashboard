"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function CatalogReturnLink() {
  const params = useSearchParams();
  const from = params.get("from");
  // Only allow a return to this site's catalog, including its filters.
  const href =
    from &&
    (from.startsWith("/?") || from === "/#projects") &&
    from.endsWith("#projects")
      ? from
      : "/#projects";
  return (
    <Link className="button button-secondary" href={href}>
      <ArrowLeft aria-hidden="true" size={17} />
      프로젝트 목록
    </Link>
  );
}
