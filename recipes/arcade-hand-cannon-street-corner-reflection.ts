import { mix } from '../engine/dsp.ts';
import { arenaReport } from './_shared/arena-reports.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "arcade-hand-cannon-street-corner-reflection",
  name: "Arcade hand cannon street corner reflection",
  category: "Weapons",
  tags: ["arcade", "hand", "cannon", "street", "corner", "reflection", "gunshot", "weapon", "fictional"],
  loopable: false,
  durationSec: 0.92,
  targetRmsDbfs: -20.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  render(ctx, { params, seed }) {
    const bed = arenaReport(ctx, {
      span: .0138, body: 113, crack: 7300, edge: .67, action: .25, space: "alley",
      hits: [0],
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["contact", "iron", .043, .086, .18, 708, .001],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
