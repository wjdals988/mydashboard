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
    summary: "짧은 인터랙션으로 사용자의 반응 속도를 측정하는 웹 테스트.",
    description:
      "빠르게 시작하고 바로 결과를 확인하는 반응속도 테스트입니다. 단순한 게임성보다 결과 확인과 반복 플레이 흐름을 중심에 둔 프로젝트입니다.",
    status: "live",
    statusLabel: "운영 중",
    year: "2026",
    liveUrl: "https://speed-jm.vercel.app/",
    tags: ["Web App", "Interaction", "Vercel"],
    highlights: [
      "즉시 시작되는 짧은 테스트 흐름",
      "측정 결과 중심의 간결한 화면",
      "모바일에서도 빠르게 접근 가능한 배포 구조",
    ],
    nextSteps: [
      "기록 저장과 개인 최고 기록 표시",
      "난이도 또는 테스트 모드 확장",
      "공유 가능한 결과 카드 추가",
    ],
    visual: "speed",
    accent: "#126a5a",
    icon: Gauge,
  },
  {
    slug: "shared-schedule-checker",
    title: "공유 일정 관리",
    eyebrow: "Schedule Checker",
    summary: "여러 사람이 함께 일정을 확인하고 맞춰볼 수 있는 공유 도구.",
    description:
      "개인 일정 확인을 넘어 함께 가능한 시간을 찾기 위한 일정 관리 프로젝트입니다. 약속 조율이나 그룹 일정 확인처럼 반복되는 상황을 더 빠르게 처리하는 데 초점을 둡니다.",
    status: "live",
    statusLabel: "운영 중",
    year: "2026",
    liveUrl: "https://checker-jm.vercel.app/",
    tags: ["Productivity", "Calendar", "Collaboration"],
    highlights: [
      "공유 가능한 일정 확인 흐름",
      "반복적인 시간 조율을 줄이는 정보 구조",
      "Vercel 기반의 빠른 배포와 접근성",
    ],
    nextSteps: [
      "참여자별 응답 상태 표시",
      "일정 후보 비교 UI 개선",
      "알림 또는 캘린더 연동 검토",
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
