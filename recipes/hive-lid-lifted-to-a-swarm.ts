import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import slattedCrateSettle from './_recordings/slatted-crate-settle.ts';
import insideBeehiveLoop from './_recordings/inside-beehive-loop.ts';

export default {
  id: 'hive-lid-lifted-to-a-swarm', name: "Hive lid lifted to a swarm", category: 'Animals',
  tags: ["bee", "swarm", "hive", "keeper"],
  loopable: false, durationSec: 3.092, mixRole: 'voice', targetRmsDbfs: -25,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(slattedCrateSettle, insideBeehiveLoop),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [slattedCrateSettle, 0.0, 0.31, 0.44, 1, 10500, 0, 0.001, 0.022],
      [insideBeehiveLoop, 0.16, 2.85, 0.95, 1.0, 8100.0, 1.4, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
