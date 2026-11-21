import type { SoundRecipe } from '../engine/types.ts';
import { cabinControl } from './_shared/vehicle-expansion.ts';

export default {
  id: 'car-handbrake-pull', name: 'Manual Handbrake Pull', category: 'Vehicles & Engines',
  tags: ['car', 'handbrake', 'parking-brake', 'ratchet', 'cabin'], loopable: false, durationSec: 0.34,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.58 } },
  targetRmsDbfs: -25,
  render(ctx, { params }) {
    return cabinControl(ctx, 'handbrake-pull', params.force);
  },
} satisfies SoundRecipe;
