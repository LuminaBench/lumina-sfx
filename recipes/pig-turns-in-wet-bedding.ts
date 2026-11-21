import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalMud from './_recordings/natural-mud.ts';
import fieldPigSnuffle from './_recordings/field-pig-snuffle.ts';
import bundleDryStalks from './_recordings/bundle-dry-stalks.ts';

export default {
  id: 'pig-turns-in-wet-bedding', name: "Pig turns in wet bedding", category: 'Animals',
  tags: ["pig", "mud", "bedding", "snort"],
  loopable: false, durationSec: 1.23, mixRole: 'voice', targetRmsDbfs: -26,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalMud, fieldPigSnuffle, bundleDryStalks),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [naturalMud, 0.0, 0.38, 0.32, 1, 10500, 0, 0.001, 0.022],
      [fieldPigSnuffle, 0.19, 0.89, 0.91, 1, 10500, 0, 0.001, 0.022],
      [bundleDryStalks, 0.77, 0.41, 0.25, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
