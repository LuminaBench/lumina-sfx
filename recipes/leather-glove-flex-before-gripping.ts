import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/leather-strap-flex.ts';
import source2 from './_recordings/jacket-movement-rustle.ts';

export default {
  id: "leather-glove-flex-before-gripping",
  name: "Leather Glove Flex before Gripping",
  category: "Footsteps & UI",
  tags: ["leather", "glove", "flex", "before", "gripping"],
  loopable: false,
  durationSec: 0.7,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .58, .81, .045, 6400],
      ['clip', source2, .06, .51, .39, .044, 4500],
      ["brush", "rubber", .21, .39, .21, 546, .037],
    ]);
  },
} satisfies SoundRecipe;
