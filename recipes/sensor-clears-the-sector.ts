import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import responseButton from './_recordings/response-button.ts';
import responseApplianceSingle from './_recordings/response-appliance-single.ts';

export default {
  id: 'sensor-clears-the-sector', name: "Sensor clears the sector", category: 'Sci-Fi & UI',
  tags: ["ui", "radar", "all", "clear", "status"],
  loopable: false, durationSec: 0.256, mixRole: 'interface', targetRmsDbfs: -28,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(responseButton, responseApplianceSingle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [responseButton, 0.0, 0.07, 0.44, 1, 10500, 0, 0.001, 0.022],
      [responseApplianceSingle, 0.056, 0.15, 0.69, 1.09, 7100.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
