import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/wood-platform-landing.ts';
import source2 from './_recordings/hardwood-footstep.ts';

export default {
  id: "single-tire-rolling-over-a-loose-board",
  name: "Single Tire Rolling over a Loose Board",
  category: "Vehicles & Engines",
  tags: ["single", "tire", "rolling", "loose", "board", "vehicle"],
  loopable: false,
  durationSec: 0.93,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .72, .68, .035, 4790],
      ["contact", "wood", .081, .33, .54, 204, .001],
      ['clip', source2, .207, .54, .47, .082, 5550],
    ]);
  },
} satisfies SoundRecipe;
