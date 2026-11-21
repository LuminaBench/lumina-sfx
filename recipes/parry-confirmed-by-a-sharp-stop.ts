import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import milestoneKeySingle from './_recordings/milestone-key-single.ts';
import responseMicroclick from './_recordings/response-microclick.ts';
import responseRocker from './_recordings/response-rocker.ts';

export default {
  id: 'parry-confirmed-by-a-sharp-stop', name: "Parry confirmed by a sharp stop", category: 'Sci-Fi & UI',
  tags: ["ui", "combat", "parry", "block", "confirm"],
  loopable: false, durationSec: 0.198, mixRole: 'interface', targetRmsDbfs: -25,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(milestoneKeySingle, responseMicroclick, responseRocker),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [milestoneKeySingle, 0.0, 0.082, 0.46, 1, 10500, 0, 0.001, 0.022],
      [responseMicroclick, 0.009, 0.042, 0.71, 1, 10500, 0, 0.001, 0.022],
      [responseRocker, 0.073, 0.075, 0.52, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
