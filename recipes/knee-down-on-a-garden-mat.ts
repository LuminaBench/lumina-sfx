import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/jacket-movement-rustle.ts';
import source2 from './_recordings/press-potting-soil.ts';

export default {
  id: "knee-down-on-a-garden-mat",
  name: "Knee Down on a Garden Mat",
  category: "Footsteps & UI",
  tags: ["knee", "down", "garden", "mat"],
  loopable: false,
  durationSec: 0.66,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .52, .59, .04, 6300],
      ["contact", "rubber", .103, .36, .57, 151, .012],
      ['clip', source2, .164, .33, .14, .03, 5000],
    ]);
  },
} satisfies SoundRecipe;
