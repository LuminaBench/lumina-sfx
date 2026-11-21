import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-forklift-load.ts';

export default {
  id: "forklift-lift-under-a-pallet",
  name: "Forklift lift under a pallet",
  category: "Vehicles & Engines",
  tags: ["forklift", "lift", "under", "pallet", "vehicle"],
  loopable: false,
  durationSec: 3.6,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 3.6, 1, .04, 6700, .003, .21],
      ["contact", "iron", 0, .054, .13, 502, .001],
    ]);
  },
} satisfies SoundRecipe;
