import type { SoundRecipe } from '../engine/types.ts';
import { hazardRelay } from './_shared/vehicle-expansion.ts';

export default {
  id: 'car-indicator-relay-loop', name: 'Car Indicator Relay', category: 'Vehicles & Engines',
  tags: ['car', 'blinker', 'indicator', 'hazards', 'cabin'], loopable: true, durationSec: 2.48,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.48 } },
  targetRmsDbfs: -26,
  render(ctx, { params }) {
    return hazardRelay(ctx, 0.62, params.weight);
  },
} satisfies SoundRecipe;
