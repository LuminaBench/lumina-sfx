import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-tram-door.ts';

export default {
  id: "tram-doors-open-with-rattle",
  name: "Tram Doors Open with Rattle",
  category: "Vehicles & Engines",
  tags: ["tram", "doors", "open", "rattle", "vehicle"],
  loopable: false,
  durationSec: 2.39,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.28, .86, .07, 11000, .005, .13],
      ["contact", "iron", 1.6, .48, .36, 311, .006],
    ]);
  },
} satisfies SoundRecipe;
