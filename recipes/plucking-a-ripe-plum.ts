import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/snap-green-stalk.ts';
import source2 from './_recordings/apple-falls-in-orchard.ts';

export default {
  id: "plucking-a-ripe-plum",
  name: "Plucking a Ripe Plum",
  category: "Farming",
  tags: ["plucking", "ripe", "plum", "farm", "wakefall"],
  loopable: false,
  durationSec: 0.49,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .16, .65, .025, 10300],
      ['clip', source2, .11, .16, .27, .035, 2300],
      ["contact", "cloth", .137, .17, .23, 490, .006],
    ]);
  },
} satisfies SoundRecipe;
