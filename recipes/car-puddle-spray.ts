import type { SoundRecipe } from '../engine/types.ts';
import { puddleSplash } from './_shared/vehicle-expansion.ts';

export default {
  id: 'car-puddle-spray', name: 'Tires Through a Puddle', category: 'Vehicles & Engines',
  tags: ['car', 'puddle', 'water', 'splash', 'tires'], loopable: false, durationSec: 1.04,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.62 } },
  targetRmsDbfs: -22,
  spectrum: [{ band: 'high', minShare: 0.26 }],
  render(ctx, { params }) {
    return puddleSplash(ctx, params.force);
  },
} satisfies SoundRecipe;
