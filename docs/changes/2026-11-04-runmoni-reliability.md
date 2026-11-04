# 런모니0.3.2-dev 개발 프리뷰 게시 — 2026.11.04

실기기 검증 전 개발 prerelease의 실제 공개 자산을 확인한 뒤 공식 updater dry run/반영으로 메타데이터를 갱신했다.

- APK 출처: `8eb04d80e3b810f6514c7586dfefde4e1207f1f2`. 후속 피드/문서 커밋으로 재기록하지 않는다.
- 버전0.3.2-dev/code14, 218627853bytes, SHA256 `2b1789d22f811bdfe84e7c81dcb62aa472e3ed4a693f2831cf4fa3113ee809a4`.
- 기존 서명 인증서 SHA256 `a21359c657f6797f5fb8229c3098e48bc72a45f9d25269f8d41ff5122465df4a` 유지.
- [서명 CI41783393629](https://github.com/wjdals988/runmoni/actions/runs/41783393629): JVM76개, release lint오류0/경고64. 실제 APK 패키지/non-debuggable/내장 출처·서명, 서버 자산digest/크기·작은 sidecar·공개HEAD를 별도 대조했다.
- [공개 릴리스](https://github.com/wjdals988/runmoni/releases/tag/v0.3.2-dev) · [앱 PR24](https://github.com/wjdals988/runmoni/pull/24).
- 기존 다른8프로젝트/순서/sourceUrl, 기존6개 releaseNotes와 이전5개 이미지의 바이트를 보존했다. 최신 노트1개와 실제debug MainActivity 홈/러닝2장만 추가했다.
- 사진은 API29/TCG·TEST 서명·운영Firebase구성 없는 debug 실행이며 공개서명APK/실기기/Google/운영데이터 사진이 아니다. 초기 빈 프레임/합성 오류 상태를 갤러리에 사용하지 않았다.
- 저장/계정 변경은 구현됐지만 실제Google·다른기기복원·운영쓰기·실기기야외GPS는 미검증이다. 최신Rules는 소유자 게시완료보고를 반영했으며 이번새Rules변경은 없다. 실제 의복은 준비 중이다.

로컬 Node23개/실패0·coverage lines92.69%/branches86.14%/functions100%를 확인했다. CI/Production/운영 HTTP·PNG 결과는 [앱 최종 게시 검증](https://github.com/wjdals988/runmoni/blob/main/docs/RELEASE_REVIEW_0.3.2_20261104.md)에 후속 기록한다. 이전0.3.1의 출처3074c0f와 당시 검증 기록을 수정하지 않았다.
