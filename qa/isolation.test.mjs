import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { checkIsolatedRecipes } from '../scripts/install-files.mjs';
import { loadDesign } from '../scripts/remix-design.mjs';
import { renderSound } from '../engine/render.ts';
import { spectrum } from './metrics.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
execFileSync(
  process.execPath,
  [
    '--disable-warning=ExperimentalWarning',
    '--experimental-strip-types',
    'scripts/build-isolated-sources.mjs',
    '--check',
  ],
  { cwd: root },
);
const { sounds } = JSON.parse(await readFile(new URL('../catalog.json', import.meta.url)));
const isolated = sounds.filter((r) => r.isolation === 'isolated');
await checkIsolatedRecipes(isolated);
for (const name of ['dive-beneath-the-boat', 'dogfight-cockpit', 'dogfight-exterior']) {
  const { recipe, selected } = await loadDesign(
    fileURLToPath(new URL('../references/scenes/' + name + '.json', import.meta.url)),
  );
  await checkIsolatedRecipes(selected);
  assert.equal(recipe.isolation, 'isolated');
}
const unreviewed = sounds.find((r) => r.id === 'car-wet-asphalt-pass');
await assert.rejects(checkIsolatedRecipes([unreviewed]), /Unreviewed/);
await assert.rejects(checkIsolatedRecipes([{ ...unreviewed, isolation: 'isolated' }]), /Unreviewed recording/);
async function energy(id) {
  const { default: r } = await import('../recipes/' + id + '.ts');
  return spectrum(renderSound(r), 44100).high;
}
const exterior = await energy('interceptor-turbofan-augmented-exhaust-roar-loop');
const canopy = await energy('interceptor-turbofan-canopy-interior-cruise-loop');
assert.ok(exterior > canopy * 2, 'Canopy should soften high frequency exhaust');
console.log(
  JSON.stringify({
    pass: true,
    isolated: isolated.length,
    exteriorHighShare: exterior,
    canopyHighShare: canopy,
  }),
);
