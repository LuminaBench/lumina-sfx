import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import doorChainLatchSlide from './_recordings/door-chain-latch-slide.ts';
import leatherStrapFlex from './_recordings/leather-strap-flex.ts';

export default {
  id: 'hand-steadies-loose-latch', name: "Hand steadies a loose latch", category: 'Props & Interactions',
  tags: ["hand", "steadies", "loose", "latch"], contains: ["latch slides", "chain settles", "soft grip movement"], perspective: 'within reach',
  markers: {"slide": 0, "settle": 0.39}, loopable: false, durationSec: 0.74,
  mixRole: 'detail', targetRmsDbfs: -27,
  params: { force: { label: 'Gesture force', min: 0, max: 1, default: 0.5 } },
  ...performanceCredits(doorChainLatchSlide, leatherStrapFlex),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [doorChainLatchSlide, 0, 0.33, 0.78, 0.93, 8900],
      [leatherStrapFlex, 0.24, 0.24, 0.16, 0.98, 3700],
      [doorChainLatchSlide, 0.39, 0.24, 0.32, 1.08, 6300, 0.09],
    ]);
  },
} satisfies SoundRecipe;
