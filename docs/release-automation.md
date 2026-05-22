# Release APK Dashboard Automation

Android app repositories should update this dashboard after uploading a signed release APK to GitHub Releases.

## Required Secret

Add this secret to each Android app repository:

- `DASHBOARD_UPDATE_TOKEN`: fine-grained GitHub token with `contents: read/write` access to `wjdals988/mydashboard`

Do not store keystore files, passwords, or GitHub tokens in the repository.

## Dashboard Update Command

After the app workflow creates a GitHub Release and uploads the APK asset, checkout `wjdals988/mydashboard` and run:

```bash
npm run update:apk -- \
  --slug gifticon-doctor \
  --url "https://github.com/wjdals988/giftcondoctor/releases/download/v0.1.12/giftcondoctor-0.1.12-13-release-signed.apk" \
  --fileName "giftcondoctor-0.1.12-13-release-signed.apk" \
  --version "0.1.12" \
  --versionCode "13" \
  --size "59,568,911 bytes" \
  --sha256 "b11a3f1fac10251ec7c0bd0765edb86275e46dbe273d274f4f99815d288a31a6" \
  --releaseUrl "https://github.com/wjdals988/giftcondoctor/releases/tag/v0.1.12"
```

Then commit and push `src/lib/projects.json`. Vercel deploys automatically from `main`.

## Project Slugs

- `location-widget`: 위치공유 앱 위젯
- `gifticon-doctor`: 기프티콘닥터

## GitHub Actions Shape

Use this pattern inside each Android app repository after the release APK is uploaded:

```yaml
- name: Checkout dashboard
  uses: actions/checkout@v4
  with:
    repository: wjdals988/mydashboard
    token: ${{ secrets.DASHBOARD_UPDATE_TOKEN }}
    path: dashboard

- name: Update dashboard APK metadata
  working-directory: dashboard
  run: |
    npm run update:apk -- \
      --slug "$PROJECT_SLUG" \
      --url "$APK_DOWNLOAD_URL" \
      --fileName "$APK_FILE_NAME" \
      --version "$VERSION_NAME" \
      --versionCode "$VERSION_CODE" \
      --size "$APK_SIZE_BYTES bytes" \
      --sha256 "$APK_SHA256" \
      --releaseUrl "$RELEASE_URL"

- name: Commit dashboard update
  working-directory: dashboard
  run: |
    git config user.name "github-actions[bot]"
    git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
    git add src/lib/projects.json
    git diff --cached --quiet || git commit -m "Update $PROJECT_SLUG APK metadata"
    git push
```
