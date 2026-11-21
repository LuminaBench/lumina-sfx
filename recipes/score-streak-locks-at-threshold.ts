import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import milestoneRatchet from './_recordings/milestone-ratchet.ts';
import energyCellSeating from './_recordings/energy-cell-seating.ts';

export default {
  id: 'score-streak-locks-at-threshold', name: "Score streak locks at threshold", category: 'Sci-Fi & UI',
  tags: ["ui", "score", "streak", "threshold", "reward"],
  loopable: false, durationSec: 0.293, mixRole: 'interface', targetRmsDbfs: -25,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(milestoneRatchet, energyCellSeating),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [milestoneRatchet, 0.0, 0.07, 0.52, 1, 10500, 0, 0.001, 0.022],
      [milestoneRatchet, 0.067, 0.071, 0.58, 1, 10500, 0, 0.001, 0.022],
      [energyCellSeating, 0.146, 0.097, 0.73, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
