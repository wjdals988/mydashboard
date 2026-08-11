import {
  BellRing,
  CalendarDays,
  Gift,
  Gauge,
  MapPinned,
  Plane,
  type LucideIcon,
} from "lucide-react";
import projectsData from "./projects.json";

export type ProjectStatus = "live" | "building" | "personal-use";
export type ProjectVisual =
  | "speed"
  | "calendar"
  | "location"
  | "alerts"
  | "coupons"
  | "travel";
export type ProjectIcon =
  | "bell"
  | "calendar"
  | "gauge"
  | "gift"
  | "map"
  | "plane";

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
  apk?: {
    url: string;
    fileName: string;
    version: string;
    versionCode: number;
    size: string;
    sha256: string;
    releaseUrl: string;
    label: string;
  };
  tags: string[];
  highlights: string[];
  nextSteps: string[];
  visual: ProjectVisual;
  accent: string;
  icon: LucideIcon;
};

type ProjectData = Omit<Project, "icon"> & {
  icon: ProjectIcon;
};

const projectIcons = {
  bell: BellRing,
  calendar: CalendarDays,
  gauge: Gauge,
  gift: Gift,
  map: MapPinned,
  plane: Plane,
} satisfies Record<ProjectIcon, LucideIcon>;

export const projects: Project[] = (projectsData as ProjectData[]).map(
  (project) => ({
    ...project,
    icon: projectIcons[project.icon],
  }),
);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const statusTone: Record<ProjectStatus, string> = {
  live: "border-emerald-700/20 bg-emerald-700/10 text-emerald-900",
  building: "border-rose-700/20 bg-rose-700/10 text-rose-900",
  "personal-use": "border-sky-700/20 bg-sky-700/10 text-sky-900",
};
