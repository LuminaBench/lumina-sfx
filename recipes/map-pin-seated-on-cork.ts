import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import bottleCorkPull from './_recordings/bottle-cork-pull.ts';
import responseMicroclick from './_recordings/response-microclick.ts';

export default {
  id: 'map-pin-seated-on-cork', name: "Map pin seated on cork", category: 'Sci-Fi & UI',
  tags: ["ui", "map", "place", "marker", "navigation"],
  loopable: false, durationSec: 0.141, mixRole: 'interface', targetRmsDbfs: -27,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(bottleCorkPull, responseMicroclick),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [bottleCorkPull, 0.0, 0.091, 0.31, 1, 10500, 0, 0.001, 0.022],
      [responseMicroclick, 0.041, 0.047, 0.7, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
