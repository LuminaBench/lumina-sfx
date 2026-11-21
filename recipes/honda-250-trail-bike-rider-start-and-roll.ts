import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-honda-dirt-start.ts';

export default {
  id: "honda-250-trail-bike-rider-start-and-roll",
  name: "Honda 250 trail bike rider start and roll",
  category: "Vehicles & Engines",
  tags: ["honda", "250", "trail", "bike", "rider", "start", "roll", "vehicle"],
  loopable: false,
  durationSec: 4.33,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 4.33, 1, .055, 8600, .002, .28],
    ]);
  },
} satisfies SoundRecipe;
