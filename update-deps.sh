#!/usr/bin/env bash
set -e

# Updates the vendored bundles in scripts/ (core-js, @dsplay/template-utils) to their latest
# published version, skipping (and warning about) major version bumps, which may contain
# breaking changes and need a human to review before applying.
#
# Tracks the currently-vendored version of each dependency in scripts/.vendored-versions.json,
# since dsplay-template-utils.js keeps a constant filename (no version in it to read back).

cd "$(dirname "$0")"

VERSIONS_FILE="scripts/.vendored-versions.json"
[ -f "$VERSIONS_FILE" ] || echo '{}' > "$VERSIONS_FILE"

latest_version() {
  curl -sL "https://registry.npmjs.org/$1/latest" | node -e '
    process.stdout.write(JSON.parse(require("fs").readFileSync(0, "utf8")).version)
  '
}

current_version() {
  node -e "
    const data = JSON.parse(require('fs').readFileSync('$VERSIONS_FILE', 'utf8'));
    process.stdout.write(data['$1'] || '');
  "
}

set_version() {
  node -e "
    const fs = require('fs');
    const data = JSON.parse(fs.readFileSync('$VERSIONS_FILE', 'utf8'));
    data['$1'] = '$2';
    fs.writeFileSync('$VERSIONS_FILE', JSON.stringify(data, null, 2) + '\n');
  "
}

major() { echo "$1" | cut -d. -f1; }

# update_core_js: versioned filename (core-js-<version>.js), referenced in index.html
update_core_js() {
  local pkg="core-js-bundle"
  local current latest
  current=$(current_version "$pkg")
  latest=$(latest_version "$pkg")

  if [ "$current" = "$latest" ]; then
    echo "core-js-bundle is up to date ($current)"
    return
  fi

  if [ -n "$current" ] && [ "$(major "$current")" != "$(major "$latest")" ]; then
    echo "core-js-bundle has a new MAJOR version available: $current -> $latest"
    echo "  Skipping - this may include breaking changes. Review https://github.com/zloirock/core-js/releases"
    echo "  and update manually (see README.md) if you want it."
    return
  fi

  echo "Updating core-js-bundle: ${current:-none} -> $latest"
  curl -sL "https://unpkg.com/core-js-bundle@$latest/minified.js" -o "scripts/core-js-$latest.js"
  [ -n "$current" ] && [ -f "scripts/core-js-$current.js" ] && rm "scripts/core-js-$current.js"
  sed -i.bak -E "s#scripts/core-js-[0-9.]+\.js#scripts/core-js-$latest.js#" index.html && rm index.html.bak
  set_version "$pkg" "$latest"
}

# update_template_utils: constant filename, version only tracked in $VERSIONS_FILE
update_template_utils() {
  local pkg="@dsplay/template-utils"
  local current latest
  current=$(current_version "$pkg")
  latest=$(latest_version "$pkg")

  if [ "$current" = "$latest" ]; then
    echo "@dsplay/template-utils is up to date ($current)"
    return
  fi

  if [ -n "$current" ] && [ "$(major "$current")" != "$(major "$latest")" ]; then
    echo "@dsplay/template-utils has a new MAJOR version available: $current -> $latest"
    echo "  Skipping - this may include breaking changes. Review https://github.com/dsplay/template-utils/releases"
    echo "  and update manually (see README.md) if you want it."
    return
  fi

  echo "Updating @dsplay/template-utils: ${current:-none} -> $latest"
  curl -sL "https://unpkg.com/@dsplay/template-utils@$latest/dist/dsplay-template-utils.js" -o scripts/dsplay-template-utils.js
  set_version "$pkg" "$latest"
}

update_core_js
update_template_utils

echo
echo "Done. Review the changes (git diff), test locally (see README.md), then commit."
