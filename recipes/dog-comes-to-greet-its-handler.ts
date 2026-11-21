import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import dogDoubleBark from './_recordings/dog-double-bark.ts';
import naturalPant from './_recordings/natural-pant.ts';
import chainRattleShort from './_recordings/chain-rattle-short.ts';

export default {
  id: 'dog-comes-to-greet-its-handler', name: "Dog comes to greet its handler", category: 'Animals',
  tags: ["dog", "panting", "bark", "collar"],
  loopable: false, durationSec: 2.112, mixRole: 'voice', targetRmsDbfs: -24,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(dogDoubleBark, naturalPant, chainRattleShort),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [dogDoubleBark, 0.0, 0.76, 0.59, 1, 10500, 0, 0.001, 0.022],
      [naturalPant, 0.64, 1.32, 0.89, 1, 10500, 0, 0.001, 0.022],
      [chainRattleShort, 1.29, 0.29, 0.1, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
