import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import cardboardPackageOpen from './_recordings/cardboard-package-open.ts';
import responseButton from './_recordings/response-button.ts';
import responseMicroclick from './_recordings/response-microclick.ts';

export default {
  id: 'blueprint-pin-pushed-home', name: "Blueprint pin pushed home", category: 'Sci-Fi & UI',
  tags: ["ui", "crafting", "blueprint", "pin", "favorite"],
  loopable: false, durationSec: 0.184, mixRole: 'interface', targetRmsDbfs: -27,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(cardboardPackageOpen, responseButton, responseMicroclick),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [cardboardPackageOpen, 0.0, 0.076, 0.22, 1, 10500, 0, 0.001, 0.022],
      [responseButton, 0.032, 0.088, 0.74, 1, 10500, 0, 0.001, 0.022],
      [responseMicroclick, 0.094, 0.04, 0.39, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
