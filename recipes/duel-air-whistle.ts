import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import lightBladeSwish from './_recordings/light-blade-swish.ts';
import leatherStrapFlex from './_recordings/leather-strap-flex.ts';

export default {
  id: 'duel-air-whistle', name: "Accented dueling air whistle", category: 'Combat Foley',
  tags: ["duel", "air", "whistle"], contains: ["bright rising air accent", "blade rush", "short follow through"], perspective: 'close pass',
  markers: {"pass": 0.072}, loopable: false, durationSec: 0.37,
  mixRole: 'foley', targetRmsDbfs: -21,
  params: { force: { label: 'Gesture force', min: 0, max: 1, default: 0.5 } },
  ...performanceCredits(lightBladeSwish, leatherStrapFlex),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [lightBladeSwish, 0, 0.14, 0.42, 0.85, 7400],
      [lightBladeSwish, 0.062, 0.21, 1, 1.53, 16400],
      [leatherStrapFlex, 0.16, 0.19, 0.16, 0.91, 3900, 0.16],
    ]);
  },
} satisfies SoundRecipe;
