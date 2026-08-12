![DSPLAY - Digital Signage](https://developers.dsplay.tv/assets/images/dsplay-logo.png)

# DSPLAY - Chamador Loterias Caixa

A Vanilla JavaScript [HTML-based template](https://developers.dsplay.tv/docs/html-templates) for the [DSPLAY - Digital Signage](https://dsplay.tv/) platform — displays a "now calling" queue/ticket number for Caixa Econômica Federal lottery terminals, with a bell sound on load.

![Screenshot](docs/images/screenshot.png)

## Template variables

This template has no configurable Template Vars — the displayed number comes entirely from `dsplay_media.buffer` (the queue number provided by the terminal integration), not from CMS-registered variables.

## Local development

```sh
npm install
python3 -m http.server
```

then visit `http://localhost:8000`.

`scripts/dsplay-data.js` defines `dsplay_config`/`dsplay_media`/`dsplay_template` mock globals used only when the template isn't running inside the actual DSPLAY app. Edit `dsplay_media.buffer` to try out different queue numbers — the DSPLAY Player App replaces it with the real value at runtime.

## Generating the template package

```sh
./pack.sh
```

This first runs [`dsplay-scan-template`](https://www.npmjs.com/package/@dsplay/template-manifest) (from `@dsplay/template-manifest`), which statically scans `scripts/app.js` and captures `dsplay-data.js` as example data — writing `template-variables.json` + `template-example-data.json` to the project root (both are near-empty here, see above). It then zips `index.html`, `assets/`, `scripts/`, `styles/`, and the two generated JSON files into `template.zip`.

## Deploying

Upload the resulting `template.zip` to the [DSPLAY Web Manager](https://manager.dsplay.tv/template/create).

## Updating vendored dependencies

See [AGENTS.md](AGENTS.md).

## More

To see more about DSPLAY HTML Templates, visit: https://developers.dsplay.tv/docs/html-templates
