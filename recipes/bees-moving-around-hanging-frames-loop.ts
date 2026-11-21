import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import insideBeehiveLoop from './_recordings/inside-beehive-loop.ts';
import slattedCrateSettle from './_recordings/slatted-crate-settle.ts';

export default {
  id: 'bees-moving-around-hanging-frames-loop', name: "Bees moving around hanging frames loop", category: 'Animals',
  tags: ["bee", "swarm", "hive", "buzzing", "loop"],
  loopable: true, durationSec: 4.5, mixRole: 'ambience', targetRmsDbfs: -28,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(insideBeehiveLoop, slattedCrateSettle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [insideBeehiveLoop, 0, 5.0, 0.82, 1, 8200, 2.0, 0.001, 0.015],
      [insideBeehiveLoop, 1.13, 1.34, 0.29, 1.04, 7000.0, 5.0, 0.001, 0.022],
      [slattedCrateSettle, 3.29, 0.19, 0.08, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
