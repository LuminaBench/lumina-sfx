import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldHorseBreath from './_recordings/field-horse-breath.ts';
import barnTimberCreak from './_recordings/barn-timber-creak.ts';
import horseContactNicker from './_recordings/horse-contact-nicker.ts';

export default {
  id: 'horse-exhales-over-a-stable-door', name: "Horse exhales over a stable door", category: 'Animals',
  tags: ["horse", "breath", "snort", "timber"],
  loopable: false, durationSec: 2.064, mixRole: 'voice', targetRmsDbfs: -26,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldHorseBreath, barnTimberCreak, horseContactNicker),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [fieldHorseBreath, 0.0, 0.67, 0.91, 1, 10500, 0, 0.001, 0.022],
      [barnTimberCreak, 0.29, 0.57, 0.16, 1, 10500, 0, 0.001, 0.022],
      [horseContactNicker, 0.91, 1.04, 0.6, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.024, 0.064], send: 0.125, dampingHz: 3300 });
  },
} satisfies SoundRecipe;
