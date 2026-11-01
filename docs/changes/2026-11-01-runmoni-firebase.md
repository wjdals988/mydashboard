# 런모니0.2.1 Firebase 연결 프리뷰

사용자의 기존 main 병합·APK/운영 대시보드 배포 승인에 따라 실기기 검증 전 개발 prerelease의 다운로드를 갱신한다. 일반 정식 출시나 실제 휴대폰·Google 로그인 성공으로 표시하지 않는다.

- [서명 CI41321774862](https://github.com/wjdals988/runmoni/actions/runs/41321774862) 성공. JVM42개 실패/오류/skip0, release lint오류0/경고60, 실제 APK의 기존 서명·non-debuggable·패키지/버전·내장 출처 검사 통과.
- [앱 게시 근거](https://github.com/wjdals988/runmoni/blob/main/docs/RELEASE_REVIEW_20261101.md) · [릴리스](https://github.com/wjdals988/runmoni/releases/tag/v0.2.1-dev).
- 0.2.1-dev/code11,218431245bytes, SHA256 `2b74ee38f56be2fcfbe88a5b74b2a11c84c8817c961da467a5f7151f12833218`.
- APK 실제 출처 `c6bc5739746fe176269fed3bf64360417b50875e`. 이후 문서/피드/대시보드 커밋으로 바꾸지 않는다. 동일 보관 인증서 `a21359c657f6797f5fb8229c3098e48bc72a45f9d25269f8d41ff5122465df4a`다.
- 공개 전후3자산의 ID/크기/서버digest와 작은 sidecar 본문, 공개 APK HEAD200/크기를 앱 저장소에서 확인했다. APK 바이너리를 이 대시보드에 저장하거나 재다운로드하지 않았다.
- 공식 updater dry run/반영, Node23개 실패/skip0, `git diff --check` 통과. 다른8개 프로젝트/순서/이전0.2.0·0.1.6·0.1.1 이력을 보존한다.

Firebase Android 설정과 닉네임 방·입장·실시간 채팅·연결/휴대폰 점검을 안내한다. 운영 공개 목록 읽기는 통과했지만 익명 방 쓰기·두 휴대폰 채팅·Google 계정 선택/백업·야외 GPS는 미검증이다. 익명 프로필 복구 제한과 Firebase 미지원 음성/음악·정확 위치 공유를 명시한다.

기존7장은0.2.0 개발본/로컬 검증 서버의 Android 에뮬레이터 검토 화면임을 유지한다.0.2.1 Firebase 운영 화면이나 실제 휴대폰으로 표시하지 않는다. System UI ANR가 겹친 새 검토 PNG는 갤러리에 추가하지 않는다.

운영 Vercel 상태·실제 페이지의 새 버전/다운로드/해시는 main 반영 후 확인한다.
