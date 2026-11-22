import type { SoundRecipe } from '../engine/types.ts';
import { cannonBurst, cannonCredit } from './_shared/flight-cannon.ts';
export default {
  id: 'flight-cannon-burst-canopy',
  name: 'Flight cannon burst, canopy',
  category: 'Weapons',
  mixRole: 'impact',
  isolation: 'isolated',
  tags: ['aircraft', 'dogfight', 'gun', 'cannon', 'burst', 'canopy'],
  loopable: false,
  durationSec: 0.67,
  targetRmsDbfs: -23,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.55 } },
  recording: cannonCredit,
  render(ctx, { seed, params }) {
    return cannonBurst(ctx, seed, params.force, true);
  },
} satisfies SoundRecipe;
