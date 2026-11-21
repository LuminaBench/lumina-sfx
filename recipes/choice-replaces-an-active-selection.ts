import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import responseMicroclick from './_recordings/response-microclick.ts';
import responseRocker from './_recordings/response-rocker.ts';

export default {
  id: 'choice-replaces-an-active-selection', name: "Choice replaces an active selection", category: 'Sci-Fi & UI',
  tags: ["ui", "menu", "choice", "replace", "swap"],
  loopable: false, durationSec: 0.198, mixRole: 'interface', targetRmsDbfs: -27,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(responseMicroclick, responseRocker),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [responseMicroclick, 0.0, 0.046, 0.62, 1, 10500, 0, 0.001, 0.022],
      [responseRocker, 0.063, 0.085, 0.84, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
