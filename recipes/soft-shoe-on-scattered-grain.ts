import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/hardwood-footstep.ts';
import source2 from './_recordings/plant-large-seeds.ts';

export default {
  id: "soft-shoe-on-scattered-grain",
  name: "Soft Shoe on Scattered Grain",
  category: "Footsteps & UI",
  tags: ["soft", "shoe", "scattered", "grain"],
  loopable: false,
  durationSec: 0.63,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .48, .51, .052, 4500],
      ['clip', source2, .057, .42, .60, .055, 8700],
      ["grains", "plant", .095, .41, .21, 2150, 19],
    ]);
  },
} satisfies SoundRecipe;
