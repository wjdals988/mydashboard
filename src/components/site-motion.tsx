"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function SiteMotion() {
  const meter = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    let scrollFrame = 0;
    let pointerFrame = 0;
    let active: HTMLElement | null = null;
    let pointer = { x: 0, y: 0 };
    let observer: IntersectionObserver | null = null;

    function resetTilt() {
      cancelAnimationFrame(pointerFrame);
      if (active) {
        active.style.removeProperty("--tilt-x");
        active.style.removeProperty("--tilt-y");
      }
      active = null;
    }
    function paintScroll() {
      scrollFrame = 0;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      if (meter.current) meter.current.style.transform = `scaleX(${progress})`;
    }
    function queueScroll() {
      if (!scrollFrame && !document.hidden)
        scrollFrame = requestAnimationFrame(paintScroll);
    }
    function paintPointer() {
      pointerFrame = 0;
      if (!active) return;
      const bounds = active.getBoundingClientRect();
      const x = Math.max(
        -1,
        Math.min(1, ((pointer.x - bounds.left) / bounds.width) * 2 - 1),
      );
      const y = Math.max(
        -1,
        Math.min(1, ((pointer.y - bounds.top) / bounds.height) * 2 - 1),
      );
      active.style.setProperty("--tilt-x", `${-y * 3}deg`);
      active.style.setProperty("--tilt-y", `${x * 4}deg`);
    }
    function onPointer(event: PointerEvent) {
      if (reduced.matches || !fine.matches || event.pointerType === "touch")
        return;
      const next =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-tilt]")
          : null;
      if (active !== next) {
        resetTilt();
        active = next;
      }
      if (!active) return;
      pointer = { x: event.clientX, y: event.clientY };
      if (!pointerFrame) pointerFrame = requestAnimationFrame(paintPointer);
    }
    function onPointerOut(event: PointerEvent) {
      if (
        active &&
        (!(event.relatedTarget instanceof Node) ||
          !active.contains(event.relatedTarget))
      )
        resetTilt();
    }
    function setupDraws() {
      observer?.disconnect();
      resetTilt();
      const elements = document.querySelectorAll<HTMLElement>("[data-draw]");
      if (reduced.matches || !("IntersectionObserver" in window)) {
        elements.forEach((el) => {
          el.dataset.draw = "shown";
        });
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries)
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).dataset.draw = "shown";
              observer?.unobserve(entry.target);
            }
        },
        { threshold: 0.25 },
      );
      elements.forEach((el) => {
        if (el.dataset.draw === "shown") return;
        el.dataset.draw =
          el.getBoundingClientRect().top < window.innerHeight
            ? "shown"
            : "waiting";
        if (el.dataset.draw === "waiting") observer?.observe(el);
      });
    }
    function visibility() {
      if (document.hidden) {
        cancelAnimationFrame(scrollFrame);
        scrollFrame = 0;
        resetTilt();
      } else queueScroll();
    }
    const resize = new ResizeObserver(queueScroll);
    resize.observe(document.body);
    setupDraws();
    queueScroll();
    window.addEventListener("scroll", queueScroll, { passive: true });
    window.addEventListener("resize", queueScroll, { passive: true });
    document.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    reduced.addEventListener("change", setupDraws);
    fine.addEventListener("change", resetTilt);
    return () => {
      cancelAnimationFrame(scrollFrame);
      resetTilt();
      observer?.disconnect();
      resize.disconnect();
      window.removeEventListener("scroll", queueScroll);
      window.removeEventListener("resize", queueScroll);
      document.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("visibilitychange", visibility);
      reduced.removeEventListener("change", setupDraws);
      fine.removeEventListener("change", resetTilt);
      document
        .querySelectorAll<HTMLElement>('[data-draw="waiting"]')
        .forEach((el) => {
          el.dataset.draw = "shown";
        });
    };
  }, [pathname]);

  return (
    <div className="reading-progress" aria-hidden="true">
      <span ref={meter} />
    </div>
  );
}
