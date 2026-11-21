import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import responseMicroclick from './_recordings/response-microclick.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'tab-focus-with-felt-travel', name: "Tab focus with felt travel", category: 'Sci-Fi & UI',
  tags: ["ui", "menu", "hover", "focus", "soft", "cloth"],
  loopable: false, durationSec: 0.099, mixRole: 'interface', targetRmsDbfs: -31,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(responseMicroclick, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [responseMicroclick, 0.0, 0.044, 0.8, 1, 10500, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.004, 0.045, 0.08, 1.22, 3400.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
