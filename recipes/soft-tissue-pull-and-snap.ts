import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldLeafTear from './_recordings/field-leaf-tear.ts';
import wetCropBrush from './_recordings/wet-crop-brush.ts';
import fieldCabbageChop from './_recordings/field-cabbage-chop.ts';
import fieldPepperRip from './_recordings/field-pepper-rip.ts';

export default {
  id: 'soft-tissue-pull-and-snap', name: "Soft tissue pull and snap", category: 'Combat Foley',
  tags: ["flesh", "tearing", "wet", "impact"],
  loopable: false, durationSec: 0.639, mixRole: 'impact', targetRmsDbfs: -24,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldLeafTear, wetCropBrush, fieldCabbageChop, fieldPepperRip),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [fieldLeafTear, 0.0, 0.38, 0.7, 1, 10500, 0, 0.001, 0.022],
      [wetCropBrush, 0.12, 0.24, 0.39, 1, 10500, 0, 0.001, 0.022],
      [fieldCabbageChop, 0.319, 0.13, 0.88, 1, 10500, 0, 0.001, 0.022],
      [fieldPepperRip, 0.359, 0.23, 0.47, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
