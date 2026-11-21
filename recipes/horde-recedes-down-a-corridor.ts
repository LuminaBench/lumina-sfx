import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalHorde from './_recordings/natural-horde.ts';

export default {
  id: 'horde-recedes-down-a-corridor', name: "Horde recedes down a corridor", category: 'Zombies & Combat',
  tags: ["horde", "zombie", "crowd", "distance"],
  loopable: false, durationSec: 4.357, mixRole: 'voice', targetRmsDbfs: -25,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalHorde),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [naturalHorde, 0.0, 2.13, 0.94, 1, 10500, 0, 0.001, 0.022],
      [naturalHorde, 1.75, 1.65, 0.47, 1.0, 4050.0, 0.5, 0.001, 0.022],
      [naturalHorde, 3.16, 1.06, 0.22, 0.98, 2300.0, 1.4, 0.001, 0.022],
    ], { taps: [0.037, 0.087], send: 0.19, dampingHz: 2900 });
  },
} satisfies SoundRecipe;
