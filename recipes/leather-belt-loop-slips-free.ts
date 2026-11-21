import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import leatherStrapFlex from './_recordings/leather-strap-flex.ts';
import doorChainLatchSlide from './_recordings/door-chain-latch-slide.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'leather-belt-loop-slips-free', name: "Leather belt loop slips free", category: 'Props & Interactions',
  tags: ["equipment", "belt", "leather", "clothing"],
  loopable: false, durationSec: 0.71, mixRole: 'detail', targetRmsDbfs: -28,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(leatherStrapFlex, doorChainLatchSlide, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [leatherStrapFlex, 0.0, 0.47, 0.9, 1, 10500, 0, 0.001, 0.022],
      [doorChainLatchSlide, 0.3, 0.12, 0.19, 1, 10500, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.47, 0.19, 0.16, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
