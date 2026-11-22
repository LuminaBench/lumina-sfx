import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import leatherStrapFlex from './_recordings/leather-strap-flex.ts';
import lightBladeSwish from './_recordings/light-blade-swish.ts';

export default {
  id: 'knife-pass-by-the-sleeve', name: "Short knife pass by the sleeve", category: 'Combat Foley',
  tags: ["knife", "pass", "by", "the", "sleeve"], contains: ["grip shifts", "short blade moves through air", "leather settles"], perspective: 'first person',
  markers: {"grip": 0, "pass": 0.095}, loopable: false, durationSec: 0.46,
  mixRole: 'foley', targetRmsDbfs: -26,
  params: { force: { label: 'Gesture force', min: 0, max: 1, default: 0.5 } },
  ...performanceCredits(leatherStrapFlex, lightBladeSwish),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [leatherStrapFlex, 0, 0.16, 0.3, 1.03, 4600, 0.08],
      [lightBladeSwish, 0.085, 0.28, 1, 1.07, 13300],
      [leatherStrapFlex, 0.29, 0.16, 0.12, 0.94, 3600, 0.21],
    ]);
  },
} satisfies SoundRecipe;
