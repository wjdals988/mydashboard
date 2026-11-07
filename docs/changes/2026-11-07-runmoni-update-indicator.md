# 런모니0.3.8 업데이트 표시 간격 — 2026.11.07

우상단 레드닷과 버전/설정의 겹침을 수정한 같은 키 개발 프리뷰를 연결했다.

- [구현 PR](https://github.com/wjdals988/runmoni/pull/37) · [릴리스](https://github.com/wjdals988/runmoni/releases/tag/v0.3.8-dev) · [서명 CI](https://github.com/wjdals988/runmoni/actions/runs/42373912871).
- APK 실제 출처 `f55bdd6343770847e2284a75faf40063c22a5951`, 219246942bytes/SHA256 `c4b484900795defb6d2d5b47d7f9b3545ed99174a07445c2e52edf51937ac76c`. 후속 문서 커밋으로 바꾸지 않는다.
- 새 JVM115/서명·패키지/내장 출처·3자산/sidecar/HEAD를 대조했다. Android11회(기본9/실제320dp·글씨2배 native2)와 정확한 앱XML/프로필·통제 설정/권한/관찰 전원 복원은 별도 debug 근거다. 이전 BG2/Android63과 합산하지 않는다.
- 갤러리4장은 실제 Android ComponentActivity UI 픽스처다. 합성99.0.0-dev를 사용하며 MainActivity·실제 공개99·실기기·Google·새GPS/Doze/API31+ 실행이나 사용자 승인을 뜻하지 않는다.
- 공식 updater dry run/반영 후 다른8프로젝트·순서/sourceUrl·기존12내역/4PNG를 보존했다. Node검사·CI/Preview/Production·운영 페이지/PNG 확인은 실제 결과를 별도로 기록한다.

Nodev24.19.0의 실제 로컬 검사23개가 모두 통과했다(실패/skip0). 커버리지는 lines92.69%/branches86.14%/functions100.0%다. 설치/로컬Next빌드는 실행하지 않았으며 CI/Preview/Production 결과는 별도다. 로컬 debug JVM115/lint0·39는 build1의 실제 실행을 test-only build2가 UP-TO-DATE로 재사용했고, 서명CI의 새115회와 합산하지 않는다.
