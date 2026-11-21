import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/mud-squelch-footstep.ts';
import source2 from './_recordings/spade-wet-mud.ts';

export default {
  id: "tire-clearing-sticky-mud",
  name: "Tire Clearing Sticky Mud",
  category: "Vehicles & Engines",
  tags: ["tire", "clearing", "sticky", "mud", "vehicle"],
  loopable: false,
  durationSec: 1.18,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .64, .76, .08, 6400],
      ["brush", "rubber", .03, .53, .53, 396, .071],
      ['clip', source2, .31, .63, .46, .15, 3700],
    ]);
  },
} satisfies SoundRecipe;
