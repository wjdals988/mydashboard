import type { ProjectVisual as ProjectVisualType } from "@/lib/projects";

type ProjectVisualProps = {
  type: ProjectVisualType;
  accent: string;
  title: string;
  liveUrl?: string;
  // 홈 카드에서는 외부 사이트 iframe을 띄우지 않는다. 6개 카드가 동시에
  // cross-origin 문서를 로드하면 첫 렌더가 눈에 띄게 느려지고, 스크롤 중
  // 프레임이 비어 보이는 현상도 있었다. 라이브 미리보기는 상세 화면에서만 쓴다.
  live?: boolean;
};

export function ProjectVisual({
  type,
  accent,
  title,
  liveUrl,
  live = false,
}: ProjectVisualProps) {
  const showLive = live && Boolean(liveUrl);

  return (
    <div
      aria-label={`${title} 미리보기`}
      className={`relative min-h-[212px] overflow-hidden rounded-xl border border-line bg-surface-2 ${
        showLive ? "p-0" : "p-4"
      }`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 h-px"
        style={{ backgroundColor: accent }}
      />
      {showLive && liveUrl ? (
        <LivePreview accent={accent} title={title} url={liveUrl} />
      ) : (
        <>
          {type === "currency" && <CurrencyVisual accent={accent} />}
          {type === "speed" && <SpeedVisual accent={accent} />}
          {type === "calendar" && <CalendarVisual accent={accent} />}
          {type === "location" && <LocationVisual accent={accent} />}
          {type === "alerts" && <AlertsVisual accent={accent} />}
          {type === "coupons" && <CouponsVisual accent={accent} />}
          {type === "travel" && <TravelVisual accent={accent} />}
        </>
      )}
    </div>
  );
}

function LivePreview({
  accent,
  title,
  url,
}: {
  accent: string;
  title: string;
  url: string;
}) {
  return (
    <div className="relative h-[280px] bg-surface-3 md:h-full md:min-h-[280px]">
      <div className="flex h-9 items-center gap-1.5 border-b border-line bg-surface px-3">
        <span className="size-2 rounded-full bg-[var(--line-strong)]" />
        <span className="size-2 rounded-full bg-[var(--line-strong)]" />
        <span className="size-2 rounded-full bg-[var(--line-strong)]" />
        <span className="ml-2 min-w-0 flex-1 truncate rounded bg-surface-2 px-2 py-1 font-mono text-[11px] text-subtle">
          {url.replace("https://", "")}
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 top-9 overflow-hidden bg-white">
        <iframe
          className="pointer-events-none h-[860px] w-[1280px] origin-top-left scale-[0.26] border-0 sm:scale-[0.36] md:scale-[0.3] lg:scale-[0.34]"
          loading="lazy"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin"
          src={url}
          title={`${title} 라이브 미리보기`}
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-14"
        style={{ background: `linear-gradient(to top, ${accent}2e, transparent)` }}
      />
    </div>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-[180px] flex-col justify-between gap-3">
      {children}
    </div>
  );
}

function Caption({ title, sub }: { title: string; sub: string }) {
  return (
    <div>
      <p className="text-[13px] font-medium">{title}</p>
      <p className="mt-0.5 text-[11px] text-subtle">{sub}</p>
    </div>
  );
}

function Chip({ accent, children }: { accent: string; children: string }) {
  return (
    <span
      className="rounded-full px-2.5 py-1 font-mono text-[11px] font-medium text-white"
      style={{ backgroundColor: accent }}
    >
      {children}
    </span>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-line bg-surface px-3 py-2.5">
      {children}
    </div>
  );
}

function CurrencyVisual({ accent }: { accent: string }) {
  const rates = [
    { code: "USD", flag: "🇺🇸", value: "1,358.00" },
    { code: "EUR", flag: "🇪🇺", value: "1,574.40" },
    { code: "CZK", flag: "🇨🇿", value: "65.08" },
  ];

  return (
    <Frame>
      <div className="flex items-start justify-between">
        <Caption sub="하나은행 매매기준율" title="현지 통화 → 원화" />
        <Chip accent={accent}>CZK</Chip>
      </div>
      <Row>
        <p className="text-[11px] text-subtle">1,000 CZK</p>
        <p
          className="mt-0.5 font-mono text-[20px] font-semibold"
          style={{ color: accent }}
        >
          65,080원
        </p>
      </Row>
      <div className="grid grid-cols-3 gap-1.5">
        {rates.map((rate) => (
          <div
            className="rounded-lg border border-line bg-surface px-2 py-1.5"
            key={rate.code}
          >
            <p className="text-[10px] text-subtle">
              {rate.flag} {rate.code}
            </p>
            <p className="mt-0.5 font-mono text-[12px] font-medium">
              {rate.value}
            </p>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function SpeedVisual({ accent }: { accent: string }) {
  return (
    <Frame>
      <div className="flex items-start justify-between">
        <Caption sub="5라운드 평균" title="반응속도" />
        <Chip accent={accent}>184ms</Chip>
      </div>
      <div className="grid place-items-center py-1">
        <div
          className="grid size-24 place-items-center rounded-full border-[10px]"
          style={{ borderColor: `${accent}33` }}
        >
          <div
            className="grid size-14 place-items-center rounded-full text-sm font-medium text-white"
            style={{ backgroundColor: accent }}
          >
            GO
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 items-end gap-1.5">
        {[38, 58, 46, 70, 52].map((height, index) => (
          <div
            className="rounded-sm bg-surface-3"
            key={height}
            style={{ height }}
          >
            <div
              className="h-full rounded-sm"
              style={{ backgroundColor: accent, opacity: 0.4 + index * 0.12 }}
            />
          </div>
        ))}
      </div>
    </Frame>
  );
}

function CalendarVisual({ accent }: { accent: string }) {
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const active = new Set([3, 4, 9, 12, 15, 16, 22]);

  return (
    <Frame>
      <div className="flex items-start justify-between">
        <Caption sub="방 단위 공유 일정" title="April" />
        <div className="flex -space-x-1.5">
          {["J", "M", "S"].map((item) => (
            <span
              className="grid size-6 place-items-center rounded-full border border-surface-2 text-[10px] font-medium text-white"
              key={item}
              style={{ backgroundColor: accent }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[10px]">
        {days.map((day) => (
          <span className="text-subtle" key={day}>
            {day}
          </span>
        ))}
        {Array.from({ length: 28 }, (_, index) => (
          <span
            className="num grid aspect-square place-items-center rounded border border-line font-mono"
            key={index}
            style={
              active.has(index)
                ? { backgroundColor: `${accent}26`, color: accent }
                : { backgroundColor: "var(--surface)", color: "var(--fg-subtle)" }
            }
          >
            {index + 1}
          </span>
        ))}
      </div>
    </Frame>
  );
}

function LocationVisual({ accent }: { accent: string }) {
  return (
    <div className="relative min-h-[180px] overflow-hidden rounded-lg bg-surface">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute left-1/4 top-0 h-full w-px bg-[var(--line)]" />
        <div className="absolute left-2/3 top-0 h-full w-px bg-[var(--line)]" />
        <div className="absolute left-0 top-1/3 h-px w-full bg-[var(--line)]" />
        <div className="absolute left-0 top-2/3 h-px w-full bg-[var(--line)]" />
      </div>
      <div
        className="absolute left-[40%] top-[30%] size-20 rounded-full"
        style={{ backgroundColor: `${accent}24` }}
      />
      <div
        className="absolute left-[48%] top-[40%] size-3.5 rounded-full ring-4 ring-[var(--surface-2)]"
        style={{ backgroundColor: accent }}
      />
      <div className="absolute inset-x-3 bottom-3 rounded-lg border border-line bg-surface-2 p-3">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-medium">위젯 위치 상태</span>
          <span className="font-mono text-[11px] text-subtle">1x1</span>
        </div>
        <div className="mt-2.5 h-1.5 rounded-full bg-surface-3">
          <div
            className="h-1.5 w-2/3 rounded-full"
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
    ["상태 전환 감지", "queued"],
    ["FCM 전송", "sent"],
  ];

  return (
    <Frame>
      <div className="rounded-lg border border-line bg-surface p-3">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-medium">alert pipeline</span>
          <Chip accent={accent}>15m</Chip>
        </div>
        <div className="mt-3 flex items-center gap-1.5">
          {[1, 2, 3, 4].map((item) => (
            <div className="flex flex-1 items-center gap-1.5" key={item}>
              <span
                className="grid size-6 place-items-center rounded-full text-[10px] font-medium text-white"
                style={{ backgroundColor: accent, opacity: 0.5 + item * 0.12 }}
              >
                {item}
              </span>
              {item < 4 && <span className="h-px flex-1 bg-[var(--line)]" />}
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-1.5">
        {rows.map(([label, state]) => (
          <Row key={label}>
            <div className="flex items-center justify-between text-[13px]">
              <span>{label}</span>
              <span className="font-mono text-[11px] text-subtle">{state}</span>
            </div>
          </Row>
        ))}
      </div>
    </Frame>
  );
}

function CouponsVisual({ accent }: { accent: string }) {
  const coupons = [
    ["COFFEE", "D-3", 76],
    ["CAKE", "D-8", 58],
    ["MEAL", "D-14", 40],
  ] as const;

  return (
    <Frame>
      <div className="flex items-start justify-between">
        <Caption sub="private image storage" title="coupon room" />
        <Chip accent={accent}>09:00</Chip>
      </div>
      <div className="grid gap-1.5">
        {coupons.map(([name, day, width], index) => (
          <Row key={name}>
            <div className="grid grid-cols-[40px_1fr_auto] items-center gap-3">
              <div
                className="grid aspect-[4/3] place-items-center rounded text-[9px] font-medium text-white"
                style={{ backgroundColor: accent, opacity: 0.7 + index * 0.1 }}
              >
                IMG
              </div>
              <div className="min-w-0">
                <p className="truncate font-mono text-[12px] font-medium">
                  {name}
                </p>
                <div className="mt-1.5 h-1 rounded-full bg-surface-3">
                  <div
                    className="h-1 rounded-full"
                    style={{ width: `${width}%`, backgroundColor: accent }}
                  />
                </div>
              </div>
              <span className="num rounded-full border border-line px-2 py-0.5 font-mono text-[11px] text-subtle">
                {day}
              </span>
            </div>
          </Row>
        ))}
      </div>
    </Frame>
  );
}

function TravelVisual({ accent }: { accent: string }) {
  const schedule = [
    ["09:30", "체크아웃", "예정"],
    ["11:00", "구엘 공원", "진행 중"],
    ["19:20", "야간열차", "예약 확인"],
  ];

  return (
    <Frame>
      <div className="flex items-start justify-between">
        <Caption sub="2인 공유 여행 일기" title="오늘의 진료" />
        <Chip accent={accent}>D-12</Chip>
      </div>

      <div className="grid gap-1.5">
        {schedule.map(([time, place, state], index) => (
          <Row key={time}>
            <div className="grid grid-cols-[46px_1fr_auto] items-center gap-3">
              <span
                className="num font-mono text-[11px] font-medium"
                style={{ color: accent, opacity: 0.75 + index * 0.12 }}
              >
                {time}
              </span>
              <p className="min-w-0 truncate text-[13px]">{place}</p>
              <span className="rounded-full border border-line px-2 py-0.5 text-[11px] text-subtle">
                {state}
              </span>
            </div>
          </Row>
        ))}
      </div>

      <div className="rounded-lg border border-line bg-surface p-3">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-medium">예산 소진</span>
          <span className="num font-mono text-subtle">1,240 / 2,000 EUR</span>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-surface-3">
          <div
            className="h-1.5 rounded-full"
            style={{ width: "62%", backgroundColor: accent }}
          />
        </div>
        <div className="mt-2.5 flex items-center justify-between text-[11px] text-subtle">
          <span>준비물 6/8</span>
          <span>예약 3건</span>
          <span>오프라인 캐시</span>
        </div>
      </div>
    </Frame>
  );
}
