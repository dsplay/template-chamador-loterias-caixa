# AGENTS.md

Guidance for AI agents (and humans) working in this repository.

## What this project is

The DSPLAY **Chamador Loterias Caixa** template — a Vanilla JavaScript [HTML-based template](https://developers.dsplay.tv/docs/html-templates) for the [DSPLAY - Digital Signage](https://dsplay.tv/) platform, displaying a queue/ticket "now calling" number for Caixa Econômica Federal lottery terminals. There is no build step and no bundler — every script is a plain `<script>` tag loaded directly by the browser. There *is* a minimal `package.json`, but only for packaging-time tooling (see "Packing / deployment" below) — it plays no part in how the template itself runs.

On-screen text (`CAIXA LIVRE`) is Brazilian Portuguese by design — this is a Brazil-only audience template, not a translation gap.

## Directory structure

```
index.html                          <-- must stay at the project root
scripts/
  app.js                            <-- reads the queue number from dsplay_media.buffer
  core-js-<version>.js              <-- vendored core-js polyfill bundle
  dsplay-data.js                    <-- mock DSPLAY data for local development
  dsplay-template-utils.js          <-- vendored @dsplay/template-utils bundle
styles/
  main.css
assets/
  audio/bell-01.mp3                <-- plays once on load
  fonts/FuturaExtraBlackCondensedBT.ttf
  image/                            <-- background image + favicon
  video/                            <-- currently empty
pack.sh                             <-- generates the manifest and zips the template for upload to DSPLAY Web Manager
update-deps.sh                      <-- updates vendored dependencies (boilerplate maintainers only, see below)
package.json                        <-- packaging-time devDependency only (@dsplay/template-manifest), not a build step
scripts/.vendored-versions.json     <-- tracks the currently-vendored version of each dep for update-deps.sh
```

## Runtime model

- `scripts/dsplay-data.js` defines `dsplay_config`, `dsplay_media`, and `dsplay_template` globals used only in **development**. Its contents are ignored at runtime on the actual DSPLAY device/app.
- `scripts/dsplay-template-utils.js` (the `@dsplay/template-utils` UMD bundle) exposes `window.dsplayTemplateUtils` with `media`, `config`, `template`, `DSPLAY`, and the `tval`/`tbval`/`tival`/`tfval`/`isVertical` helpers.
- `scripts/app.js` reads `dsplayTemplateUtils.media.buffer` (a string, e.g. `"42"`), strips any non-digit characters, zero-pads a single-digit result, and writes it into `#numero`'s `textContent`. This template has **no `dsplay_template` variables at all** — confirmed against the CMS's actual registration (see below) — it's driven entirely by `media.buffer`.
- `scripts/core-js-<version>.js` is a vendored polyfill bundle for older WebViews used by DSPLAY devices.

Script load order in `index.html` matters: `core-js` → `dsplay-data.js` → `dsplay-template-utils.js` → `app.js`.

## History

This template originally used AngularJS 1.x (`scripts/angular.min.js`, `ng-app`/`ng-controller`/`{{text}}` binding) for a single-controller app that just wrote one string into the DOM — no real framework benefit was being used. AngularJS reached end-of-life in December 2021, so it was removed entirely in favor of plain JS (`document.getElementById('numero').textContent = result`), matching the "vanilla, no library" convention of this template family.

## Package identity

`package.json`'s `"name"` must identify this template, not a boilerplate it was cloned from — this template's is `dsplay-template-chamador-loterias-caixa`. See `template-boilerplate-javascript`'s AGENTS.md for the full convention.

## README structure

Every DSPLAY template's `README.md` follows the same skeleton (see `template-boilerplate-javascript`'s AGENTS.md for the full reference copy):

1. Logo badge + `# DSPLAY - <Name>` + a one/two-sentence description.
2. *(optional)* **Features**. 3. *(optional)* **Supported screen formats**.
4. **Template variables** — a `Key | Type | Description` table, ending with the CMS-registration reminder. This template has none — say so explicitly rather than an empty table.
5. **Local development**, 6. *(optional)* **For developers**, 7. **Generating the template package** / **Deploying** / **Updating vendored dependencies** (-> AGENTS.md) / **More**.

## Dependency management (boilerplate maintainers only)

The *template's own* runtime code has no `npm install` step — third-party code it uses (`core-js`, `dsplay-template-utils.js`) is vendored directly into `scripts/` as pre-built bundles fetched from a CDN, not installed via npm. `npm install` in this repo only installs `@dsplay/template-manifest`, the packaging-time devDependency used by `pack.sh`.

Run `./update-deps.sh` to update the vendored bundles. For each dependency it fetches the latest published version from the npm registry, compares it against `scripts/.vendored-versions.json`, and:
- if it's a **major** version bump, skips it and prints a warning — needs a human to review the changelog first. Never bypass this guard as an agent; surface the warning to the user instead.
- otherwise, downloads the new bundle and updates `scripts/.vendored-versions.json` (and the `<script src="...">` reference in `index.html` if the filename changed).

After running it, sanity check by serving the project locally and confirming the page loads with no console errors and the mock queue number from `dsplay-data.js` renders, then commit.

## Packing / deployment

Run `npm install` once, then `./pack.sh`. It first runs `dsplay-scan-template`, which statically scans `scripts/app.js` and captures `dsplay-data.js` as example data — writing `template-variables.json` + `template-example-data.json` to the project root (both will be empty/near-empty here, since this template has no `dsplay_template` variables). It then zips `index.html`, `assets/`, `scripts/`, `styles/`, and those two generated files into `template.zip`, ready to upload to the [DSPLAY Web Manager](https://manager.dsplay.tv/template/create).

`template.zip`, `node_modules/`, and the two generated JSON files are gitignored and should never be committed — `pack.sh` regenerates them every run.

## Commit messages

Every commit title must start with an emoji, followed by a short, imperative summary — e.g. `⬆️ update core-js to 3.50.0`.

- The human maintainer uses [gitmoji-cli](https://github.com/carloscuesta/gitmoji-cli) for manual commits, so gitmoji conventions (`✨` feature, `🐛` fix, `⬆️` upgrade deps, `♻️` refactor, `📝` docs, `🎨` structure/format, `🔥` remove code) are a good default.
- Agents are not required to stick to the official gitmoji list — pick whichever emoji best represents the actual change in that commit, as long as it's placed at the start of the title.
