import {
  BellRing,
  CalendarDays,
  Coins,
  Gauge,
  Gamepad2,
  Gift,
  MapPinned,
  Plane,
  type LucideIcon,
} from "lucide-react";
import type { ProjectIcon as ProjectIconName } from "@/lib/projects";

const icons = {
  bell: BellRing,
  calendar: CalendarDays,
  coins: Coins,
  gauge: Gauge,
  gift: Gift,
  gamepad: Gamepad2,
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
