# JM 프로젝트 보드

직접 만들고 운영하는 웹 서비스와 Android 앱을 한곳에 정리한 대시보드입니다.
Next.js App Router로 만들고 Vercel에서 `main` 브랜치를 자동 배포합니다.

## 기술 스택

- Next.js(App Router) · React · TypeScript
- Tailwind CSS v4 (`@theme inline` 토큰)
- 본문 글꼴: Pretendard Std Variable(self-host, SIL OFL 1.1)
- 코드/숫자 글꼴: 운영체제 기본 monospace(`SF Mono`, Menlo, Consolas fallback)

## 실행

```bash
npm install
npm run dev
```

```bash
npm run lint
npm run build
```

## 데이터 구조

프로젝트 정보의 단일 원천은 `src/lib/projects.json` 하나입니다. 배열 순서가
화면 표시 순서이고, 타입은 `src/lib/projects.ts`의 `Project`가 정의합니다.

| 필드 | 설명 |
|---|---|
| `slug` | URL 경로(`/projects/<slug>`)이자 `update:apk`의 대상 키 |
| `status` | `live` \| `building` \| `personal-use` — 필터와 배지 색을 결정 |
| `liveUrl` | 있으면 "웹" 플랫폼으로 분류되고 상세 화면에 라이브 미리보기가 붙음 |
| `apk` | 있으면 "Android"로 분류되고 다운로드 영역·구조화 데이터에 포함 |
| `visual` | 카드 미리보기 도식 종류. `src/components/project-visual.tsx`와 1:1 |
| `icon` | lucide 아이콘 키. `src/components/project-icon.tsx`와 1:1 |
| `accent` | 카드 상단 선, 아이콘 배경, 도식 강조에 쓰는 프로젝트 고유색 |

홈 상단 지표는 `projectStats()`가 이 파일에서 매번 계산합니다. 숫자를 따로
적어 두지 않으므로 프로젝트를 추가·수정하면 자동으로 맞습니다.

`visual`이나 `icon`에 새 값을 쓰려면 타입 유니온과 대응 컴포넌트를 함께
추가해야 합니다(추가하지 않으면 타입 에러로 빌드가 막힙니다).

## APK 메타데이터 갱신

앱 저장소에서 릴리스를 올린 뒤 실행합니다. 자세한 절차와 GitHub Actions
예시는 [docs/release-automation.md](docs/release-automation.md)에 있습니다.

```bash
npm run update:apk -- --slug <slug> --url <apk url> --fileName <name> \
  --version <x.y.z> --versionCode <n> --size "<n> bytes" --sha256 <hash> \
  --releaseUrl <release page url>
```

실제 파일을 바꾸기 전 `--dryRun`을 붙이면 검증 결과만 출력합니다. APK 파일은
대시보드 Git 저장소에 넣지 않고 앱 저장소의 GitHub Release asset으로 올립니다.
대시보드에는 서명 검증을 마친 APK의 URL, 크기, SHA-256만 기록합니다.

> 이 스크립트는 **이미 있는 `slug`만 갱신**합니다. 신규 프로젝트는
> `projects.json`에 엔트리를 먼저 추가한 뒤 실행하세요.

## 환경변수

| 이름 | 필수 | 설명 |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | 선택 | 사이트 절대 URL. 지정하지 않으면 Vercel이 주입하는 `VERCEL_PROJECT_PRODUCTION_URL`을 쓰고, 그것도 없으면 `http://localhost:3000`을 씁니다. `sitemap.xml`, `robots.txt`, OG 이미지 URL, 구조화 데이터의 기준이 됩니다. |

커스텀 도메인을 붙였다면 Vercel 프로젝트 환경변수에 `NEXT_PUBLIC_SITE_URL`을
그 도메인으로 넣어 주세요.

## 화면 테마

다크를 기본값으로 두고 시스템 설정(`prefers-color-scheme`)을 따릅니다. 헤더의
토글로 시스템·라이트·다크를 고를 수 있고 선택값은 `localStorage`에 남습니다.
첫 페인트 전에 인라인 스크립트가 `data-theme`을 적용해 화면 깜빡임이 없습니다.

## SEO·공유

- `sitemap.xml`, `robots.txt` 자동 생성
- OG 이미지는 `next/og`로 빌드 시 생성(`/opengraph-image`, `/projects/<slug>/opengraph-image`)
- JSON-LD: `WebSite`, `Person`, APK가 있는 프로젝트마다 `SoftwareApplication`

> OG 이미지 문자열은 의도적으로 영문·숫자만 씁니다. 이미지 렌더러(Satori)가
> woff2 가변 글꼴을 읽지 못해 한글을 넣으면 글자가 깨집니다.

## 글꼴 라이선스

`public/fonts/PretendardStdVariable.woff2`는 SIL Open Font License 1.1로
배포되는 Pretendard Std입니다. 전문은 `public/fonts/Pretendard-OFL.txt`에
포함했습니다. 상업적 사용이 허용되며, 재배포 시 이 라이선스 파일을 함께
유지해야 합니다. KS X 1001 음절 집합을 담은 판본이라 아주 드문 한글 음절은
시스템 글꼴로 대체될 수 있습니다.
