import type { SoundRecipe } from '../engine/types.ts';
import { suspensionEvent } from './_shared/vehicle-expansion.ts';

export default {
  id: 'car-speed-bump', name: 'Car Over a Speed Bump', category: 'Vehicles & Engines',
  tags: ['car', 'speed-bump', 'suspension', 'wheels'], loopable: false, durationSec: 0.91,
  params: { speed: { label: 'Speed', min: 0, max: 1, default: 0.32 } },
  targetRmsDbfs: -22,
  render(ctx, { params }) {
    return suspensionEvent(ctx, 'bump', params.speed);
  },
} satisfies SoundRecipe;
