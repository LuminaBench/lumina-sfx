import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import doorChainLatchSlide from './_recordings/door-chain-latch-slide.ts';
import paddockGateSwing from './_recordings/paddock-gate-swing.ts';

export default {
  id: 'glasshouse-gate-lifted-clear', name: "Glasshouse gate lifted clear", category: 'Props & Interactions',
  tags: ["garden", "glasshouse", "latch", "gate"],
  loopable: false, durationSec: 1.19, mixRole: 'detail', targetRmsDbfs: -26,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(doorChainLatchSlide, paddockGateSwing),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [doorChainLatchSlide, 0.0, 0.27, 0.73, 1, 10500, 0, 0.001, 0.022],
      [paddockGateSwing, 0.23, 0.91, 0.63, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
