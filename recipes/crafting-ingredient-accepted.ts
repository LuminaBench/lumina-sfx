import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import plantLargeSeeds from './_recordings/plant-large-seeds.ts';
import responseMicroclick from './_recordings/response-microclick.ts';
import responseButton from './_recordings/response-button.ts';

export default {
  id: 'crafting-ingredient-accepted', name: "Crafting ingredient accepted", category: 'Sci-Fi & UI',
  tags: ["ui", "crafting", "ingredient", "insert"],
  loopable: false, durationSec: 0.201, mixRole: 'interface', targetRmsDbfs: -27,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(plantLargeSeeds, responseMicroclick, responseButton),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [plantLargeSeeds, 0.0, 0.072, 0.34, 1, 10500, 0, 0.001, 0.022],
      [responseMicroclick, 0.036, 0.046, 0.7, 1, 10500, 0, 0.001, 0.022],
      [responseButton, 0.083, 0.068, 0.42, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
