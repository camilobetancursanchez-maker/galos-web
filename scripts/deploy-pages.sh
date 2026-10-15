#!/bin/bash
# Publishes the site on GitHub Pages: https://camilobetancursanchez-maker.github.io/galos-web/
# English at /, Spanish at /es. GitHub Pages only serves files, so src/proxy.ts is set aside
# for the build and the /en pages are copied to the root (what the proxy does on a server).
set -euo pipefail
cd "$(dirname "$0")/.."
REPO=https://github.com/camilobetancursanchez-maker/galos-web.git

mv src/proxy.ts /tmp/galos-proxy.ts
ROOT=$PWD
trap 'mv /tmp/galos-proxy.ts "$ROOT/src/proxy.ts"' EXIT
rm -rf out
GITHUB_PAGES=true NEXT_PUBLIC_BASE_PATH=/galos-web \
  NEXT_PUBLIC_SITE_URL=https://camilobetancursanchez-maker.github.io/galos-web npx next build

cp -R out/en/. out/
rm -rf out/en
touch out/.nojekyll

cd out
git init -q -b gh-pages
git add -A
git commit -q -m "Deploy $(date '+%Y-%m-%d %H:%M')"
git -c credential.helper= -c credential.helper='!gh auth git-credential' push -q -f "$REPO" gh-pages
echo "Published: https://camilobetancursanchez-maker.github.io/galos-web/"
