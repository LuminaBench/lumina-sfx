import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import responseMicroclick from './_recordings/response-microclick.ts';
import responseRocker from './_recordings/response-rocker.ts';

export default {
  id: 'layer-visibility-toggled-off', name: "Layer visibility toggled off", category: 'Sci-Fi & UI',
  tags: ["ui", "editor", "layer", "hide"],
  loopable: false, durationSec: 0.181, mixRole: 'interface', targetRmsDbfs: -29,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(responseMicroclick, responseRocker),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [responseMicroclick, 0.0, 0.041, 0.61, 1, 10500, 0, 0.001, 0.022],
      [responseRocker, 0.038, 0.093, 0.71, 0.89, 4850.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
