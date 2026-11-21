import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/shovel-dry-earth.ts';
import source2 from './_recordings/loose-gravel-landing.ts';
import source3 from './_recordings/plant-large-seeds.ts';

export default {
  id: "milling-grain-by-hand",
  name: "Milling Grain by Hand",
  category: "Props & Interactions",
  tags: ["milling", "grain", "hand"],
  loopable: false,
  durationSec: 2.04,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .72, .65, .15, 6200],
      ['clip', source2, .11, .42, .17, .016, 4500],
      ["brush", "stone", 0, 2.00, .52, 450, .09],
      ["brush", "stone", .49, 1.28, .44, 725, .12],
      ['clip', source3, .55, .48, .4, .02, 5700],
      ["brush", "wood", 1.14, .71, .38, 380, .034],
    ]);
  },
} satisfies SoundRecipe;
