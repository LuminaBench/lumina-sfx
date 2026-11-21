import type { SoundRecipe } from '../engine/types.ts';
import { cabinControl } from './_shared/vehicle-expansion.ts';

export default {
  id: 'car-door-handle-pull', name: 'Car Door Handle Pull', category: 'Vehicles & Engines',
  tags: ['car', 'handle', 'latch', 'cabin'], loopable: false, durationSec: 0.31,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.6 } },
  targetRmsDbfs: -26,
  render(ctx, { params }) {
    return cabinControl(ctx, 'door-handle', params.force);
  },
} satisfies SoundRecipe;
