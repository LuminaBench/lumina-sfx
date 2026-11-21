import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/trowel-soft-soil.ts';
import source2 from './_recordings/shovel-dry-earth.ts';

export default {
  id: "leather-boot-over-compacted-loam",
  name: "Leather Boot over Compacted Loam",
  category: "Footsteps & UI",
  tags: ["leather", "boot", "compacted", "loam"],
  loopable: false,
  durationSec: 0.59,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .39, .64, .097, 6200],
      ["contact", "rubber", .01, .24, .52, 215, .003],
      ['clip', source2, .10, .40, .29, .138, 5600],
    ]);
  },
} satisfies SoundRecipe;
