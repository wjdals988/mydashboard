# 런모니0.3.7-dev 전체 UI·러닝 알림 — 2026.11.07

최종 공개 APK·서명 CI·HEAD·Android 원문·실제 host/시각 검토 뒤 공식 updater의 dry run과 반영을 진행했다.

- [개발 릴리스](https://github.com/wjdals988/runmoni/releases/tag/v0.3.7-dev) · [구현 PR](https://github.com/wjdals988/runmoni/pull/35) · [서명 CI](https://github.com/wjdals988/runmoni/actions/runs/42293094340).
- 219246942bytes/SHA256 `a864ed8cb0df6444a8074368a21892a8b6f46e97e1432ba2936360f3b0525a53`. 실제 APK 출처 `aa9f4e21983899d0d3d90a73ac41dc02f8662632`를 후속 문서 커밋으로 바꾸지 않는다.
- Android63회(기본56+세로 native 기준4+검사 기대 수정 후1+가로 native2)를 동일 앱 APK와 test APK3/4의 명시적 검사 수정 계보로 대조했다. 기본56회는 한 시도에서 통과했고 세로5회는 성공4회와 수정 후1회의 합계다. 실패한 native1개는 포함하지 않았다. 로컬 JVM115회는 build3의 실제 새 실행을 유지하며 build4의 새 실행으로 세지 않는다. 서명CI의 새 JVM과 실제 host2 BG시나리오·전체 UI 조건은 별도 근거다. [최종 host 근거](https://github.com/wjdals988/runmoni/blob/aa9f4e21983899d0d3d90a73ac41dc02f8662632/docs/app-review/2026-11-06-ui-ux-pro-max/host-review8.json).
- 환경 복원은 기록된 allowlist의 설정·권한·전원 상태 범위이며 Android 전체 전역 상태의 완전 동일성을 뜻하지 않는다. 앱 설정 XML/프로필 복원은 별도 확인했다.
- 갤러리는 실제 Main3장/SystemUI1장이다. TEST debug·API29/TCG·합성 GPS이며 휴대폰·야외 GPS·API31+·Google·운영 쓰기·Doze/OEM·새 다크 테마·사용자 시각 승인을 증명하지 않는다.
- 기존11내역/4PNG·다른8프로젝트·순서/sourceUrl을 보존했다. 운영 CI/Production·페이지·다운로드·PNG 응답 확인은 별도 기록한다.

홈/옷장 사진은 host-review6에서 촬영하고 원본 SHA를 유지해 재사용했으며 러닝/알림은 host-review8의 새 실제 촬영이다. UI13/활성2를 최종 host에서 새로 찍었다고 표시하지 않는다.

로컬 Node24.19.0의 `npm test`23개가 모두 통과했다(실패/skip0). 커버리지 lines92.69%/branches86.14%/functions100%를 확인했다. 의존성 설치·로컬 Next 빌드는 실행하지 않았으며 서버 CI/배포 검증과 구분한다.
