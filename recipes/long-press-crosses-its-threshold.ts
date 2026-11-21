import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import responseButton from './_recordings/response-button.ts';
import milestoneRatchet from './_recordings/milestone-ratchet.ts';
import responseMicroclick from './_recordings/response-microclick.ts';

export default {
  id: 'long-press-crosses-its-threshold', name: "Long press crosses its threshold", category: 'Sci-Fi & UI',
  tags: ["ui", "menu", "hold", "threshold", "confirm"],
  loopable: false, durationSec: 0.49, mixRole: 'interface', targetRmsDbfs: -26,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(responseButton, milestoneRatchet, responseMicroclick),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [responseButton, 0.0, 0.07, 0.48, 1, 10500, 0, 0.001, 0.022],
      [milestoneRatchet, 0.24, 0.16, 0.35, 1, 10500, 0, 0.001, 0.022],
      [responseMicroclick, 0.38, 0.06, 0.72, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
