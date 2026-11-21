import { mix } from '../engine/dsp.ts';
import { arenaReport } from './_shared/arena-reports.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
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
