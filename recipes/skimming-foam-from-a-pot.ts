import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-milk-pour.ts';
import source2 from './_recordings/field-glass-lid.ts';
import source3 from './_recordings/water-drops-from-spout.ts';

export default {
  id: "skimming-foam-from-a-pot",
  name: "Skimming Foam from a Pot",
  category: "Props & Interactions",
  tags: ["skimming", "foam", "pot"],
  loopable: false,
  durationSec: 0.87,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .44, .47, .40, 4200],
      ['clip', source2, .05, .34, .42, .004, 9800],
      ['clip', source3, .25, .46, .51, .015, 10300],
    ]);
  },
} satisfies SoundRecipe;
