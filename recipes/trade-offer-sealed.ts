import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import coinPileDrop from './_recordings/coin-pile-drop.ts';
import bookCoverShut from './_recordings/book-cover-shut.ts';
import responseMicroclick from './_recordings/response-microclick.ts';

export default {
  id: 'trade-offer-sealed', name: "Trade offer sealed", category: 'Sci-Fi & UI',
  tags: ["ui", "trading", "shop", "confirm", "transaction"],
  loopable: false, durationSec: 0.265, mixRole: 'interface', targetRmsDbfs: -25,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(coinPileDrop, bookCoverShut, responseMicroclick),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [coinPileDrop, 0.0, 0.115, 0.33, 1, 10500, 0, 0.001, 0.022],
      [bookCoverShut, 0.068, 0.139, 0.61, 1, 10500, 0, 0.001, 0.022],
      [responseMicroclick, 0.174, 0.041, 0.55, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
