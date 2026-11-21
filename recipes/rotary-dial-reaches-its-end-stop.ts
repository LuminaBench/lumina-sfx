import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import milestoneRatchet from './_recordings/milestone-ratchet.ts';
import responseRocker from './_recordings/response-rocker.ts';

export default {
  id: 'rotary-dial-reaches-its-end-stop', name: "Rotary dial reaches its end stop", category: 'Sci-Fi & UI',
  tags: ["ui", "knob", "max", "end", "boundary"],
  loopable: false, durationSec: 0.226, mixRole: 'interface', targetRmsDbfs: -27,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(milestoneRatchet, responseRocker),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [milestoneRatchet, 0.0, 0.083, 0.54, 1, 10500, 0, 0.001, 0.022],
      [responseRocker, 0.086, 0.09, 0.77, 0.94, 5800.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
