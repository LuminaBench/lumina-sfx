import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import milestoneKeySingle from './_recordings/milestone-key-single.ts';
import responseMicroclick from './_recordings/response-microclick.ts';

export default {
  id: 'timeline-marker-removed', name: "Timeline marker removed", category: 'Sci-Fi & UI',
  tags: ["ui", "editor", "marker", "delete", "clear"],
  loopable: false, durationSec: 0.149, mixRole: 'interface', targetRmsDbfs: -30,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(milestoneKeySingle, responseMicroclick),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [milestoneKeySingle, 0.0, 0.057, 0.49, 1.24, 6300.0, 0, 0.001, 0.022],
      [responseMicroclick, 0.061, 0.038, 0.5, 0.91, 4000.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
