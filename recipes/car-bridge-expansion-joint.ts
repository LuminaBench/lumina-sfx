import type { SoundRecipe } from '../engine/types.ts';
import { suspensionEvent } from './_shared/vehicle-expansion.ts';

export default {
  id: 'car-bridge-expansion-joint', name: 'Car Over a Bridge Joint', category: 'Vehicles & Engines',
  tags: ['car', 'bridge', 'suspension', 'wheels'], loopable: false, durationSec: 0.63,
  params: { speed: { label: 'Speed', min: 0, max: 1, default: 0.7 } },
  targetRmsDbfs: -23,
  render(ctx, { params }) {
    return suspensionEvent(ctx, 'joint', params.speed);
  },
} satisfies SoundRecipe;
