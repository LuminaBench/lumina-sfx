import type { SoundRecipe } from '../engine/types.ts';
import { suspensionEvent } from './_shared/vehicle-expansion.ts';

export default {
  id: 'car-pothole-thump', name: 'Car Hits a Pothole', category: 'Vehicles & Engines',
  tags: ['car', 'pothole', 'suspension', 'wheel', 'impact'], loopable: false, durationSec: 0.49,
  params: { speed: { label: 'Speed', min: 0, max: 1, default: 0.6 } },
  targetRmsDbfs: -22,
  render(ctx, { params }) {
    return suspensionEvent(ctx, 'pothole', params.speed);
  },
} satisfies SoundRecipe;
