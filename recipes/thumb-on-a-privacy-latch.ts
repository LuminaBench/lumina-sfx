import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import doorHandleUnlatch from './_recordings/door-handle-unlatch.ts';
import doorChainLatchSlide from './_recordings/door-chain-latch-slide.ts';
import responseMicroclick from './_recordings/response-microclick.ts';

export default {
  id: 'thumb-on-a-privacy-latch', name: "Thumb on a privacy latch", category: 'Props & Interactions',
  tags: ["door", "lock", "thumb", "turn", "tactile"],
  loopable: false, durationSec: 0.335, mixRole: 'detail', targetRmsDbfs: -29,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(doorHandleUnlatch, doorChainLatchSlide, responseMicroclick),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [doorHandleUnlatch, 0.0, 0.14, 0.38, 1, 10500, 0, 0.001, 0.022],
      [doorChainLatchSlide, 0.075, 0.2, 0.7, 1, 10500, 0, 0.001, 0.022],
      [responseMicroclick, 0.23, 0.055, 0.29, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
