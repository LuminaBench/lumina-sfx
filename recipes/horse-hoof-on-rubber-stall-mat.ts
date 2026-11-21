import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/hardwood-footstep.ts';
import source2 from './_recordings/mud-squelch-footstep.ts';

export default {
  id: "horse-hoof-on-rubber-stall-mat",
  name: "Horse Hoof on Rubber Stall Mat",
  category: "Animals",
  tags: ["horse", "hoof", "rubber", "stall", "mat", "livestock"],
  loopable: false,
  durationSec: 0.6,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .41, .60, .003, 4050],
      ["contact", "rubber", .02, .21, .56, 172, .003],
      ['clip', source2, .125, .34, .23, .14, 5100],
    ]);
  },
} satisfies SoundRecipe;
