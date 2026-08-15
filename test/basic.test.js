'use strict';

// Minimal smoke tests for this bundler-less template - no test runner is
// installed (Vitest et al. assume a bundler this template deliberately
// doesn't have), so these use only Node's built-in node:test/node:assert/
// node:vm. Run with `node --test`.

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { existsSync, readFileSync } = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');

test('index.html only references local files that actually exist', () => {
  const html = readFileSync(path.join(root, 'index.html'), 'utf-8');
  const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
    .map((match) => match[1])
    .filter((ref) => !/^https?:/.test(ref));

  assert.ok(refs.length > 0, 'expected index.html to reference at least one local file');
  for (const ref of refs) {
    assert.ok(existsSync(path.join(root, ref)), `referenced file not found: ${ref}`);
  }
});

test('dsplay-data.js defines dsplay_config/dsplay_media/dsplay_template as objects', () => {
  const code = readFileSync(path.join(root, 'scripts/dsplay-data.js'), 'utf-8');
  const sandbox = {};
  vm.createContext(sandbox);
  new vm.Script(code, { filename: 'dsplay-data.js' }).runInContext(sandbox);

  for (const name of ['dsplay_config', 'dsplay_media', 'dsplay_template']) {
    assert.equal(typeof sandbox[name], 'object', `${name} should be defined as an object`);
    assert.notEqual(sandbox[name], null, `${name} should not be null`);
  }
});

test('app.js has valid JavaScript syntax', () => {
  const code = readFileSync(path.join(root, 'scripts/app.js'), 'utf-8');
  assert.doesNotThrow(() => new vm.Script(code, { filename: 'app.js' }));
});
