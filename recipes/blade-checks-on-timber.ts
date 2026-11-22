import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import hatchetGreenwood from './_recordings/hatchet-greenwood.ts';
import leatherStrapFlex from './_recordings/leather-strap-flex.ts';

export default {
  id: 'blade-checks-on-timber', name: "Blade checks against a timber guard", category: 'Impacts',
  tags: ["blade", "checks", "on", "timber"], contains: ["dry wood contact", "short grip recoil"], perspective: 'within reach',
  markers: {"contact": 0, "recoil": 0.061}, loopable: false, durationSec: 0.31,
  mixRole: 'impact', targetRmsDbfs: -21,
  params: { force: { label: 'Gesture force', min: 0, max: 1, default: 0.5 } },
  ...performanceCredits(hatchetGreenwood, leatherStrapFlex),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [hatchetGreenwood, 0, 0.12, 1, 0.89, 10000],
      [leatherStrapFlex, 0.061, 0.21, 0.22, 0.9, 3900, 0.09],
    ]);
  },
} satisfies SoundRecipe;
