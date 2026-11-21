import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-wet-road.ts';
import source2 from './_recordings/metal-pail-pour.ts';
import source3 from './_recordings/well-bucket-lower.ts';

export default {
  id: "car-creeping-through-a-deep-puddle",
  name: "Car Creeping through a Deep Puddle",
  category: "Vehicles & Engines",
  tags: ["car", "creeping", "deep", "puddle", "vehicle"],
  loopable: false,
  durationSec: 2.26,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.15, .72, .42, 9500],
      ['clip', source2, .28, 1.40, .40, .14, 7200],
      ['clip', source3, .52, 1.49, .49, .203, 4300],
      ["contact", "rubber", .89, .45, .19, 136, .01],
    ]);
  },
} satisfies SoundRecipe;
