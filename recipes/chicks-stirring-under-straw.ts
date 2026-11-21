import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import chicksPeeping from './_recordings/chicks-peeping.ts';
import bundleDryStalks from './_recordings/bundle-dry-stalks.ts';

export default {
  id: 'chicks-stirring-under-straw', name: "Chicks stirring under straw", category: 'Animals',
  tags: ["chicken", "chick", "peep", "nesting"],
  loopable: false, durationSec: 2.42, mixRole: 'voice', targetRmsDbfs: -30,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(chicksPeeping, bundleDryStalks),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [chicksPeeping, 0.0, 1.21, 0.83, 1, 10500, 0, 0.001, 0.022],
      [bundleDryStalks, 0.38, 0.41, 0.14, 1, 10500, 0, 0.001, 0.022],
      [chicksPeeping, 1.03, 1.34, 0.69, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
