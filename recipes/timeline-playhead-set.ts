import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import responseMicroclick from './_recordings/response-microclick.ts';
import milestoneKeySingle from './_recordings/milestone-key-single.ts';

export default {
  id: 'timeline-playhead-set', name: "Timeline playhead set", category: 'Sci-Fi & UI',
  tags: ["ui", "editor", "scrub", "timeline", "marker"],
  loopable: false, durationSec: 0.132, mixRole: 'interface', targetRmsDbfs: -29,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(responseMicroclick, milestoneKeySingle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [responseMicroclick, 0.0, 0.04, 0.79, 1, 10500, 0, 0.001, 0.022],
      [milestoneKeySingle, 0.021, 0.061, 0.22, 1.29, 7800.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
