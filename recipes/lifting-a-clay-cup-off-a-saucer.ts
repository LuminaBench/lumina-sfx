import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-glass-lid.ts';
import source2 from './_recordings/ceramic-mug-set-down.ts';

export default {
  id: "lifting-a-clay-cup-off-a-saucer",
  name: "Lifting a Clay Cup off a Saucer",
  category: "Props & Interactions",
  tags: ["lifting", "clay", "cup", "saucer"],
  loopable: false,
  durationSec: 0.61,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .42, .71, 0, 9700],
      ['clip', source2, .11, .35, .49, .012, 12800],
      ["contact", "glass", .21, .16, .20, 840, .0031],
    ]);
  },
} satisfies SoundRecipe;
