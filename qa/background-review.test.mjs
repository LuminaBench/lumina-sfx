import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const json = async path => JSON.parse(await readFile(new URL(path, import.meta.url)));
const audit = await json('./background-review.json');
const { masters } = await json('./release-masters.json');
const {holds} = await json('./source-holds.json');
const {revisions} = await json('./master-revisions.json');
const entries = [...audit.sounds, ...audit.relatedRepairs];
assert.equal(audit.scope.flaggedRecipes, audit.sounds.length);
assert.equal(new Set(entries.map(entry => entry.id)).size, entries.length);
for (const entry of entries) {
  assert.ok(masters[entry.id], entry.id);
  if (entry.supersededReason) assert.notEqual(entry.masterSha256, masters[entry.id], entry.id);
  else assert.equal(entry.masterSha256, masters[entry.id], entry.id);
  assert.match(entry.variantsSha256, /^[0-9a-f]{64}$/);
}

execFileSync(process.execPath, ['--experimental-strip-types', '--disable-warning=ExperimentalWarning',
  'scripts/build-reviewed-takes.mjs', '--check'], { cwd: root });
const matches = JSON.parse(execFileSync(process.execPath,
  ['scripts/search.mjs', '--background-checked', '--json'], { cwd: root }));
assert.deepEqual(matches.map(sound => sound.id).sort(), entries.filter(entry => !entry.auditionNote && !entry.supersededReason && !holds[entry.id] && !revisions[entry.id]).map(entry => entry.id).sort());
assert.ok(matches.every(sound => sound.backgroundChecked === true));
console.log('Verified review IDs, master checksums, repair reproducibility and catalog search for ' + entries.length + ' cues.');
