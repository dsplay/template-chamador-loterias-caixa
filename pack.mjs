// Generates the manifest and zips the template for upload to the DSPLAY Web Manager. Pure Node
// (fs + archiver + @dsplay/template-manifest's own generateManifest()) on purpose — the previous
// pack.sh needed bash plus the system `zip` CLI, neither of which ships on Windows (not even
// under Git Bash), so `npm run zip` simply didn't work there.
import { createWriteStream, existsSync, rmSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import archiver from 'archiver';
import { generateManifest } from '@dsplay/template-manifest';

// Statically scans scripts/app.js for dsplayTemplateUtils.tval/tbval/tival/tfval calls and
// direct template.* reads, and captures dsplay-data.js as example data — writing
// template-variables.json + template-example-data.json to the project root. The DSPLAY CMS
// reads those two files to auto-detect this template's variables instead of requiring manual
// registration.
generateManifest({ srcDir: 'scripts', dsplayDataPath: 'scripts/dsplay-data.js', outDir: '.' });

const zipPath = resolve('template.zip');
rmSync(zipPath, { force: true });

const INPUT = ['index.html', 'assets', 'scripts', 'styles', 'template-variables.json', 'template-example-data.json'];

const output = createWriteStream(zipPath);
const archive = archiver('zip');

output.on('close', () => console.log('template.zip generated with success!'));
archive.on('warning', (err) => { throw err; });
archive.on('error', (err) => { throw err; });

archive.pipe(output);
for (const entry of INPUT) {
  const full = resolve(entry);
  if (!existsSync(full)) continue;
  // index.html must stay at the zip root, not nested — same requirement the old pack.sh met by
  // listing it alongside the directories rather than archiving the whole project root.
  if (statSync(full).isDirectory()) {
    archive.directory(full, entry);
  } else {
    archive.file(full, { name: entry });
  }
}
await archive.finalize();
