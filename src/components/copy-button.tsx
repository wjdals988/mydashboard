"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function CopyButton({
  value,
  label = "복사",
}: {
  value: string;
  label?: string;
}) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const request = useRef(0);
  useEffect(
    () => () => {
      request.current += 1;
      if (timeout.current) clearTimeout(timeout.current);
    },
    [],
  );
  async function copy() {
    const current = ++request.current;
    if (timeout.current) clearTimeout(timeout.current);
    try {
      await navigator.clipboard.writeText(value);
      if (current !== request.current) return;
      setState("copied");
      timeout.current = setTimeout(() => setState("idle"), 2000);
    } catch {
      if (current === request.current) setState("error");
    }
  }
  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <button className="button button-secondary" onClick={copy} type="button">
        {state === "copied" ? (
          <Check aria-hidden="true" size={16} />
        ) : (
          <Copy aria-hidden="true" size={16} />
        )}
        {label}
      </button>
      <span role="status" className="text-xs text-muted">
        {state === "copied"
          ? "복사했어요"
          : state === "error"
            ? "복사하지 못했어요. 해시를 직접 선택해 복사해 주세요."
            : ""}
      </span>
    </span>
  );
}
