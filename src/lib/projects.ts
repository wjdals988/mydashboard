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
  updatedAt: string;
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
    updatedAt: "2026.04.25",
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
    updatedAt: "2026.04.25",
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
    summary:
      "Android 12+용 위치 공유 앱과 1x1 홈 화면 위젯 프로젝트.",
    description:
      "현재 버전은 1.1.0이며, 앱 실행 또는 홈 화면 위젯 탭 한 번으로 현재 위치를 가져와 주요 지도 링크와 함께 공유할 수 있는 Android 위치 공유 앱입니다.",
    status: "not-listed",
    statusLabel: "미등록",
    year: "2026",
    updatedAt: "2026.04.25",
    tags: ["Android", "Widget", "Location", "Maps"],
    highlights: [
      "앱을 실행하면 위치 권한 요청 후 현재 위치 미리보기를 바로 로드합니다.",
      "현재 주소, 좌표, 카카오맵, 네이버지도, 구글지도 링크를 확인하고 시스템 공유 시트로 공유할 수 있습니다.",
      "1x1 홈 화면 위젯을 누르면 투명 공유 화면을 거쳐 위치 획득 후 바로 공유 시트가 열립니다.",
      "고정밀 현재 위치 조회를 우선 사용하고 실패 시 마지막 위치를 대체값으로 사용합니다.",
      "주소는 시·도, 시·군·구, 동, 도로명, 번지 등 가능한 범위를 조합해 표시합니다.",
      "공유 텍스트에는 카카오맵 웹 링크, 네이버지도 좌표 링크, 구글지도 검색 링크를 함께 포함합니다.",
      "앱 아이콘과 위젯 preview 이미지를 반영해 홈 화면에서 바로 식별할 수 있게 구성했습니다.",
    ],
    nextSteps: [
      "실제 기기에서 위치 권한, 위젯 탭, 시스템 공유 시트, 네이버지도 scheme 동작을 검증합니다.",
      "네이버지도 앱 미설치 사용자를 위해 웹 지도 fallback 링크를 공유 문구에 추가합니다.",
      "한국어 문자열이 APK 화면과 공유 문구에서 깨지지 않는지 UTF-8 기준으로 점검합니다.",
      "주소 품질을 높이기 위해 Kakao Local API나 Naver Reverse Geocoding API 연동을 검토합니다.",
      "릴리즈 서명, versionCode 관리, R8 설정, 앱 이름과 패키지명을 확정해 배포 준비를 진행합니다.",
      "1x1 전체 공유, 2x1 지도 앱 선택, 3x2 지도별 버튼 위젯으로 UX를 확장합니다.",
      "목적지 저장, 거리, 예상 도착 시간 공유 기능을 위해 경로 API와 목적지 관리 UI를 추가합니다.",
    ],
    visual: "location",
    accent: "#3f6f9f",
    icon: MapPinned,
  },
  {
    slug: "streamer-alert-system",
    title: "스트리머 알림 시스템",
    eyebrow: "Streamer Alerts",
    summary:
      "라이브 상태 감지, 앱/위젯 알림, 웹 관리자 콘솔을 묶은 알림 시스템.",
    description:
      "YouTube와 Chzzk 라이브 상태를 주기적으로 감지하고, 상태 전환이 발생하면 Android 앱과 위젯에 알림을 전달하며, 웹 관리자 콘솔에서 감지 대상과 일정을 관리하는 구조입니다.",
    status: "building",
    statusLabel: "구현 중",
    year: "2026",
    updatedAt: "2026.04.25",
    tags: ["Firebase", "FCM", "Redis", "Android", "Admin"],
    highlights: [
      "백엔드 polling이 15분마다 YouTube와 Chzzk 상태를 조회하고 OFFLINE에서 LIVE로 바뀔 때 FCM data message를 전송합니다.",
      "무료 할당량 보호 로직이 YouTube, Redis, Firestore, Functions, Chzzk 사용량을 추적하고 한도 근접 시 차단합니다.",
      "Android 앱은 저장소를 직접 읽지 않고 공개 API를 통해 라이브 상태, 일정, quota 정보를 조회합니다.",
      "관리자 API는 감지 대상과 일정을 읽고 저장하며, 관리자 키와 Firebase ID token 인증을 함께 지원합니다.",
      "정적 관리자 웹 콘솔에서 스트리머 추가/삭제, 플랫폼/채널 ID, 오늘 게임, 주간 일정을 편집합니다.",
      "Android 앱은 Compose 탭 UI로 라이브 상태와 일정을 보여주고, FCM payload에 따라 앱과 위젯 문구를 갱신합니다.",
      "Firestore 직접 접근은 막고 서버 측 Admin SDK 경유만 허용하는 보안 구조를 사용합니다.",
    ],
    nextSteps: [
      "Firebase Functions, Android, Vercel에 필요한 운영 환경변수를 정리하고 실제 배포 설정을 확정합니다.",
      "운영 환경에서는 관리자 API CORS를 관리자 도메인으로 제한합니다.",
      "관리자 키 방식의 한계를 보완하기 위해 Firebase Auth, Clerk, 키 회전, rate limit을 검토합니다.",
      "관리자 API 설정 읽기/쓰기, 보안 규칙, polling fallback 순서에 대한 테스트를 추가합니다.",
      "Android 빌드와 실제 기기 알림/위젯 동작 검증을 진행합니다.",
      "중복 streamer ID, YouTube/Chzzk 채널 ID 형식, 일정 개수와 텍스트 길이를 검증합니다.",
      "Chzzk 비공식 응답 변경, FCM topic 구독 실패, quota 단계별 경고에 대비한 운영 화면을 보강합니다.",
      "배포 순서, 환경변수 예시, 관리자 웹 사용법, Android 빌드 절차를 UTF-8 문서로 정리합니다.",
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
