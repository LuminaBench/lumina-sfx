import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import milestoneRatchet from './_recordings/milestone-ratchet.ts';
import responseMicroclick from './_recordings/response-microclick.ts';

export default {
  id: 'rotary-selector-spun-three-stops', name: "Rotary selector spun three stops", category: 'Sci-Fi & UI',
  tags: ["ui", "knob", "slider", "ticks", "scrolling"],
  loopable: false, durationSec: 0.284, mixRole: 'interface', targetRmsDbfs: -28,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(milestoneRatchet, responseMicroclick),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [milestoneRatchet, 0.0, 0.073, 0.63, 1, 10500, 0, 0.001, 0.022],
      [milestoneRatchet, 0.074, 0.061, 0.54, 1, 10500, 0, 0.001, 0.022],
      [milestoneRatchet, 0.133, 0.065, 0.44, 1, 10500, 0, 0.001, 0.022],
      [responseMicroclick, 0.192, 0.042, 0.67, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
