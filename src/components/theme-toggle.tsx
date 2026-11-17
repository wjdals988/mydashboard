"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

type Mode = "system" | "light" | "dark";

const modes: { value: Mode; label: string; icon: typeof Sun }[] = [
  { value: "system", label: "시스템 설정", icon: Monitor },
  { value: "light", label: "라이트", icon: Sun },
  { value: "dark", label: "다크", icon: Moon },
];

const EVENT = "jm:theme";

// 테마의 진짜 소유자는 localStorage와 <html data-theme>이다. React state로
// 복제하지 않고 외부 저장소를 그대로 구독해서, 하이드레이션 시점에 서버가
// 알 수 없는 값(system)으로 렌더한 뒤 클라이언트 값으로 교체된다.
function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(EVENT, onChange);

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

function getSnapshot(): Mode {
  try {
    const stored = window.localStorage.getItem("theme");

    return stored === "light" || stored === "dark" ? stored : "system";
  } catch {
    const applied = document.documentElement.getAttribute("data-theme");
    return applied === "light" || applied === "dark" ? applied : "system";
  }
}

function getServerSnapshot(): Mode {
  return "system";
}

export function ThemeToggle() {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function pick(next: Mode) {
    const root = document.documentElement;

    try {
      if (next === "system") {
        root.removeAttribute("data-theme");
        window.localStorage.removeItem("theme");
      } else {
        root.setAttribute("data-theme", next);
        window.localStorage.setItem("theme", next);
      }
    } catch {
      // Theme changes still work when browser storage is unavailable.
    }
    window.dispatchEvent(new Event(EVENT));
  }

  return (
    <div
      aria-label="화면 테마"
      className="flex items-center gap-0.5 rounded-xl border border-line bg-surface p-0.5"
      role="group"
    >
      {modes.map((item) => {
        const Icon = item.icon;
        const active = mode === item.value;

        return (
          <button
            aria-label={item.label}
            aria-pressed={active}
            className={`grid size-11 place-items-center rounded-lg transition-colors ${
              active
                ? "bg-accent-soft text-accent"
                : "text-subtle hover:text-fg"
            }`}
            key={item.value}
            onClick={() => pick(item.value)}
            title={item.label}
            type="button"
          >
            <Icon aria-hidden="true" size={17} />
          </button>
        );
      })}
    </div>
  );
}
