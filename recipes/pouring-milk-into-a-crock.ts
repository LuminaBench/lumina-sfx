import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-milk-pour.ts';
import source2 from './_recordings/ceramic-mug-set-down.ts';

export default {
  id: "pouring-milk-into-a-crock",
  name: "Pouring Milk into a Crock",
  category: "Props & Interactions",
  tags: ["pouring", "milk", "crock"],
  loopable: false,
  durationSec: 1.3,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.18, .87, .015, 7820],
      ['clip', source2, .025, .22, .19, .036, 6300],
      ["contact", "glass", .74, .24, .13, 315, .003],
    ]);
  },
} satisfies SoundRecipe;
