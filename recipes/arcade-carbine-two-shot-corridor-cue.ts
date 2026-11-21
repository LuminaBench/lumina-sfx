import { mix } from '../engine/dsp.ts';
import { arenaReport } from './_shared/arena-reports.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "arcade-carbine-two-shot-corridor-cue",
  name: "Arcade carbine two-shot corridor cue",
  category: "Weapons",
  tags: ["arcade", "carbine", "two", "shot", "corridor", "cue", "gunshot", "weapon", "fictional"],
  loopable: false,
  durationSec: 0.77,
  targetRmsDbfs: -21.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  render(ctx, { params, seed }) {
    const bed = arenaReport(ctx, {
      span: .0055, body: 169, crack: 10500, edge: .87, action: .24, space: "hall",
      hits: [0, .117],
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["contact", "iron", .157, .065, .13, 1200, .001],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
