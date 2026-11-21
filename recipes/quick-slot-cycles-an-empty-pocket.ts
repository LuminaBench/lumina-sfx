import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import responseMicroclick from './_recordings/response-microclick.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'quick-slot-cycles-an-empty-pocket', name: "Quick slot cycles an empty pocket", category: 'Sci-Fi & UI',
  tags: ["ui", "inventory", "empty", "slot", "hotbar"],
  loopable: false, durationSec: 0.183, mixRole: 'interface', targetRmsDbfs: -30,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(responseMicroclick, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [responseMicroclick, 0.0, 0.042, 0.67, 1, 10500, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.044, 0.089, 0.19, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
