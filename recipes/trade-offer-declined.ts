import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import responseButton from './_recordings/response-button.ts';
import responseRocker from './_recordings/response-rocker.ts';

export default {
  id: 'trade-offer-declined', name: "Trade offer declined", category: 'Sci-Fi & UI',
  tags: ["ui", "trading", "shop", "refuse", "cancel"],
  loopable: false, durationSec: 0.228, mixRole: 'interface', targetRmsDbfs: -28,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(responseButton, responseRocker),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [responseButton, 0.0, 0.075, 0.61, 1, 10500, 0, 0.001, 0.022],
      [responseRocker, 0.095, 0.083, 0.57, 0.91, 4350.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
