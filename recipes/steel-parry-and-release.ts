import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import strike from './_recordings/blacksmith-anvil-strike.ts';
import grip from './_recordings/leather-strap-flex.ts';

export default {
  id: 'steel-parry-and-release', name: "Steel parry with a brief ringing release", category: 'Impacts',
  tags: ["steel", "parry", "and", "release"], contains: ["metal contact", "steel rings briefly", "grip catches"], perspective: 'within reach',
  markers: {"contact": 0, "release": 0.24}, loopable: false, durationSec: 0.62,
  mixRole: 'impact', targetRmsDbfs: -21,
  params: { force: { label: 'Gesture force', min: 0, max: 1, default: 0.5 } },
  ...performanceCredits(strike, grip),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [strike, 0, 0.47, 1, 1.08, 15400, 0, 0.0004, 0.065],
      [grip, 0.31, 0.21, 0.12, 0.94, 3900, 0.21],
    ]);
  },
} satisfies SoundRecipe;
