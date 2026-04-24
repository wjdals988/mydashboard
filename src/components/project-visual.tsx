import type { ProjectVisual } from "@/lib/projects";

type ProjectVisualProps = {
  type: ProjectVisual;
  accent: string;
  title: string;
};

export function ProjectVisual({ type, accent, title }: ProjectVisualProps) {
  return (
    <div
      className="relative min-h-[220px] overflow-hidden rounded-lg border border-black/10 bg-[var(--panel-strong)] p-5 shadow-sm"
      aria-label={`${title} preview`}
    >
      <div
        className="absolute inset-x-0 top-0 h-1.5"
        style={{ backgroundColor: accent }}
      />
      {type === "speed" && <SpeedVisual accent={accent} />}
      {type === "calendar" && <CalendarVisual accent={accent} />}
      {type === "location" && <LocationVisual accent={accent} />}
      {type === "alerts" && <AlertsVisual accent={accent} />}
    </div>
  );
}

function SpeedVisual({ accent }: { accent: string }) {
  return (
    <div className="flex h-full min-h-[180px] flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
          reaction
        </span>
        <span className="rounded-full border border-black/10 px-3 py-1 font-mono text-xs">
          184ms
        </span>
      </div>
      <div className="grid place-items-center py-5">
        <div
          className="grid size-32 place-items-center rounded-full border-[14px]"
          style={{ borderColor: `${accent}33` }}
        >
          <div
            className="grid size-20 place-items-center rounded-full text-lg font-semibold text-white shadow-sm"
            style={{ backgroundColor: accent }}
          >
            GO
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {[42, 64, 51, 78, 58].map((height, index) => (
          <div
            className="rounded-sm bg-black/10"
            key={height + index}
            style={{ height }}
          >
            <div
              className="h-full rounded-sm"
              style={{
                backgroundColor: accent,
                opacity: 0.42 + index * 0.08,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function CalendarVisual({ accent }: { accent: string }) {
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const active = new Set([3, 4, 9, 12, 15, 16, 22]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">April</p>
          <p className="text-xs text-[var(--muted)]">shared availability</p>
        </div>
        <div className="flex -space-x-2">
          {["J", "M", "S"].map((item) => (
            <span
              className="grid size-8 place-items-center rounded-full border border-white text-xs font-semibold text-white"
              key={item}
              style={{ backgroundColor: accent }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-xs">
        {days.map((day) => (
          <span className="text-[var(--muted)]" key={day}>
            {day}
          </span>
        ))}
        {Array.from({ length: 28 }, (_, index) => (
          <span
            className="grid aspect-square place-items-center rounded-md border border-black/10 font-mono"
            key={index}
            style={{
              backgroundColor: active.has(index) ? `${accent}20` : "#fffaf0",
              color: active.has(index) ? accent : "var(--foreground)",
            }}
          >
            {index + 1}
          </span>
        ))}
      </div>
    </div>
  );
}

function LocationVisual({ accent }: { accent: string }) {
  return (
    <div className="relative min-h-[180px] overflow-hidden rounded-md bg-[#e9efe9]">
      <div className="absolute inset-0 opacity-60">
        <div className="absolute left-1/4 top-0 h-full w-px bg-white" />
        <div className="absolute left-2/3 top-0 h-full w-px bg-white" />
        <div className="absolute left-0 top-1/3 h-px w-full bg-white" />
        <div className="absolute left-0 top-2/3 h-px w-full bg-white" />
      </div>
      <div
        className="absolute left-[42%] top-[34%] size-20 rounded-full"
        style={{ backgroundColor: `${accent}24` }}
      />
      <div
        className="absolute left-[49%] top-[43%] size-4 rounded-full border-4 border-white shadow"
        style={{ backgroundColor: accent }}
      />
      <div className="absolute bottom-4 left-4 right-4 rounded-md border border-black/10 bg-white/90 p-3 shadow-sm">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold">위젯 위치 상태</span>
          <span className="font-mono text-xs text-[var(--muted)]">live-ish</span>
        </div>
        <div className="mt-3 h-2 rounded-full bg-black/10">
          <div
            className="h-2 w-2/3 rounded-full"
            style={{ backgroundColor: accent }}
          />
        </div>
      </div>
    </div>
  );
}

function AlertsVisual({ accent }: { accent: string }) {
  const rows = [
    ["방송 시작", "ready"],
    ["키워드 감지", "queued"],
    ["알림 전송", "sent"],
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-black/10 bg-black/[0.03] p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">alert pipeline</span>
          <span
            className="rounded-full px-2 py-1 font-mono text-xs text-white"
            style={{ backgroundColor: accent }}
          >
            beta
          </span>
        </div>
        <div className="mt-4 flex items-center gap-2">
          {[1, 2, 3, 4].map((item) => (
            <div className="flex flex-1 items-center gap-2" key={item}>
              <span
                className="grid size-8 place-items-center rounded-full text-xs font-semibold text-white"
                style={{ backgroundColor: accent, opacity: 0.55 + item * 0.1 }}
              >
                {item}
              </span>
              {item < 4 && <span className="h-px flex-1 bg-black/15" />}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        {rows.map(([label, state]) => (
          <div
            className="flex items-center justify-between rounded-md border border-black/10 bg-white px-3 py-2 text-sm"
            key={label}
          >
            <span>{label}</span>
            <span className="font-mono text-xs text-[var(--muted)]">{state}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
