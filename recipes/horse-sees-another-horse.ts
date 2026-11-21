import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import horseContactNicker from './_recordings/horse-contact-nicker.ts';
import horseWhinny from './_recordings/horse-whinny.ts';

export default {
  id: 'horse-sees-another-horse', name: "Horse sees another horse", category: 'Animals',
  tags: ["horse", "nicker", "whinny", "response"],
  loopable: false, durationSec: 3.042, mixRole: 'voice', targetRmsDbfs: -22,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(horseContactNicker, horseWhinny),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [horseContactNicker, 0.0, 1.01, 0.88, 1, 10500, 0, 0.001, 0.022],
      [horseWhinny, 1.08, 1.81, 0.72, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
