import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import donkeyBray from './_recordings/donkey-bray.ts';

export default {
  id: 'donkey-brays-across-a-paddock', name: "Donkey brays across a paddock", category: 'Animals',
  tags: ["donkey", "bray", "pasture", "response"],
  loopable: false, durationSec: 3.982, mixRole: 'voice', targetRmsDbfs: -24,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(donkeyBray),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [donkeyBray, 0.0, 1.8, 1.0, 1, 10500, 0, 0.001, 0.022],
      [donkeyBray, 2.13, 1.7, 0.34, 0.97, 4200.0, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
