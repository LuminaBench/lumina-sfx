import type { SoundRecipe } from '../engine/types.ts';
import { cabinControl } from './_shared/vehicle-expansion.ts';

export default {
  id: 'car-handbrake-release', name: 'Manual Handbrake Release', category: 'Vehicles & Engines',
  tags: ['car', 'handbrake', 'parking-brake', 'button', 'cabin'], loopable: false, durationSec: 0.33,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.52 } },
  targetRmsDbfs: -26,
  render(ctx, { params }) {
    return cabinControl(ctx, 'handbrake-release', params.force);
  },
} satisfies SoundRecipe;
