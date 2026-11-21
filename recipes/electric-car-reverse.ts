import type { SoundRecipe } from '../engine/types.ts';
import { electricDrive } from './_shared/vehicle-expansion.ts';

export default {
  id: 'electric-car-reverse', name: 'Electric Car Reversing', category: 'Vehicles & Engines',
  tags: ['electric', 'car', 'ev', 'reverse', 'drive'], loopable: false, durationSec: 2.18,
  params: { load: { label: 'Load', min: 0, max: 1, default: 0.48 } },
  targetRmsDbfs: -24,
  render(ctx, { params }) {
    return electricDrive(ctx, params.load, true);
  },
} satisfies SoundRecipe;
