import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-yamaha-stroke.ts';

export default {
  id: "two-stroke-trail-bike-bog-and-recover",
  name: "Two-stroke trail bike bog and recover",
  category: "Vehicles & Engines",
  tags: ["two", "stroke", "trail", "bike", "bog", "recover", "vehicle"],
  loopable: false,
  durationSec: 3.4,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.62, .56, .12, 2600, .004, .33],
      ['clip', source, 1.15, 2.25, .53, 2.4, 6600, .33, .26],
      ["motor", 0, 1.65, .15, 134, 76, .002, .48],
      ["motor", 1.30, 2.02, .16, 72, 151, .08, .57],
    ]);
  },
} satisfies SoundRecipe;
