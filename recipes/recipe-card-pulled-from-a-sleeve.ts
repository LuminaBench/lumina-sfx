import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import seedPacketRustle from './_recordings/seed-packet-rustle.ts';
import bookPageTurn from './_recordings/book-page-turn.ts';

export default {
  id: 'recipe-card-pulled-from-a-sleeve', name: "Recipe card pulled from a sleeve", category: 'Props & Interactions',
  tags: ["paper", "card", "crafting", "recipe"],
  loopable: false, durationSec: 0.52, mixRole: 'detail', targetRmsDbfs: -29,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(seedPacketRustle, bookPageTurn),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [seedPacketRustle, 0.0, 0.24, 0.67, 1, 10500, 0, 0.001, 0.022],
      [bookPageTurn, 0.18, 0.29, 0.87, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
