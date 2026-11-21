import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import chickenClucks from './_recordings/chicken-clucks.ts';
import chicksPeeping from './_recordings/chicks-peeping.ts';

export default {
  id: 'hen-gathers-chicks-at-a-gate', name: "Hen gathers chicks at a gate", category: 'Animals',
  tags: ["chicken", "brood", "chicks", "maternal"],
  loopable: false, durationSec: 2.392, mixRole: 'voice', targetRmsDbfs: -25,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(chickenClucks, chicksPeeping),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [chickenClucks, 0.0, 0.82, 0.85, 1, 10500, 0, 0.001, 0.022],
      [chicksPeeping, 0.54, 1.32, 0.46, 1, 10500, 0, 0.001, 0.022],
      [chickenClucks, 1.56, 0.68, 0.66, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
