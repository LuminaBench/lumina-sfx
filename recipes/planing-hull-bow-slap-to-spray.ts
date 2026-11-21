import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-snapwater.ts';
import source2 from './_recordings/motion-jet-water-retreat.ts';

export default {
  id: "planing-hull-bow-slap-to-spray",
  name: "Planing hull bow slap to spray",
  category: "Water & Fire",
  tags: ["planing", "hull", "bow", "slap", "spray", "boat", "marine"],
  loopable: false,
  durationSec: 2.8,
  targetRmsDbfs: -25.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .97, .67, .049, 7100, .004, .20],
      ['clip', source2, .27, 2.53, .26, 1.14, 3900, .24, .39],
      ["brush", "water", 0, .89, .69, 390, .006],
      ["brush", "air", .40, 2.3, .28, 2740, .12],
      ["grains", "water", .07, .68, .42, 670, 11],
    ]);
  },
} satisfies SoundRecipe;
