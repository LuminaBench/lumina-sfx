import type { SoundRecipe } from '../engine/types.ts';
import { electricDrive } from './_shared/vehicle-expansion.ts';

export default {
  id: 'electric-car-pullaway', name: 'Electric Car Pullaway', category: 'Vehicles & Engines',
  tags: ['electric', 'car', 'ev', 'drive', 'acceleration'], loopable: false, durationSec: 2.45,
  params: { load: { label: 'Load', min: 0, max: 1, default: 0.57 } },
  targetRmsDbfs: -23,
  render(ctx, { params }) {
    return electricDrive(ctx, params.load, false);
  },
} satisfies SoundRecipe;
