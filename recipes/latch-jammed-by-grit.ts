import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import doorHandleUnlatch from './_recordings/door-handle-unlatch.ts';
import responseMicroclick from './_recordings/response-microclick.ts';
import doorChainLatchSlide from './_recordings/door-chain-latch-slide.ts';

export default {
  id: 'latch-jammed-by-grit', name: "Latch jammed by grit", category: 'Props & Interactions',
  tags: ["lock", "latch", "stuck", "jam", "failed"],
  loopable: false, durationSec: 0.68, mixRole: 'detail', targetRmsDbfs: -27,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(doorHandleUnlatch, responseMicroclick, doorChainLatchSlide),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [doorHandleUnlatch, 0.0, 0.2, 0.72, 1, 10500, 0, 0.001, 0.022],
      [responseMicroclick, 0.155, 0.05, 0.43, 1, 10500, 0, 0.001, 0.022],
      [doorHandleUnlatch, 0.34, 0.18, 0.64, 1, 10500, 0, 0.001, 0.022],
      [doorChainLatchSlide, 0.51, 0.12, 0.21, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
