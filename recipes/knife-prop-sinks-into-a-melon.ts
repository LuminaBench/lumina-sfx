import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldButterKnife from './_recordings/field-butter-knife.ts';
import wetCropBrush from './_recordings/wet-crop-brush.ts';
import fieldCabbageChop from './_recordings/field-cabbage-chop.ts';
import fieldPepperRip from './_recordings/field-pepper-rip.ts';

export default {
  id: 'knife-prop-sinks-into-a-melon', name: "Knife prop sinks into a melon", category: 'Zombies & Combat',
  tags: ["foley", "fruit", "wet", "flesh", "stab", "game"],
  loopable: false, durationSec: 0.491, mixRole: 'impact', targetRmsDbfs: -22,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldButterKnife, wetCropBrush, fieldCabbageChop, fieldPepperRip),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [fieldButterKnife, 0.0, 0.13, 0.24, 1, 10500, 0, 0.001, 0.022],
      [wetCropBrush, 0.021, 0.32, 0.72, 1, 10500, 0, 0.001, 0.022],
      [fieldCabbageChop, 0.03, 0.11, 0.85, 1, 10500, 0, 0.001, 0.022],
      [fieldPepperRip, 0.141, 0.3, 0.39, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
