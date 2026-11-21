import type { SoundRecipe } from '../engine/types.ts';
import { discharge } from './_shared/mechanical.ts';

export default {
  id: 'pump-shotgun', name: "Heavy Pump Shotgun", category: 'Weapons',
  tags: ["shotgun","gunshot","heavy","buckshot"], loopable: false, durationSec: 0.92,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.78 } },
  render(ctx, { params }) {
    return discharge(ctx, {
      span: 0.00252, low: 305, high: 1920, edge: 0.83,
      weight: 1.17 + params.weight * 0.88, tail: 0.53, presence: 1.12,
    });
  },
} satisfies SoundRecipe;
