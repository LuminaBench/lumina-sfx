import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import milestoneRatchet from './_recordings/milestone-ratchet.ts';
import responseMicroclick from './_recordings/response-microclick.ts';

export default {
  id: 'rotary-selector-crosses-one-stop', name: "Rotary selector crosses one stop", category: 'Sci-Fi & UI',
  tags: ["ui", "knob", "rotary", "dial", "single", "tick"],
  loopable: false, durationSec: 0.147, mixRole: 'interface', targetRmsDbfs: -28,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(milestoneRatchet, responseMicroclick),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [milestoneRatchet, 0.0, 0.082, 0.63, 1, 10500, 0, 0.001, 0.022],
      [responseMicroclick, 0.056, 0.041, 0.64, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
