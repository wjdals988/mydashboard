# 런모니0.3.6-dev 첫 로그인 선택 — 2026.11.06

실제 공개 APK·서명 CI·HEAD와 Android/시각 검토 후 공식 updater의 dry run과 반영을 진행했다.

- [개발 릴리스](https://github.com/wjdals988/runmoni/releases/tag/v0.3.6-dev) · [구현 PR](https://github.com/wjdals988/runmoni/pull/33).
- 219066718bytes/SHA256 `e05bc3be0fa4d4a4120ac2d01aea993662fb8abdcd647da4c094de3f838e61b1`. 실제 APK 출처 `d27b31f85eafa42eb4c96fe17ff2483536d919f0`를 후속 문서 커밋으로 바꾸지 않는다.
- Android18회와 실제 Main7장·게스트 선택 저장/새 프로세스 재시작·화면 복귀·원문/설정 복원을 확인했다. 이전 같은 APK의 통과 원문 채택: 없음. 실패 그룹은 합산하지 않는다.
- 갤러리4장은 TEST 서명·Firebase 미설정 debug·API29/AOSP/TCG의 실제 MainActivity다. 실제 휴대폰·Google·운영 쓰기·API31 실행이나 사용자 시각 승인으로 표시하지 않는다.
- 기존10내역/4PNG·다른8프로젝트·순서/sourceUrl을 보존했다. 운영 CI/Production·페이지·다운로드·PNG 응답 확인은 별도 기록한다.

로컬 Nodev24.19.0 npm test23개/실패·skip0, coverage lines92.69%/branches86.14%/functions100.00%를 확인했다. 의존성 설치 없이 기존 Node를 사용했다. PR/main CI와 Production 검증은 앱 게시 근거에 기록한다.
