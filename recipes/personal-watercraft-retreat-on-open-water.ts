import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-jet-water-retreat.ts';

export default {
  id: "personal-watercraft-retreat-on-open-water",
  name: "Personal watercraft retreat on open water",
  category: "Water & Fire",
  tags: ["personal", "watercraft", "retreat", "open", "water", "boat", "marine"],
  loopable: false,
  durationSec: 6.1,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 6.1, 1, .15, 6500, .006, .49],
      ["brush", "water", 0, .12, .10, 790, .005],
    ]);
  },
} satisfies SoundRecipe;
