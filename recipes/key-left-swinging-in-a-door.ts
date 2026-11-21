import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import keyTurnInLock from './_recordings/key-turn-in-lock.ts';
import keyRingJingle from './_recordings/key-ring-jingle.ts';

export default {
  id: 'key-left-swinging-in-a-door', name: "Key left swinging in a door", category: 'Props & Interactions',
  tags: ["door", "keyring", "key", "idle", "jingle"],
  loopable: false, durationSec: 0.98, mixRole: 'detail', targetRmsDbfs: -29,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(keyTurnInLock, keyRingJingle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [keyTurnInLock, 0.0, 0.41, 0.71, 1, 10500, 0, 0.001, 0.022],
      [keyRingJingle, 0.35, 0.45, 0.67, 1, 10500, 0, 0.001, 0.022],
      [keyRingJingle, 0.75, 0.18, 0.22, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
