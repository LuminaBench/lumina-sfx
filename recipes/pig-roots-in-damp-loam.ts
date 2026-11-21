import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldPigSnuffle from './_recordings/field-pig-snuffle.ts';
import trowelSoftSoil from './_recordings/trowel-soft-soil.ts';

export default {
  id: 'pig-roots-in-damp-loam', name: "Pig roots in damp loam", category: 'Animals',
  tags: ["pig", "snuffle", "rooting", "digging"],
  loopable: false, durationSec: 1.73, mixRole: 'voice', targetRmsDbfs: -26,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldPigSnuffle, trowelSoftSoil),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [fieldPigSnuffle, 0.0, 0.88, 0.88, 1, 10500, 0, 0.001, 0.022],
      [trowelSoftSoil, 0.42, 0.38, 0.31, 1, 10500, 0, 0.001, 0.022],
      [fieldPigSnuffle, 0.89, 0.79, 0.67, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
