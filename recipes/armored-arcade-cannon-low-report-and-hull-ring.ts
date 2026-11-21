import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/atlas-firecracker.ts';
import foley1 from './_recordings/atlas-scrap.ts';
import { mix } from '../engine/dsp.ts';
import { arenaReport } from './_shared/arena-reports.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

const original = {
  id: "armored-arcade-cannon-low-report-and-hull-ring",
  name: "Armored arcade cannon low report and hull ring",
  category: "Weapons",
  tags: ["armored", "arcade", "cannon", "low", "report", "hull", "ring", "gunshot", "weapon", "fictional"],
  loopable: false,
  durationSec: 1.5,
  targetRmsDbfs: -20,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  render(ctx, { params, seed }) {
    const bed = arenaReport(ctx, {
      span: .0295, body: 97, crack: 7200, edge: .69, action: .21, space: "field",
      hits: [0],
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["contact", "iron", .014, .33, .69, 96, .003],
      ["contact", "iron", .081, .14, .43, 314, .002],
      ["brush", "air", .075, 1.26, .35, 470, .04],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;

export default withImpactFoley(original, [
  { clip: foley0, at: 0, span: 0.42, gain: 0.63, cutoff: 3500, speed: 0.77 },
  { clip: foley1, at: 0.055, span: 0.62, gain: 0.24, cutoff: 6700, speed: 0.85 },
]);
