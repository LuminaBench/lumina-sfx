import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldHenScratch from './_recordings/field-hen-scratch.ts';
import shakeSoilOffRoots from './_recordings/shake-soil-off-roots.ts';
import chickenClucks from './_recordings/chicken-clucks.ts';

export default {
  id: 'chicken-scratching-then-calling', name: "Chicken scratching then calling", category: 'Animals',
  tags: ["chicken", "hen", "soil", "foraging"],
  loopable: false, durationSec: 2.132, mixRole: 'voice', targetRmsDbfs: -25,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldHenScratch, shakeSoilOffRoots, chickenClucks),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [fieldHenScratch, 0.0, 1.35, 0.84, 1, 10500, 0, 0.001, 0.022],
      [shakeSoilOffRoots, 0.58, 0.18, 0.09, 1, 10500, 0, 0.001, 0.022],
      [chickenClucks, 1.24, 0.74, 0.9, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
