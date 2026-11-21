import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import responseRocker from './_recordings/response-rocker.ts';
import doorChainLatchSlide from './_recordings/door-chain-latch-slide.ts';
import bookCoverShut from './_recordings/book-cover-shut.ts';

export default {
  id: 'checkpoint-gate-stamped-shut', name: "Checkpoint gate stamped shut", category: 'Sci-Fi & UI',
  tags: ["ui", "checkpoint", "save", "progress"],
  loopable: false, durationSec: 0.286, mixRole: 'interface', targetRmsDbfs: -26,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(responseRocker, doorChainLatchSlide, bookCoverShut),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [responseRocker, 0.0, 0.089, 0.53, 1, 10500, 0, 0.001, 0.022],
      [doorChainLatchSlide, 0.052, 0.13, 0.44, 1, 10500, 0, 0.001, 0.022],
      [bookCoverShut, 0.131, 0.105, 0.58, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
