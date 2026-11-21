import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import responseMicroclick from './_recordings/response-microclick.ts';
import leatherStrapFlex from './_recordings/leather-strap-flex.ts';

export default {
  id: 'menu-item-lifted-for-dragging', name: "Menu item lifted for dragging", category: 'Sci-Fi & UI',
  tags: ["ui", "menu", "drag", "grab", "pickup"],
  loopable: false, durationSec: 0.205, mixRole: 'interface', targetRmsDbfs: -28,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(responseMicroclick, leatherStrapFlex),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [responseMicroclick, 0.0, 0.047, 0.74, 1, 10500, 0, 0.001, 0.022],
      [leatherStrapFlex, 0.03, 0.125, 0.16, 1.2, 4800.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
