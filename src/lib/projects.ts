import {
  BellRing,
  CalendarDays,
  Gauge,
  MapPinned,
  type LucideIcon,
} from "lucide-react";

export type ProjectStatus = "live" | "building" | "not-listed";
export type ProjectVisual = "speed" | "calendar" | "location" | "alerts";

export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  status: ProjectStatus;
  statusLabel: string;
  year: string;
  liveUrl?: string;
  tags: string[];
  highlights: string[];
  nextSteps: string[];
  visual: ProjectVisual;
  accent: string;
  icon: LucideIcon;
};

export const projects: Project[] = [
  {
    slug: "reaction-speed-test",
    title: "반응속도 테스트",
    eyebrow: "Speed Benchmark",
    summary:
      "반응속도 측정과 랭킹 등록까지 동작하는 미니 웹 게임.",
    description:
      "현재 버전은 0.1.1이며, 색상 반응 테스트와 타겟 터치 테스트를 통해 반응속도를 측정하고 랭킹까지 등록할 수 있는 미니 웹 게임입니다.",
    status: "live",
    statusLabel: "운영 중",
    year: "2026",
    liveUrl: "https://speed-jm.vercel.app/",
    tags: ["Next.js", "Reaction Test", "Redis", "Vercel"],
    highlights: [
      "색상 반응과 랜덤 타겟 터치, 두 가지 테스트 모드를 제공합니다.",
      "각 테스트는 5라운드로 진행되며 최고, 최저, 평균 반응속도를 계산합니다.",
      "결과 화면에서 닉네임을 입력해 테스트 타입별 Top 10 랭킹에 등록할 수 있습니다.",
      "랭킹 저장은 Redis를 사용하고, 개발 환경에서는 메모리 저장소로 대체됩니다.",
      "모바일 터치 지연을 줄이기 위한 입력 처리와 타이밍 보정이 적용되어 있습니다.",
      "공유 시 한국어 제목, 설명, 대표 이미지가 노출되도록 OG 태그가 설정되어 있습니다.",
    ],
    nextSteps: [
      "모바일과 PC의 조작 차이를 고려해 디바이스별 랭킹을 분리합니다.",
      "PC와 모바일에서 타겟 테스트 난이도가 비슷해지도록 타겟 크기와 생성 범위를 조정합니다.",
      "주요 흐름을 Playwright E2E 테스트로 자동화합니다.",
      "오늘, 이번 주, 전체 랭킹 필터를 추가합니다.",
      "실수율과 안정성을 반영한 종합 점수, 결과 공유 카드 기능을 검토합니다.",
      "닉네임 검증, 저장 데이터 정리 정책, API rate limit을 추가해 운영 안정성을 높입니다.",
    ],
    visual: "speed",
    accent: "#126a5a",
    icon: Gauge,
  },
  {
    slug: "shared-schedule-checker",
    title: "공유 일정 관리",
    eyebrow: "Schedule Checker",
    summary:
      "초대 코드로 방에 참여해 일정과 할일을 함께 관리하는 공유 앱.",
    description:
      "Firebase 익명 로그인 기반의 공유 일정/할일 관리 앱입니다. 초대 코드나 공유 링크로 방에 참여하고, 방 단위로 일정과 할일을 함께 정리할 수 있습니다.",
    status: "live",
    statusLabel: "운영 중",
    year: "2026",
    liveUrl: "https://checker-jm.vercel.app/",
    tags: ["Firebase", "Calendar", "Todo", "Vercel"],
    highlights: [
      "초대 코드 또는 공유 링크로 방에 참여하고 최근 들어간 방을 다시 열 수 있습니다.",
      "방별 월간 달력, 가로 날짜 스트립, 미니 달력으로 날짜를 빠르게 이동합니다.",
      "날짜별 일정 추가, 수정, 삭제와 메모, 색상, 태그 지정이 가능합니다.",
      "일정에 종속된 할일을 관리하고, 이번 주와 이번 달 할일을 모아볼 수 있습니다.",
      "전체, 미완료, 완료 통계와 미완료 필터를 제공합니다.",
      "참여자 목록, 공유 링크 복사, 버전/업데이트 내역, 라이트/다크/시스템 테마를 지원합니다.",
      "대한민국 공휴일 표시와 모바일/PC 반응형 UI를 갖췄습니다.",
    ],
    nextSteps: [
      "초대 코드 조회 권한을 강화하고 목록 조회를 차단해 보안을 높입니다.",
      "새 방부터 초대 코드 길이를 늘려 무작위 추측 위험을 줄입니다.",
      "방장, 편집자, 읽기 전용처럼 멤버 권한을 구분합니다.",
      "할일 댓글이나 진행 메모를 추가해 협업성을 높입니다.",
      "무료 범위에서는 브라우저 로컬 알림을 우선 검토합니다.",
      "태그, 색상, 작성자, 완료 여부, 날짜 범위 기반 검색과 필터를 고도화합니다.",
      "방 이름 변경, 초대 코드 재발급, 멤버 내보내기 같은 방 관리 화면을 추가합니다.",
      "저장 중, 동기화 완료, 오프라인 상태를 UI에 표시합니다.",
    ],
    visual: "calendar",
    accent: "#b77718",
    icon: CalendarDays,
  },
  {
    slug: "location-widget",
    title: "위치공유 앱 위젯",
    eyebrow: "Location Widget",
    summary: "앱스토어 업로드 전 단계의 위치공유 중심 위젯 프로젝트.",
    description:
      "위치 정보를 빠르게 확인하는 위젯 형태의 앱 프로젝트입니다. 아직 앱스토어에 등록되지는 않았지만, 모바일 환경에서 필요한 정보를 짧은 시선 이동으로 확인하는 사용성을 목표로 합니다.",
    status: "not-listed",
    statusLabel: "미등록",
    year: "2026",
    tags: ["Mobile", "Widget", "Location"],
    highlights: [
      "위젯 중심의 빠른 정보 확인",
      "지도와 상태 정보를 함께 보여주는 구성",
      "앱스토어 등록 전 프로토타입 단계",
    ],
    nextSteps: [
      "권한 안내와 개인정보 문구 정리",
      "앱스토어 제출용 메타데이터 준비",
      "실사용 환경에서 배터리와 위치 갱신 주기 점검",
    ],
    visual: "location",
    accent: "#3f6f9f",
    icon: MapPinned,
  },
  {
    slug: "streamer-alert-system",
    title: "스트리머 알림 시스템",
    eyebrow: "Streamer Alerts",
    summary: "스트리머 활동과 이벤트를 감지해 알림으로 연결하는 구현 중인 시스템.",
    description:
      "스트리머의 방송, 이벤트, 상태 변화를 놓치지 않도록 알림 흐름을 설계하는 프로젝트입니다. 현재 구현 중이며, 신뢰도 높은 감지와 전달 구조를 우선순위로 둡니다.",
    status: "building",
    statusLabel: "구현 중",
    year: "2026",
    tags: ["Notification", "Automation", "Streaming"],
    highlights: [
      "이벤트 감지와 알림 전달 구조 설계",
      "스트리머별 상태를 확인하는 대시보드 방향",
      "확장 가능한 알림 채널을 고려한 구조",
    ],
    nextSteps: [
      "감지 대상 플랫폼 확정",
      "알림 채널과 실패 재시도 정책 설계",
      "운영 로그와 상태 모니터링 화면 추가",
    ],
    visual: "alerts",
    accent: "#b84f62",
    icon: BellRing,
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const statusTone: Record<ProjectStatus, string> = {
  live: "border-emerald-700/20 bg-emerald-700/10 text-emerald-900",
  building: "border-rose-700/20 bg-rose-700/10 text-rose-900",
  "not-listed": "border-slate-700/20 bg-slate-700/10 text-slate-900",
};
