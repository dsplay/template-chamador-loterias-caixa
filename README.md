![DSPLAY - Digital Signage](https://developers.dsplay.tv/assets/images/dsplay-logo.png)

# DSPLAY - Chamador Loterias Caixa

A Vanilla JavaScript [HTML-based template](https://developers.dsplay.tv/docs/html-templates) for the [DSPLAY - Digital Signage](https://dsplay.tv/) platform — displays a "now calling" queue/ticket number for Caixa Econômica Federal lottery terminals, with a bell sound on load.

## Supported screen formats

| Landscape | Portrait | Square |
|-----------|----------|--------|
| ![Landscape](docs/screenshots/landscape.png) | ![Portrait](docs/screenshots/portrait.png) | ![Square](docs/screenshots/square.png) |

## Template variables

This template has no configurable Template Vars — the displayed number comes entirely from `dsplay_media.buffer` (the queue number provided by the terminal integration), not from CMS-registered variables.

## Local development

```sh
npm install
npm start
```

then visit `http://localhost:3000` (visit the root URL, not `http://localhost:3000/index.html` directly — the reload script is only injected on that path). The page auto-reloads whenever you edit and save a file.

`scripts/dsplay-data.js` defines `dsplay_config`/`dsplay_media`/`dsplay_template` mock globals used only when the template isn't running inside the actual DSPLAY app. Edit `dsplay_media.buffer` to try out different queue numbers — the DSPLAY Player App replaces it with the real value at runtime.

## Generating the template package

```sh
npm run zip
```

This first runs [`dsplay-scan-template`](https://www.npmjs.com/package/@dsplay/template-manifest) (from `@dsplay/template-manifest`), which statically scans `scripts/app.js` and captures `dsplay-data.js` as example data — writing `template-variables.json` + `template-example-data.json` to the project root (both are near-empty here, see above). It then zips `index.html`, `assets/`, `scripts/`, `styles/`, and the two generated JSON files into `template.zip`.

## Deploying

Upload the resulting `template.zip` to the [DSPLAY Web Manager](https://manager.dsplay.tv/template/create).

## Supply chain hardening

**Dependencies must always be pinned to an exact version** (never `^`, `~` or any other range). `.npmrc` sets `save-exact=true`, so `npm install <pkg>@<version>` pins automatically. It also disables dependency install scripts (`ignore-scripts=true`) and only accepts package versions published at least 3 days ago (`min-release-age=3`), to reduce supply chain risk. None of the current npm dependencies need a post-install build step; if one ever does, add a `setup` script to `package.json` (`npm install && npm rebuild <package>`) and document it here.

[Dependabot](.github/dependabot.yml) proposes npm devDependency updates weekly, waiting 3 days after a release (7 days for major versions) before opening a PR. Since versions are pinned, `npm update` does nothing; bump packages explicitly with `npm install <pkg>@<version>`. (Vendored bundles in `scripts/` are not covered by Dependabot — see below.)

## Updating vendored dependencies

See [AGENTS.md](AGENTS.md).

## More

To see more about DSPLAY HTML Templates, visit: https://developers.dsplay.tv/docs/html-templates
