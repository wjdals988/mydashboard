# 2026-10-24 런모니 서명 APK 공개 등록

## 목적과 원격 변경 보존

- 이전 로컬 `265a24d`에서 원격 main `4f428a6`을 병합했습니다.
  원격 카탈로그 UX·검색·필터, Next.js 16.3.8과 여긴얼마 2.5.3을 유지합니다.
- 순차 작업 재개 때 추가 원격 `3a2b35e`를 병합해 여긴얼마 2.5.4를 보존했습니다.
- 프로젝트는 기존과 같은 9개입니다. 런모니 외 8개 객체와 배열 순서를
  원격 기준으로 비교해 보존 여부를 확인합니다.
- 런모니 상태는 `building` / `개발 미리보기`이며 `liveUrl`은 없습니다.
  다운로드 제공 프로젝트 수만 5개에서 6개로 늘어납니다.

## 공개 APK 근거

- [공개 릴리스](https://github.com/wjdals988/runmoni/releases/tag/v0.1.1-dev)는
  `draft=false`, `prerelease=true`입니다.
- [GitHub API](https://api.github.com/repos/wjdals988/runmoni/releases/tags/v0.1.1-dev)의
  APK 자산 URL·파일명·크기·`digest`를 프로그램으로 추출했습니다.
- 공개 값은 [검증 스냅샷](2026-10-24-runmoni-release.json)에 기록합니다.
  APK는 `200,693,280 bytes`, 버전은 `0.1.1-dev`, `versionCode`는 `2`입니다.
- 과거 수기 해시의 형식 오류를 정정했습니다. 현재 해시는 API `digest`의
  `sha256:` 접두사 제거 후 정확히 64자리 소문자 16진수인지 검사했습니다.
- 앱 담당자가 실제 APK의 로컬 해시·서명과 API 자산의 해시·크기가 일치함을
  확인했습니다. APK 바이너리는 변경하지 않았습니다.
- `update:apk --dryRun` 검증 후 같은 메타데이터로 실제 갱신했습니다.
- 기존 카탈로그는 `signed release APK` 이외의 라벨을 디버그 APK로
  표시합니다. 실제 release 빌드·릴리스 키 서명 사실에 맞게 이 라벨을 쓰고,
  개발 버전과 `prerelease=true`, `개발 미리보기` 상태는 별도로 유지했습니다.

## APK와 최신 소스의 경계

- 이번 공개 APK에는 Firebase SDK·Google 로그인·원격 백업이 없습니다.
  현재 실제 저장소는 Room과 로컬 FastAPI·SQLite입니다.
- Firebase 연동을 추가한 `0.1.2-dev` 소스는 온라인·오프라인 빌드와 JVM 15개·UI 17개를 통과했고 `d98001c`로 main에 게시했습니다.
  실제 Google 로그인 0건·원격 Rules 배포 검증 0건·실기기 검증 0건입니다.
  개발 소스의 구현을 공개 APK의 기능으로 표시하지 않습니다.
- 기존 자동 테스트 82건과 이번 릴리스 JVM 6건은 중복될 수 있으므로
  합산하지 않습니다. 릴리스 lint 오류 0개·경고 17개, SDK 36 에뮬레이터
  설치·실행 확인과 실기기 미검증을 구분합니다.
- 지도·HTTPS API·LiveKit 운영과 실제 야외 GPS·2대 기기 음성·DJ 송출은
  미검증입니다. 테스트용 외부 공개 터널과 방화벽 예외는 추가하지 않습니다.
- 예전 `0.1.0-dev` debug APK와 인증서가 달라 이전 테스트 앱 사용자는
  필요한 GPX를 먼저 내보낸 뒤 제거하고 설치해야 합니다.

## 대시보드 검증

- 로컬 Node.js 24.22.1 / npm 11.19.1에서 `npm ci --no-audit --no-fund`로
  고정 의존성 354개를 39초에 복원했습니다. 전송량은 별도 측정하지 않았습니다.
- `npm test`: 23개 통과, 실패·건너뜀 0개. APK 갱신 스크립트 커버리지는
  줄 92.69%, 분기 86.14%, 함수 100%입니다.
- `npm run lint`: 통과. `npm run build`: Next.js 16.3.8 정적 페이지 25개
  생성 통과. 상위 폴더 lockfile을 무시한다는 경고 1건은 앱 빌드를 막지 않았습니다.
- GitHub CI의 Node.js 22.22.0 환경은 아직 실행하지 않았습니다.
- 원격 main JSON과 비교해 런모니 외 프로젝트 8개와 전체 배열 순서가 같으며,
  로컬 APK 파일에서 계산한 SHA-256·크기는 등록 메타데이터와 일치합니다.
- `npm audit --audit-level=high`: 실패. 기존 Next.js 16.3.8 critical 및
  Zod high 총 2개 패키지가 보고되었습니다. 실제 악용 여부나 사이트의 각
  취약 조건 충족 여부를 검증한 것은 아닙니다.
- 공식 권고를 확인한 뒤 Next.js와 eslint-config-next를 16.4.3으로 최소
  갱신하려 했으나, 사용자의 인터넷 지연 보고에 따라
  본 작업의 npm 프로세스와 후속 명령 셸만 확인하여 종료했습니다.
  갱신은 패키지 메타데이터 조회 단계였으며 package.json·package-lock.json은
  변경되지 않았습니다. 인터넷 장애의 원인은 확정하지 않았습니다.
- 위 중단 시점에는 커밋·푸시·Vercel 배포를 수행하지 않았습니다. 아래 재개 결과와 구분합니다.

## 순차 재개와 게시 검증 절차

- 사용자 요청에 따라 작업은 한 번에 1개만 실행했습니다. 잠금 정보 갱신은 `--package-lock-only --ignore-scripts --maxsockets=1 --fetch-retries=0 --fetch-timeout=15000`으로 수행했습니다. 전체 패키지 설치나 에뮬레이터를 PC에서 실행하지 않았습니다.
- Next.js·eslint-config-next **16.3.8 → 16.4.3**, 같은 계열 Next 내부 패키지 10개와 Zod **4.3.6 → 4.6.7**만 버전을 바꿨습니다. 잠금 정보 갱신은 각각 약 5초·1초였습니다.
- 새 잠금 정보의 `npm audit --audit-level=high` 결과는 **0개**입니다. 카탈로그/업데이터 테스트는 **23/23**, 실패·건너뜀 0개로 다시 통과했습니다.
- 새 Next.js 바이너리는 PC에 설치하지 않았습니다. 이전 16.3.8의 로컬 lint·빌드 결과를 새 16.4.3의 검증으로 간주하지 않습니다. 새 버전의 `npm ci`·audit·test·lint·build는 원격 GitHub CI에서, 실제 호스팅 빌드는 Vercel에서 각각 확인합니다.
- APK 링크와 SHA-256은 기존 공개 파일을 재사용합니다. 대시보드 업데이트 때문에 APK를 교체하거나 200MB 파일을 다시 다운로드하지 않습니다.
- 게시 후에는 해당 main 커밋의 GitHub 체크와 Vercel 상태, [런모니 실제 페이지](https://coldbrewventi.vercel.app/projects/runmoni)의 버전·다운로드 주소·체크섬을 함께 대조합니다. Firebase 실제 로그인·원격 백업은 여전히 미검증입니다.

의존성 권고 확인 출처(2026-10-24):

- [Next.js Image Optimization](https://github.com/advisories/GHSA-2464-fhr4-w9xw)
- [Next.js Server Actions](https://github.com/advisories/GHSA-p3m5-59mp-jv5r)
- [Next.js use cache](https://github.com/advisories/GHSA-673q-mjm6-r5xr)
- [Zod](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5)
