import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/clarity-pistol.ts';
import foley1 from './_recordings/atlas-stone.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

const original = {
  id: "arcade-training-round-chips-brick",
  name: "Arcade training round chips brick",
  category: "Weapons",
  tags: ["arcade", "training", "round", "chips", "brick"],
  loopable: false,
  durationSec: 0.77,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "stone", 0, .101, .83, 644, .0005],
      ["contact", "iron", 0, .046, .35, 1440, .0006],
      ["grains", "stone", .029, .62, .61, 1090, 13],
      ["contact", "stone", .44, .12, .19, 565, .0008],
    ]);
  },
} satisfies SoundRecipe;

export default withImpactFoley(original, [
  { clip: foley0, at: 0, span: 0.19, gain: 0.65, cutoff: 11300, speed: 1.01 },
  { clip: foley1, at: 0.067, span: 0.35, gain: 0.54, cutoff: 7100, speed: 0.86 },
]);
