"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

type Position = { x: number; y: number };

export function useCatalogMotion(signature: string) {
  const root = useRef<HTMLDivElement>(null);
  const previous = useRef(new Map<string, Position>());
  const animations = useRef(new Set<Animation>());

  const capture = useCallback(() => {
    const positions = new Map<string, Position>();
    root.current
      ?.querySelectorAll<HTMLElement>("[data-project-key]")
      .forEach((el) => {
        const rect = el.getBoundingClientRect();
        positions.set(el.dataset.projectKey!, {
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY,
        });
      });
    previous.current = positions;
  }, []);

  useLayoutEffect(() => {
    const running = animations.current;
    running.forEach((animation) => animation.cancel());
    running.clear();
    if (
      previous.current.size === 0 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      previous.current.clear();
      return;
    }
    // Read every final position before starting compositor animations.
    const targets = Array.from(
      root.current?.querySelectorAll<HTMLElement>("[data-project-key]") ?? [],
    ).map((el) => {
      const old = previous.current.get(el.dataset.projectKey!);
      const rect = el.getBoundingClientRect();
      return {
        el,
        old,
        x: old ? old.x - rect.left - window.scrollX : 0,
        y: old ? old.y - rect.top - window.scrollY : 10,
      };
    });
    for (const { el, old, x, y } of targets) {
      if (old && Math.abs(x) < 1 && Math.abs(y) < 1) continue;
      const animation = el.animate(
        [
          { transform: `translate(${x}px, ${y}px)`, opacity: old ? 1 : 0 },
          { transform: "translate(0, 0)", opacity: 1 },
        ],
        { duration: old ? 420 : 260, easing: "cubic-bezier(.2,.8,.2,1)" },
      );
      running.add(animation);
      animation.finished.then(
        () => running.delete(animation),
        () => running.delete(animation),
      );
    }
    previous.current.clear();
  }, [signature]);

  useEffect(() => {
    const running = animations.current;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cancel = () => {
      if (media.matches || document.hidden) {
        running.forEach((animation) => animation.cancel());
        running.clear();
      }
    };
    media.addEventListener("change", cancel);
    document.addEventListener("visibilitychange", cancel);
    return () => {
      running.forEach((animation) => animation.cancel());
      running.clear();
      media.removeEventListener("change", cancel);
      document.removeEventListener("visibilitychange", cancel);
    };
  }, []);

  return { root, capture };
}
