import Image from "next/image";
import type { Project } from "@/lib/projects";
import type { CSSProperties } from "react";

export type ArtworkProject = Pick<
  Project,
  "title" | "visual" | "accent" | "screenshots"
>;

export function ProjectArtwork({
  project,
  priority = false,
}: {
  project: ArtworkProject;
  priority?: boolean;
}) {
  const shots = project.screenshots?.slice(0, 2);
  return (
    <div
      className={`project-artwork artwork-${project.visual}`}
      aria-hidden="true"
      style={{ "--project-accent": project.accent } as CSSProperties}
    >
      {shots?.length ? (
        <div className="art-phones">
          {shots.map((shot, index) => (
            <Image
              key={shot.src}
              alt=""
              src={shot.src}
              width={shot.width}
              height={shot.height}
              sizes="(min-width: 768px) 180px, 145px"
              priority={priority}
              className={`art-phone art-phone-${index}`}
            />
          ))}
        </div>
      ) : (
        <svg className="project-drawing" viewBox="0 0 320 200" fill="none">
          {project.visual === "starlink" && (
            <>
              <g className="art-stars" fill="currentColor">
                {[
                  [24, 29],
                  [88, 160],
                  [274, 30],
                  [288, 168],
                  [144, 28],
                  [36, 122],
                  [206, 176],
                ].map(([x, y]) => (
                  <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" />
                ))}
              </g>
              <path
                className="art-route"
                pathLength="1"
                d="M40 125 101 66 168 117 244 60 280 128M101 66 122 158 168 117 224 155 280 128"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="1"
              />
              {[
                [40, 125],
                [101, 66],
                [168, 117],
                [244, 60],
                [280, 128],
                [122, 158],
                [224, 155],
              ].map(([x, y], i) => (
                <g key={i} className="art-node">
                  <rect
                    x={x - 8}
                    y={y - 8}
                    width="16"
                    height="16"
                    rx="3"
                    transform={`rotate(45 ${x} ${y})`}
                    fill="var(--surface)"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx={x} cy={y} r="2.5" fill="currentColor" />
                </g>
              ))}
            </>
          )}
          {project.visual === "speed" && (
            <>
              <circle
                className="art-ring"
                cx="160"
                cy="100"
                r="69"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity=".3"
              />
              <path
                className="art-route"
                pathLength="1"
                d="M91 100a69 69 0 0 1 112-54"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="1"
              />
              <rect
                className="art-lift"
                x="130"
                y="58"
                width="60"
                height="85"
                rx="30"
                fill="var(--surface)"
                stroke="currentColor"
                strokeWidth="2.5"
              />
              <path
                d="M160 59v30m-29 0h58"
                stroke="currentColor"
                strokeWidth="2.5"
              />
              <path
                className="art-spark"
                d="m212 68 13-14m-8 43h19m-26 34 14 12"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </>
          )}
          {project.visual === "calendar" && (
            <>
              <rect
                className="art-lift"
                x="71"
                y="36"
                width="178"
                height="137"
                rx="12"
                fill="var(--surface)"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M72 73h176M111 26v23m97-23v23"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {[0, 1, 2].flatMap((row) =>
                [0, 1, 2, 3, 4].map((col) => (
                  <rect
                    key={`${row}-${col}`}
                    x={94 + col * 28}
                    y={90 + row * 23}
                    width="14"
                    height="12"
                    rx="3"
                    fill="currentColor"
                    opacity={(row + col) % 3 === 0 ? 1 : 0.13}
                  />
                )),
              )}
              <path
                className="art-route"
                pathLength="1"
                d="m183 144 7 7 14-16"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="1"
              />
            </>
          )}
          {project.visual === "currency" && (
            <>
              <g className="art-currency-back">
                <rect
                  x="64"
                  y="39"
                  width="113"
                  height="108"
                  rx="13"
                  fill="var(--surface)"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M136 66c-5-6-21-7-27 2-8 12-1 33 12 33 6 0 11-2 15-6M102 78h28m-28 9h25"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </g>
              <g className="art-currency-front">
                <rect
                  x="143"
                  y="71"
                  width="113"
                  height="108"
                  rx="13"
                  fill="var(--surface)"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="m177 102 9 38 13-31 13 31 9-38m-50 16h57"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <path
                className="art-route"
                pathLength="1"
                d="M181 43h51l-9-9m9 9-9 9M138 172H87l9-9m-9 9 9 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="1"
              />
            </>
          )}
          {project.visual === "location" && (
            <>
              <ellipse
                cx="160"
                cy="151"
                rx="89"
                ry="27"
                stroke="currentColor"
                opacity=".2"
              />
              <ellipse
                className="art-ring"
                cx="160"
                cy="151"
                rx="55"
                ry="16"
                stroke="currentColor"
                opacity=".4"
              />
              <path
                className="art-lift"
                d="M160 35c-27 0-49 22-49 49 0 37 49 72 49 72s49-35 49-72c0-27-22-49-49-49Z"
                fill="var(--surface)"
                stroke="currentColor"
                strokeWidth="2.5"
              />
              <circle
                cx="160"
                cy="83"
                r="16"
                stroke="currentColor"
                strokeWidth="2.5"
              />
              <path
                className="art-route"
                pathLength="1"
                d="M59 131h29l17-20M227 116l16-14h28"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="1"
              />
            </>
          )}
          {project.visual === "coupons" && (
            <>
              <g className="art-lift">
                <path
                  d="M75 55h170v29a16 16 0 0 0 0 32v29H75v-29a16 16 0 0 0 0-32V55Z"
                  fill="var(--surface)"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M192 57v86"
                  stroke="currentColor"
                  strokeDasharray="4 5"
                />
                <path
                  d="M101 111h55m-45-14h34"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {[207, 212, 220, 226, 232].map((x, i) => (
                  <path
                    key={x}
                    d={`M${x} 82v37`}
                    stroke="currentColor"
                    strokeWidth={i % 2 ? 2 : 4}
                  />
                ))}
              </g>
              <path
                className="art-route"
                pathLength="1"
                d="M99 43h133M91 157h133"
                stroke="currentColor"
                opacity=".35"
                strokeWidth="2"
                strokeDasharray="1"
              />
            </>
          )}
          {project.visual === "travel" && (
            <>
              <path
                d="m61 56 65-20 68 20 65-20v125l-65 20-68-20-65 20V56Z"
                fill="var(--surface)"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M126 37v123m68-103v123"
                stroke="currentColor"
                opacity=".25"
              />
              <path
                className="art-route"
                pathLength="1"
                d="M82 128c25-60 47 15 78-26s48-35 74-24"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="1"
                strokeLinecap="round"
              />
              <circle
                cx="83"
                cy="127"
                r="6"
                fill="var(--surface)"
                stroke="currentColor"
                strokeWidth="2"
              />
              <g className="art-lift">
                <path
                  d="M234 57c-9 0-16 7-16 16 0 11 16 24 16 24s16-13 16-24c0-9-7-16-16-16Z"
                  fill="currentColor"
                />
                <circle cx="234" cy="73" r="5" fill="var(--surface)" />
              </g>
            </>
          )}
          {project.visual === "alerts" && (
            <>
              {[0, 1, 2].map((n) => (
                <g key={n} className={`art-notice art-notice-${n}`}>
                  <rect
                    x={83 + n * 12}
                    y={40 + n * 42}
                    width="150"
                    height="34"
                    rx="9"
                    fill="var(--surface)"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <circle
                    cx={102 + n * 12}
                    cy={57 + n * 42}
                    r="5"
                    fill="currentColor"
                  />
                  <path
                    d={`M${118 + n * 12} ${53 + n * 42}h75m-75 9h45`}
                    stroke="currentColor"
                    strokeWidth="2"
                    opacity=".5"
                    strokeLinecap="round"
                  />
                </g>
              ))}
              <path
                className="art-route"
                pathLength="1"
                d="m64 48-12-5m12 24H48m18 15-10 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="1"
              />
            </>
          )}
          {project.visual === "running" && (
            <path
              className="art-route"
              pathLength="1"
              d="M55 130c30 0 20-70 65-70s25 95 76 60 35-70 70-35"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="1"
            />
          )}
        </svg>
      )}
    </div>
  );
}
