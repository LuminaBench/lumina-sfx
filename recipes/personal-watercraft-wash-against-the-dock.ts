import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-jet-water-retreat.ts';
import source2 from './_recordings/milestone-snapwater.ts';
import source3 from './_recordings/milestone-smallwater.ts';

export default {
  id: "personal-watercraft-wash-against-the-dock",
  name: "Personal watercraft wash against the dock",
  category: "Water & Fire",
  tags: ["personal", "watercraft", "wash", "against", "dock", "boat", "marine"],
  loopable: false,
  durationSec: 2.5,
  targetRmsDbfs: -31,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.5, .32, 4.12, 4200, .003, .25],
      ['clip', source2, 0, 1.14, .52, .05, 8100, .004, .20],
      ['clip', source3, .27, 2.2, .78, .60, 4750, .12, .22],
      ["contact", "water", 0, .12, .33, 438, .003],
    ]);
  },
} satisfies SoundRecipe;
