import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/physical-light-switch.ts';

export default {
  id: "airlock-cycle-interrupted",
  name: "Airlock Cycle Interrupted",
  category: "Sci-Fi & UI",
  tags: ["airlock", "cycle", "interrupted"],
  loopable: false,
  durationSec: 1.1,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "air", 0, .83, .67, 1250, .04],
      ["tone", .09, .26, .43, 502, 348, .009, .21],
      ["tone", .33, .21, .41, 372, 257, .012, .31],
      ["contact", "rubber", .46, .24, .46, 214, .009],
      ['clip', source, .59, .24, .28, .01, 9100],
    ]);
  },
} satisfies SoundRecipe;
