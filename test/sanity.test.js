'use strict';

// Supply chain sanity checks. Run with `node --test`.

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { existsSync, readFileSync } = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (file) => readFileSync(path.join(root, file), 'utf8');
const pkg = JSON.parse(read('package.json'));

test('.npmrc disables install scripts and enforces a minimum release age', () => {
  const npmrc = read('.npmrc');
  assert.match(npmrc, /^ignore-scripts=true$/m);
  assert.match(npmrc, /^min-release-age=([3-9]|\d{2,})$/m);
});

test('every dependency is pinned to an exact version', () => {
  const ranges = Object.entries({ ...pkg.dependencies, ...pkg.devDependencies })
    .filter(([, version]) => !/^\d+\.\d+\.\d+(-[\w.]+)?$/.test(version));
  assert.deepEqual(ranges, []);
});

test('has a lockfile', () => {
  assert.ok(existsSync(path.join(root, 'package-lock.json')));
});

test('dependabot cooldowns are configured (3 days, 7 for major)', () => {
  const dependabot = read('.github/dependabot.yml');
  assert.match(dependabot, /default-days: 3/);
  assert.match(dependabot, /semver-major-days: 7/);
});

test('package name is kebab-case with the dsplay- prefix', () => {
  assert.match(pkg.name, /^dsplay-[a-z0-9-]+$/);
});
