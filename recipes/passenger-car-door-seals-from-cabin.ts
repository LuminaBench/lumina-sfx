import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import recording1 from './_recordings/car-door-shut-inside.ts';
import recording2 from './_recordings/car-cabin-idle-loop.ts';

export default {
  id: 'passenger-car-door-seals-from-cabin', name: 'Passenger car door seals from cabin', category: 'Vehicles & Engines',
  tags: ["vehicle", "passenger", "car", "door", "seals", "from", "cabin", "rubber", "foley"], loopable: false, durationSec: 0.85,
  mixRole: 'vehicle', targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },
  ...sceneCredits(recording1, recording2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', recording1, 0.0, 0.53, 1.0, 0.018, 2300, 0.001, 0.09],
      ['clip', recording2, 0.11, 0.68, 0.2, 0.7, 850, 0.006, 0.09],
      ["contact", "rubber", 0.059, 0.095, 0.29, 180, 0.003],
    ]);
  },
} satisfies SoundRecipe;
