import {
  BellRing,
  CalendarDays,
  Gauge,
  Gift,
  MapPinned,
  Plane,
  type LucideIcon,
} from "lucide-react";
import type { ProjectIcon as ProjectIconName } from "@/lib/projects";

const icons = {
  bell: BellRing,
  calendar: CalendarDays,
  gauge: Gauge,
  gift: Gift,
  map: MapPinned,
  plane: Plane,
} satisfies Record<ProjectIconName, LucideIcon>;

export function ProjectIcon({
  name,
  size = 16,
  className,
}: {
  name: ProjectIconName;
  size?: number;
  className?: string;
}) {
  const Glyph = icons[name];

  return <Glyph aria-hidden="true" className={className} size={size} />;
}
