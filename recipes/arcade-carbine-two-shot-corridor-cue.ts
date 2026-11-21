import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/clarity-rifle.ts';
import { mix } from '../engine/dsp.ts';
import { arenaReport } from './_shared/arena-reports.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

const original = {
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

export default withImpactFoley(original, [
  { clip: foley0, at: 0, span: 0.19, gain: 1.16, cutoff: 10800, speed: 0.98 },
  { clip: foley0, at: 0.117, span: 0.22, gain: 0.95, cutoff: 10800, speed: 0.98 },
]);
