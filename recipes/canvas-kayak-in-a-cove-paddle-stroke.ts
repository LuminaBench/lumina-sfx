import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-smallwater.ts';
import source2 from './_recordings/milestone-oar.ts';

export default {
  id: "canvas-kayak-in-a-cove-paddle-stroke",
  name: "Canvas Kayak in a Cove Paddle Stroke",
  category: "Water & Fire",
  tags: ["canvas", "kayak", "cove", "paddle", "stroke"],
  loopable: false,
  durationSec: 2.27,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.1, 0.84, 0.09, 4100, 0.011, 0.16],
      ['clip', source2, 0.12, 1.8, 0.38, 0.11, 3280, 0.023, 0.16],
      ["contact", "water", 0.17, 0.35, 0.41, 730, 0.002],
    ]);
  },
} satisfies SoundRecipe;
