import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/press-potting-soil.ts';
import source2 from './_recordings/trowel-soft-soil.ts';

export default {
  id: "removing-a-seedling-plug",
  name: "Removing a Seedling Plug",
  category: "Farming",
  tags: ["removing", "seedling", "plug", "farm", "wakefall"],
  loopable: false,
  durationSec: 0.63,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .31, .74, 0, 7600],
      ["contact", "rubber", .081, .13, .46, 768, .0024],
      ['clip', source2, .17, .4, .52, .03, 8100],
    ]);
  },
} satisfies SoundRecipe;
