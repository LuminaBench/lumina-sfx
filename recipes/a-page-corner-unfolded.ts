import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import bookPageTurn from './_recordings/book-page-turn.ts';
import seedPacketRustle from './_recordings/seed-packet-rustle.ts';

export default {
  id: 'a-page-corner-unfolded', name: "A page corner unfolded", category: 'Props & Interactions',
  tags: ["paper", "map", "page", "small", "detail"],
  loopable: false, durationSec: 0.56, mixRole: 'detail', targetRmsDbfs: -30,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(bookPageTurn, seedPacketRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [bookPageTurn, 0.0, 0.21, 0.56, 1, 10500, 0, 0.001, 0.022],
      [seedPacketRustle, 0.12, 0.19, 0.42, 1, 10500, 0, 0.001, 0.022],
      [bookPageTurn, 0.36, 0.15, 0.38, 1.14, 6100.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
