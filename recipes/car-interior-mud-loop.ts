import type { SoundRecipe } from '../engine/types.ts';
import { roadBed } from './_shared/vehicle-expansion.ts';

export default {
  id: 'car-interior-mud-loop', name: 'Cabin Drive through Ruts', category: 'Vehicles & Engines',
  tags: ['car', 'driving', 'cabin', 'mud', 'ruts'], loopable: true, durationSec: 4.32,
  params: { speed: { label: 'Speed', min: 0, max: 1, default: 0.45 } },
  targetRmsDbfs: -27,
  spectrum: [{ band: 'sub', minShare: 0.49 }],
  render(ctx, { params }) {
    return roadBed(ctx, 'mud', params.speed);
  },
} satisfies SoundRecipe;
