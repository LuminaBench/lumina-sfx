import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/clarity-pistol.ts';
import { mix } from '../engine/dsp.ts';
import { arenaReport } from './_shared/arena-reports.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

const original = {
  id: "compact-arcade-pistol-dry-snap",
  name: "Compact arcade pistol dry snap",
  category: "Weapons",
  tags: ["compact", "arcade", "pistol", "dry", "snap", "gunshot", "weapon", "fictional"],
  loopable: false,
  durationSec: 0.39,
  targetRmsDbfs: -20,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  render(ctx, { params, seed }) {
    const bed = arenaReport(ctx, {
      span: .0018, body: 213, crack: 12600, edge: .91, action: .34, space: "close",
      hits: [0],
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["contact", "iron", .044, .076, .14, 1030, .001],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;

export default withImpactFoley(original, [
  { clip: foley0, at: 0, span: 0.13, gain: 1.1, cutoff: 12500, speed: 1.01 },
]);
