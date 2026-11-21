import type { SoundRecipe } from '../engine/types.ts';
import { roadBed } from './_shared/vehicle-expansion.ts';

export default {
  id: 'car-interior-cobblestone-loop', name: 'Cabin Drive on Cobblestones', category: 'Vehicles & Engines',
  tags: ['car', 'driving', 'cabin', 'cobblestone', 'road'], loopable: true, durationSec: 3.89,
  params: { speed: { label: 'Speed', min: 0, max: 1, default: 0.63 } },
  targetRmsDbfs: -26,
  render(ctx, { params }) {
    return roadBed(ctx, 'cobble', params.speed);
  },
} satisfies SoundRecipe;
