import type { SoundRecipe } from '../engine/types.ts';
import { roadBed } from './_shared/vehicle-expansion.ts';

export default {
  id: 'car-interior-gravel-loop', name: 'Cabin Drive on Gravel', category: 'Vehicles & Engines',
  tags: ['car', 'driving', 'cabin', 'gravel', 'tires'], loopable: true, durationSec: 4.11,
  params: { speed: { label: 'Speed', min: 0, max: 1, default: 0.53 } },
  targetRmsDbfs: -26,
  spectrum: [{ band: 'high', minShare: 0.026 }],
  render(ctx, { params }) {
    return roadBed(ctx, 'gravel', params.speed);
  },
} satisfies SoundRecipe;
