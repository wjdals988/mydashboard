import projectsData from "./projects.json";

export type ProjectStatus = "live" | "building" | "personal-use";
export type ProjectVisual =
  | "currency"
  | "speed"
  | "calendar"
  | "location"
  | "alerts"
  | "coupons"
  | "starlink"
  | "travel";
export type ProjectIcon =
  | "bell"
  | "coins"
  | "calendar"
  | "gauge"
  | "gift"
  | "gamepad"
  | "map"
  | "plane";

export type ProjectApk = {
  url: string;
  fileName: string;
  version: string;
  versionCode: number;
  size: string;
  sha256: string;
  releaseUrl: string;
  label: string;
};

export type ProjectReleaseNote = {
  version: string;
  versionCode: number;
  date: string;
  notes: string[];
};

// icon은 컴포넌트가 아니라 문자열 키로 둔다. 그래야 프로젝트 객체 전체가
// 직렬화 가능해지고, 서버 컴포넌트에서 클라이언트 필터로 그대로 넘길 수 있다.
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
  apk?: ProjectApk;
  releaseNotes?: ProjectReleaseNote[];
  tags: string[];
  highlights: string[];
  nextSteps: string[];
  visual: ProjectVisual;
  accent: string;
  icon: ProjectIcon;
};

export const projects = projectsData as Project[];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export type ProjectPlatform = "web" | "android";

export function platformsOf(project: Project): ProjectPlatform[] {
  const platforms: ProjectPlatform[] = [];

  if (project.liveUrl) {
    platforms.push("web");
  }

  if (project.apk) {
    platforms.push("android");
  }

  return platforms;
}

export const statusOrder: ProjectStatus[] = ["live", "building", "personal-use"];

export const statusLabels: Record<ProjectStatus, string> = {
  live: "운영 중",
  building: "구현 중",
  "personal-use": "개인 사용 중",
};

// 홈 상단 지표. 하드코딩하면 프로젝트를 추가할 때마다 숫자가 어긋난다.
export function projectStats() {
  const byStatus = statusOrder.map((status) => ({
    status,
    label: statusLabels[status],
    count: projects.filter((project) => project.status === status).length,
  }));

  return {
    total: projects.length,
    byStatus,
    downloads: projects.filter((project) => project.apk).length,
    liveServices: projects.filter((project) => project.liveUrl).length,
    lastUpdatedAt: projects
      .map((project) => project.updatedAt)
      .sort()
      .at(-1),
  };
}

export const downloadableProjects = projects.filter((project) => project.apk);

export const statusTone: Record<ProjectStatus, string> = {
  live: "border-[var(--accent-line)] bg-[var(--live-soft)] text-[var(--live)]",
  building:
    "border-[color-mix(in_srgb,var(--building)_32%,transparent)] bg-[var(--building-soft)] text-[var(--building)]",
  "personal-use":
    "border-[color-mix(in_srgb,var(--personal)_32%,transparent)] bg-[var(--personal-soft)] text-[var(--personal)]",
};

export const statusDot: Record<ProjectStatus, string> = {
  live: "bg-[var(--live)]",
  building: "bg-[var(--building)]",
  "personal-use": "bg-[var(--personal)]",
};
