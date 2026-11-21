import type { SoundRecipe } from '../engine/types.ts';
import { coolingExhaust } from './_shared/vehicle-expansion.ts';

export default {
  id: 'car-engine-cooling-ticks', name: 'Engine Cooling Ticks', category: 'Vehicles & Engines',
  tags: ['car', 'engine', 'exhaust', 'cooling', 'ticks'], loopable: false, durationSec: 3.08,
  params: { rate: { label: 'Tick rate', min: 0, max: 1, default: 0.48 } },
  targetRmsDbfs: -26,
  render(ctx, { params }) {
    return coolingExhaust(ctx, params.rate);
  },
} satisfies SoundRecipe;
