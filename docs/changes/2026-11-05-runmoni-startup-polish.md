# 런모니0.3.5-dev 시작 화면·문구 정리 — 2026.11.05

공개 APK·서명CI·HEAD 검증 후 공식 updater의 dry run과 반영을 진행했다.

- 219017566bytes/SHA256 `ad0c5cb66d2bda2917ed0a9b6551a3d5c69fbb1ef872d6ce5e60dc49c3883559`. APK 실제 출처 `9d9d31dc358d9b0e47d34f73df4e9ad8276d80a9`를 후속 문서 커밋으로 바꾸지 않는다.
- [개발 릴리스](https://github.com/wjdals988/runmoni/releases/tag/v0.3.5-dev) · [앱 구현PR](https://github.com/wjdals988/runmoni/pull/31) · [서명CI](https://github.com/wjdals988/runmoni/actions/runs/42009532323).
- 다른8프로젝트·순서/sourceUrl·기존9내역·이전4이미지 바이트를 보존하고 새 내역1개와 실제 Main4장을 추가했다.
- API29/AOSP/TCG·TEST 서명 debug 검토 사진이다. 휴대폰·Google·운영 쓰기·Android12이상 실행과 사용자 시각 승인은 별도다.
- 로컬 검사와 CI·운영 페이지/이미지 검증 결과는 실제 실행 뒤 게시 검토에 기록한다.

로컬 Nodev24.19.0에서 npm test23개/실패·skip0과 저장소 coverage 임계값을 통과했다. line92.69%/branch86.14%/functions100.0%. 의존성 설치는 실행하지 않았다. PR/main CI와 Production 검증은 앱 게시 근거에 별도로 남긴다.
