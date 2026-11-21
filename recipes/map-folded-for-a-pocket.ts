import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import bookPageTurn from './_recordings/book-page-turn.ts';
import seedPacketRustle from './_recordings/seed-packet-rustle.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'map-folded-for-a-pocket', name: "Map folded for a pocket", category: 'Props & Interactions',
  tags: ["paper", "map", "close", "navigation"],
  loopable: false, durationSec: 0.81, mixRole: 'detail', targetRmsDbfs: -28,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(bookPageTurn, seedPacketRustle, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [bookPageTurn, 0.0, 0.29, 0.8, 1, 10500, 0, 0.001, 0.022],
      [seedPacketRustle, 0.22, 0.38, 0.66, 1, 10500, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.55, 0.21, 0.31, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
