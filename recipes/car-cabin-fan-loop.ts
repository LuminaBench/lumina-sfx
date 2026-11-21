import type { SoundRecipe } from '../engine/types.ts';
import { cabinVent } from './_shared/vehicle-expansion.ts';

export default {
  id: 'car-cabin-fan-loop', name: 'Car Cabin Fan', category: 'Vehicles & Engines',
  tags: ['car', 'fan', 'heater', 'blower', 'cabin'], loopable: true, durationSec: 3.7,
  params: { speed: { label: 'Fan speed', min: 0, max: 1, default: 0.41 } },
  targetRmsDbfs: -28,
  render(ctx, { params }) {
    return cabinVent(ctx, params.speed);
  },
} satisfies SoundRecipe;
