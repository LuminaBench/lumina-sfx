import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalHooves from './_recordings/natural-hooves.ts';
import naturalMud from './_recordings/natural-mud.ts';
import paddockGateSwing from './_recordings/paddock-gate-swing.ts';

export default {
  id: 'horse-passes-a-muddy-gate', name: "Horse passes a muddy gate", category: 'Animals',
  tags: ["horse", "gallop", "mud", "gate"],
  loopable: false, durationSec: 2.592, mixRole: 'voice', targetRmsDbfs: -24,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalHooves, naturalMud, paddockGateSwing),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [naturalHooves, 0.0, 1.65, 0.9, 1, 10500, 0, 0.001, 0.022],
      [naturalMud, 0.181, 0.45, 0.22, 1, 10500, 0, 0.001, 0.022],
      [naturalMud, 0.719, 0.35, 0.25, 1, 10500, 0, 0.001, 0.022],
      [paddockGateSwing, 1.68, 0.76, 0.15, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
