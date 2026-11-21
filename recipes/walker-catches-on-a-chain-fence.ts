import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import chainRattleShort from './_recordings/chain-rattle-short.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import naturalGroan from './_recordings/natural-groan.ts';

export default {
  id: 'walker-catches-on-a-chain-fence', name: "Walker catches on a chain fence", category: 'Zombies & Combat',
  tags: ["zombie", "chain", "wire", "fence", "struggle"],
  loopable: false, durationSec: 1.722, mixRole: 'voice', targetRmsDbfs: -24,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(chainRattleShort, jacketMovementRustle, naturalGroan),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [chainRattleShort, 0.0, 0.69, 0.53, 1, 10500, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.11, 0.23, 0.18, 1, 10500, 0, 0.001, 0.022],
      [naturalGroan, 0.26, 1.31, 0.93, 1, 10500, 0, 0.001, 0.022],
      [chainRattleShort, 0.91, 0.37, 0.26, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
