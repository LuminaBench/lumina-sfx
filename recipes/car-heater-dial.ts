import type { SoundRecipe } from '../engine/types.ts';
import { cabinControl } from './_shared/vehicle-expansion.ts';

export default {
  id: 'car-heater-dial', name: 'Cabin Heater Dial', category: 'Vehicles & Engines',
  tags: ['car', 'heater', 'control', 'dial', 'cabin'], loopable: false, durationSec: 0.32,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.54 } },
  targetRmsDbfs: -28,
  render(ctx, { params }) {
    return cabinControl(ctx, 'heater-control', params.force);
  },
} satisfies SoundRecipe;
