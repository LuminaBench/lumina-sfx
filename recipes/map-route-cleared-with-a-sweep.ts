import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import bookPageTurn from './_recordings/book-page-turn.ts';
import responseRocker from './_recordings/response-rocker.ts';

export default {
  id: 'map-route-cleared-with-a-sweep', name: "Map route cleared with a sweep", category: 'Sci-Fi & UI',
  tags: ["ui", "map", "route", "clear", "cancel"],
  loopable: false, durationSec: 0.24, mixRole: 'interface', targetRmsDbfs: -29,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(bookPageTurn, responseRocker),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [bookPageTurn, 0.0, 0.135, 0.35, 1.23, 5900.0, 0, 0.001, 0.022],
      [responseRocker, 0.119, 0.071, 0.65, 0.9, 5050.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
