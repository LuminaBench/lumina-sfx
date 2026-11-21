import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import milestoneKeySingle from './_recordings/milestone-key-single.ts';
import keyTurnInLock from './_recordings/key-turn-in-lock.ts';

export default {
  id: 'key-fumbled-against-a-lock', name: "Key fumbled against a lock", category: 'Props & Interactions',
  tags: ["door", "key", "fumble", "retry", "puzzle"],
  loopable: false, durationSec: 0.84, mixRole: 'detail', targetRmsDbfs: -26,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(milestoneKeySingle, keyTurnInLock),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [milestoneKeySingle, 0.0, 0.15, 0.62, 1, 10500, 0, 0.001, 0.022],
      [milestoneKeySingle, 0.18, 0.18, 0.47, 1, 10500, 0, 0.001, 0.022],
      [keyTurnInLock, 0.39, 0.4, 0.79, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
