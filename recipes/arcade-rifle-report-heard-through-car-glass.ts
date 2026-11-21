import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/clarity-rifle.ts';
import foley1 from './_recordings/atlas-scrap.ts';
import { mix } from '../engine/dsp.ts';
import { arenaReport } from './_shared/arena-reports.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

const original = {
  id: "arcade-rifle-report-heard-through-car-glass",
  name: "Arcade rifle report heard through car glass",
  category: "Weapons",
  tags: ["arcade", "rifle", "report", "heard", "car", "glass", "gunshot", "weapon", "fictional"],
  loopable: false,
  durationSec: 0.72,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  render(ctx, { params, seed }) {
    const bed = arenaReport(ctx, {
      span: .011, body: 112, crack: 8020, edge: .64, action: .08, space: "behind",
      hits: [0],
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["contact", "glass", .03, .19, .42, 266, .003],
      ["contact", "iron", .091, .18, .30, 289, .004],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;

export default withImpactFoley(original, [
  { clip: foley0, at: 0, span: 0.31, gain: 1.16, cutoff: 1850, speed: 0.98 },
  { clip: foley1, at: 0.014, span: 0.14, gain: 0.18, cutoff: 2500, speed: 0.85 },
]);
