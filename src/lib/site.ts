const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

// 우선순위: 명시적 환경변수 > Vercel이 주입하는 프로덕션 도메인 > 로컬.
// 배포 도메인을 코드에 하드코딩하지 않으므로 도메인이 바뀌어도 수정할 곳이 없다.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
  : productionUrl
    ? `https://${productionUrl}`
    : "http://localhost:3000";

export const site = {
  name: "JM 프로젝트 보드",
  shortName: "JM Board",
  tagline: "직접 만들고 운영하는 제품을 한곳에서",
  description:
    "웹 서비스와 Android 앱을 직접 설계·구현·운영하며 남긴 기록입니다. 각 제품의 구현 범위, 남은 과제, 설치 파일을 같은 기준으로 정리했습니다.",
  author: "JM",
  github: "https://github.com/wjdals988",
  locale: "ko_KR",
} as const;
