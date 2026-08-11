"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyButton({
  value,
  label = "복사",
}: {
  value: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3 text-xs font-medium text-muted transition hover:border-line-strong hover:text-fg"
      onClick={copy}
      type="button"
    >
      {copied ? (
        <Check aria-hidden="true" className="text-accent" size={13} />
      ) : (
        <Copy aria-hidden="true" size={13} />
      )}
      {copied ? "복사됨" : label}
    </button>
  );
}
