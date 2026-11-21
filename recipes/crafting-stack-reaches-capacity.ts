import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import responseMicroclick from './_recordings/response-microclick.ts';
import responseRocker from './_recordings/response-rocker.ts';

export default {
  id: 'crafting-stack-reaches-capacity', name: "Crafting stack reaches capacity", category: 'Sci-Fi & UI',
  tags: ["ui", "inventory", "full", "stack", "limit"],
  loopable: false, durationSec: 0.255, mixRole: 'interface', targetRmsDbfs: -27,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(responseMicroclick, responseRocker),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [responseMicroclick, 0.0, 0.041, 0.59, 1, 10500, 0, 0.001, 0.022],
      [responseMicroclick, 0.058, 0.041, 0.48, 1, 10500, 0, 0.001, 0.022],
      [responseRocker, 0.119, 0.086, 0.76, 0.92, 5500.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
