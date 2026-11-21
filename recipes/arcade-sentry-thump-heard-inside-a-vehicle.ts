import { mix } from '../engine/dsp.ts';
import { arenaReport } from './_shared/arena-reports.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "arcade-sentry-thump-heard-inside-a-vehicle",
  name: "Arcade sentry thump heard inside a vehicle",
  category: "Weapons",
  tags: ["arcade", "sentry", "thump", "heard", "inside", "vehicle", "gunshot", "weapon", "fictional"],
  loopable: false,
  durationSec: 0.9,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  render(ctx, { params, seed }) {
    const bed = arenaReport(ctx, {
      span: .020, body: 89, crack: 7500, edge: .49, action: .04, space: "behind",
      hits: [0],
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["contact", "glass", .071, .18, .15, 293, .003],
      ["contact", "iron", .17, .16, .22, 210, .005],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
