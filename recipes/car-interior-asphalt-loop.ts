import type { SoundRecipe } from '../engine/types.ts';
import { roadBed } from './_shared/vehicle-expansion.ts';

export default {
  id: 'car-interior-asphalt-loop', name: 'Cabin Drive on Asphalt', category: 'Vehicles & Engines',
  tags: ['car', 'driving', 'cabin', 'asphalt', 'tires'], loopable: true, durationSec: 4.67,
  params: { speed: { label: 'Speed', min: 0, max: 1, default: 0.54 } },
  targetRmsDbfs: -28,
  render(ctx, { params }) {
    return roadBed(ctx, 'asphalt', params.speed);
  },
} satisfies SoundRecipe;
