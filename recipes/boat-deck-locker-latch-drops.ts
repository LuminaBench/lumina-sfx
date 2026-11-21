import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-clank-close.ts';

export default {
  id: "boat-deck-locker-latch-drops",
  name: "Boat deck locker latch drops",
  category: "Water & Fire",
  tags: ["boat", "deck", "locker", "latch", "drops", "marine"],
  loopable: false,
  durationSec: 0.71,
  targetRmsDbfs: -27.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .26, .73, .018, 9100, .002, .048],
      ["contact", "wood", 0, .064, .26, 420, .0007],
      ["contact", "wood", .201, .227, .88, 268, .0027],
      ["contact", "iron", .266, .19, .21, 1790, .0017],
    ]);
  },
} satisfies SoundRecipe;
