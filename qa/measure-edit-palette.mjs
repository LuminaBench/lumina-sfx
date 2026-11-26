// Measure the actual balanced masters used by picture scoring. Run after changing one of these takes.
import { writeFile } from 'node:fs/promises';
import { renderChannels, SAMPLE_RATE } from '../engine/render.ts';
import { defaultPalette } from '../scripts/edit-score.mjs';
const ids = new Set([
  ...defaultPalette,
  'stylus-tip-on-tablet-glass',
  'fingertip-on-display-glass',
  'menu-confirm-pluck',
  'quiet-mouse-press',
  'menu-confirm-spring-detent',
  'settings-focus-felt-tick',
  'settings-slider-knurled-index',
  'stylus-barrel-press',
  'trackball-press',
  'laptop-scissor-keyboard-shortcut',
  'gasket-mount-keyboard-shortcut',
  'velvet-swipe-left',
  'velvet-swipe-right',
  'linen-match-cut',
  'delicate-logo-close',
]);
const results = {};
for (const id of [...ids].sort()) {
  const { default: recipe } = await import('../recipes/' + id + '.ts');
  const takes = [];
  for (const seed of [11, 37, 89]) {
    const channels = renderChannels(recipe, { seed, level: 'balanced' });
    const window = Math.round(0.035 * SAMPLE_RATE);
    const energy = new Float64Array(channels[0].length);
    let total = 0,
      high = 0,
      peak = 0,
      rolling = 0,
      strongest = 0;
    for (const pcm of channels) {
      let low = 0;
      const alpha = 1 - Math.exp((-2 * Math.PI * 3000) / SAMPLE_RATE);
      for (let i = 0; i < pcm.length; i++) {
        const x = pcm[i];
        low += alpha * (x - low);
        high += (x - low) ** 2 / channels.length;
        energy[i] += (x * x) / channels.length;
        peak = Math.max(peak, Math.abs(x));
      }
    }
    for (let i = 0; i < energy.length; i++) {
      total += energy[i];
      rolling += energy[i] - (energy[i - window] ?? 0);
      strongest = Math.max(strongest, rolling);
    }
    let sum = 0,
      last = 0;
    while (last < energy.length && sum < total * 0.95) sum += energy[last++];
    takes.push([
      20 * Math.log10(peak),
      10 * Math.log10(strongest / window),
      (last / SAMPLE_RATE) * 1000,
      high / total,
    ]);
  }
  const med = (i, n) =>
    Number(
      takes
        .map((t) => t[i])
        .sort((a, b) => a - b)[1]
        .toFixed(n),
    );
  results[id] = { peakDb: med(0, 2), activeDb: med(1, 2), tailMs: med(2, 1), bright: med(3, 4) };
}
await writeFile(
  new URL('../references/edits/palette-acoustics.json', import.meta.url),
  JSON.stringify(results, null, 2) + '\n',
);
