import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import responseMicroclick from './_recordings/response-microclick.ts';

export default {
  id: 'list-scroll-coasts-to-rest', name: "List scroll coasts to rest", category: 'Sci-Fi & UI',
  tags: ["ui", "list", "scroll", "wheel", "inertia"],
  loopable: false, durationSec: 0.515, mixRole: 'interface', targetRmsDbfs: -29,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(responseMicroclick),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [responseMicroclick, 0.0, 0.04, 0.65, 1, 10500, 0, 0.001, 0.022],
      [responseMicroclick, 0.061, 0.04, 0.63, 1, 10500, 0, 0.001, 0.022],
      [responseMicroclick, 0.143, 0.04, 0.58, 1, 10500, 0, 0.001, 0.022],
      [responseMicroclick, 0.257, 0.04, 0.52, 1, 10500, 0, 0.001, 0.022],
      [responseMicroclick, 0.425, 0.04, 0.48, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
