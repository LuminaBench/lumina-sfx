import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import responseRocker from './_recordings/response-rocker.ts';
import responseMicroclick from './_recordings/response-microclick.ts';

export default {
  id: 'layer-visibility-toggled-on', name: "Layer visibility toggled on", category: 'Sci-Fi & UI',
  tags: ["ui", "editor", "layer", "visibility", "show"],
  loopable: false, durationSec: 0.155, mixRole: 'interface', targetRmsDbfs: -28,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(responseRocker, responseMicroclick),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [responseRocker, 0.0, 0.075, 0.66, 1, 10500, 0, 0.001, 0.022],
      [responseMicroclick, 0.065, 0.04, 0.63, 1.16, 9800.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
