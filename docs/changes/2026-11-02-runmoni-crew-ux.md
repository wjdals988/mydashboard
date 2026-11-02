# 런모니0.3 크루 계층·옷장 UI/UX — 검증된 APK와 화면 갱신

0.3.0-dev/code12 서명 개발 prerelease가 공개된 뒤 공식 updater로 다운로드를 갱신했다. [공개 릴리스](https://github.com/wjdals988/runmoni/releases/tag/v0.3.0-dev) · [서명 CI41508813724](https://github.com/wjdals988/runmoni/actions/runs/41508813724). 게시일은2026-11-03(한국 시간, UTC2026-11-02)이다.

APK 실제 출처는 `01e37ab3f7ac13cc3b69d37576a6d623274de101`, 218496781bytes, SHA256 `a080129a7ac2d2cb75e507d476e28f0e72308276ba70d3b4232125928d8af387`이다. 기존 보관 인증서 SHA256 `a21359c657f6797f5fb8229c3098e48bc72a45f9d25269f8d41ff5122465df4a`와 일치하며 버전/패키지·non-debuggable·내장 출처 검사를 CI에서 통과했다. JVM45개·release lint오류0/경고60, 서버3자산의 크기/해시·작은 sidecar 본문·익명 공개 HEAD200/크기 일치를 확인했다. APK 전체를 클라우드에 재다운로드하지 않았고 실제 휴대폰 실행은 별도 미검증이다.

## 준비한 제품 소개

- 크루가 최상위이고 파티는 소속 크루 안에서 생성·참가·주최자/크루장이 보존 삭제하는 하위 모임임을 설명한다.
- 승인 원본의 남녀 기본형과8프레임 재생, 전 아이템0P 획득/선택 저장, 기존 포인트·보유권·아이템 ID 보존을 안내한다.
- 가로 카테고리/그리드와 큰 글씨 배치를 소개하되 비기본 의상은 선택만 보관하고 승인 기본형을 표시하는 한계를 명시한다. 전체58종 원화 완성이나 수영복 승인을 주장하지 않는다.
- 새 Firebase 규칙의 소유자 운영 게시와 실제 휴대폰·Google 로그인·운영 두 기기 동작은 아직 대기/미검증이다.

## 갤러리 출처

[앱 PR19](https://github.com/wjdals988/runmoni/pull/19)의 실제 MainActivity debug 검토 이미지5장을 재인코딩 없이 그대로 복사했다. 크루/파티/채팅은 로컬 HTTP 검증 서버의 테스트 데이터다. Android fixture 사진은 이5장 목록에 포함하지 않았으며 실제 휴대폰·운영 Firebase·공개 서명 APK를 직접 실행한 화면으로 표시하지 않는다.

파티 상세 화면은 HTTP 음성 패널이 기본 Firebase 경로와 달라 갤러리에서 제외했다. 옷장 이미지는 여자 기본형에서 비기본 의상 선택을 보관한 상태이며 실제 의상 미리보기 완성으로 소개하지 않는다.

| 대상 PNG | 원본 검토 PNG | SHA256 |
|---|---|---|
| `home.png` | `mainactivity-home.png` | `f6d662f37f0dbd06e63a0834f4dec0ce7ea0d30a326a25fd37bec6dc6503672b` |
| `crews.png` | `mainactivity-crew-list.png` | `dd49edaea76cdb5a8916b166f448da3a1821cc5eee507e412d3587b299978131` |
| `crew.png` | `mainactivity-crew-detail.png` | `fa250ad17a32f55885143dfc4d7de5a678ada7fa8dc8d5003f68b3b50e956fff` |
| `closet.png` | `mainactivity-closet-female-free-selection.png` | `28bc945871b114697bbc4225cf39ba4f899598a8e52ac0870d2f154325be0317` |
| `chat.png` | `mainactivity-party-chat.png` | `afa6edde58a1d9b3d93178ccaca3df492e95cc218f4c9cac13a7fd6ca207378a` |

복사5개는 원본과 대상의 바이트·SHA256·크기/PNG 치수 일치를 확인했다. 대시보드의 다른8개 프로젝트/순서·이전 releaseNotes4개/sourceUrl을 보존했다. 새0.3 내역은 기존 이력 앞에 추가했고 APK 메타데이터/updatedAt만 이번 게시에 맞게 갱신했다. APK 바이너리는 GitHub Release에만 둔다.

## 검증과 운영 반영

Node23개 통과/실패·skip0, updater coverage선92.69%·분기86.14%·함수100%다. `git diff --check`를 통과했다. main 통합 전 GitHub CI의 audit/테스트/lint/build와 Vercel 미리보기를 확인하고 통합 뒤 실제 운영 URL의 버전·다운로드·해시/사진을 검증한다. 실제 운영 결과는 앱의 게시 검토 기록에도 남긴다. 새 Firebase 규칙 운영 게시·실기기/Google/운영 두 기기 동작은 완료로 바꾸지 않는다.
