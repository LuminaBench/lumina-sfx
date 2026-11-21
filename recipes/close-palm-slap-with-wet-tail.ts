import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldCabbageChop from './_recordings/field-cabbage-chop.ts';
import wetCropBrush from './_recordings/wet-crop-brush.ts';
import twoFootLanding from './_recordings/two-foot-landing.ts';

export default {
  id: 'close-palm-slap-with-wet-tail', name: "Close palm slap with wet tail", category: 'Zombies & Combat',
  tags: ["flesh", "slap", "body", "wet", "impact"],
  loopable: false, durationSec: 0.325, mixRole: 'impact', targetRmsDbfs: -22,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldCabbageChop, wetCropBrush, twoFootLanding),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [fieldCabbageChop, 0.0, 0.13, 0.97, 1, 10500, 0, 0.001, 0.022],
      [wetCropBrush, 0.015, 0.26, 0.61, 1, 10500, 0, 0.001, 0.022],
      [twoFootLanding, 0.03, 0.16, 0.3, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
