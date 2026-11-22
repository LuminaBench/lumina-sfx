import type { SoundRecipe } from '../engine/types.ts';
import { cannonBurst, cannonCredit } from './_shared/flight-cannon.ts';
export default {
  id: 'flight-cannon-burst-exterior',
  name: 'Flight cannon burst, exterior',
  category: 'Weapons',
  mixRole: 'impact',
  isolation: 'isolated',
  tags: ['aircraft', 'dogfight', 'gun', 'cannon', 'burst', 'exterior'],
  loopable: false,
  durationSec: 0.67,
  targetRmsDbfs: -20,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.55 } },
  recording: cannonCredit,
  render(ctx, { seed, params }) {
    return cannonBurst(ctx, seed, params.force, false);
  },
} satisfies SoundRecipe;
