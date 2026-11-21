import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/metal-deck-footstep.ts';
import source2 from './_recordings/loose-gravel-landing.ts';
import source3 from './_recordings/spade-turn-loam.ts';

export default {
  id: "step-down-from-a-tractor-cab",
  name: "Step Down from a Tractor Cab",
  category: "Footsteps & UI",
  tags: ["step", "down", "tractor", "cab"],
  loopable: false,
  durationSec: 1.05,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .50, .74, .046, 8800],
      ['clip', source2, .33, .63, .67, .06, 5100],
      ['clip', source3, .40, .56, .38, .02, 6400],
    ]);
  },
} satisfies SoundRecipe;
