import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import keyRingJingle from './_recordings/key-ring-jingle.ts';
import milestoneKeySingle from './_recordings/milestone-key-single.ts';

export default {
  id: 'one-key-removed-from-a-ring', name: "One key removed from a ring", category: 'Props & Interactions',
  tags: ["inventory", "keys", "select", "keyring"],
  loopable: false, durationSec: 0.55, mixRole: 'detail', targetRmsDbfs: -27,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(keyRingJingle, milestoneKeySingle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [keyRingJingle, 0.0, 0.35, 0.73, 1, 10500, 0, 0.001, 0.022],
      [milestoneKeySingle, 0.32, 0.18, 0.87, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
