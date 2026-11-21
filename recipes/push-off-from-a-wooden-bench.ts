import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/jacket-movement-rustle.ts';
import source2 from './_recordings/barn-timber-creak.ts';

export default {
  id: "push-off-from-a-wooden-bench",
  name: "Push Off from a Wooden Bench",
  category: "Footsteps & UI",
  tags: ["push", "wooden", "bench"],
  loopable: false,
  durationSec: 0.79,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .57, .65, .061, 6000],
      ['clip', source2, .092, .58, .58, .11, 3200],
      ["brush", "cloth", .262, .41, .32, 434, .08],
    ]);
  },
} satisfies SoundRecipe;
