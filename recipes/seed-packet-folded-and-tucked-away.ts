import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import seedPacketRustle from './_recordings/seed-packet-rustle.ts';
import bookPageTurn from './_recordings/book-page-turn.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'seed-packet-folded-and-tucked-away', name: "Seed packet folded and tucked away", category: 'Props & Interactions',
  tags: ["planting", "store", "seeds", "packet"],
  loopable: false, durationSec: 0.77, mixRole: 'detail', targetRmsDbfs: -29,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(seedPacketRustle, bookPageTurn, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [seedPacketRustle, 0.0, 0.37, 0.83, 1, 10500, 0, 0.001, 0.022],
      [bookPageTurn, 0.23, 0.12, 0.32, 1, 10500, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.47, 0.25, 0.41, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
