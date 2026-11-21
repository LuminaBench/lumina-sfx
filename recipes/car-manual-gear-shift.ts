import type { SoundRecipe } from '../engine/types.ts';
import { cabinControl } from './_shared/vehicle-expansion.ts';

export default {
  id: 'car-manual-gear-shift', name: 'Manual Gear Lever Shift', category: 'Vehicles & Engines',
  tags: ['car', 'gear', 'shift', 'manual', 'cabin'], loopable: false, durationSec: 0.36,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.63 } },
  targetRmsDbfs: -25,
  render(ctx, { params }) {
    return cabinControl(ctx, 'gear-lever', params.force);
  },
} satisfies SoundRecipe;
