import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import milestoneRatchet from './_recordings/milestone-ratchet.ts';
import responseMicroclick from './_recordings/response-microclick.ts';

export default {
  id: 'counter-ratchet-increments-once', name: "Counter ratchet increments once", category: 'Sci-Fi & UI',
  tags: ["ui", "counter", "score", "points", "tick"],
  loopable: false, durationSec: 0.126, mixRole: 'interface', targetRmsDbfs: -29,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(milestoneRatchet, responseMicroclick),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [milestoneRatchet, 0.0, 0.064, 0.62, 1, 10500, 0, 0.001, 0.022],
      [responseMicroclick, 0.034, 0.042, 0.45, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
