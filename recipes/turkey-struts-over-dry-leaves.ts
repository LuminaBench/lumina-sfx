import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import turkeyGobble from './_recordings/turkey-gobble.ts';
import dryVineBrush from './_recordings/dry-vine-brush.ts';
import fieldBirdFlutter from './_recordings/field-bird-flutter.ts';

export default {
  id: 'turkey-struts-over-dry-leaves', name: "Turkey struts over dry leaves", category: 'Animals',
  tags: ["turkey", "gobble", "leaves", "bird", "movement"],
  loopable: false, durationSec: 1.402, mixRole: 'voice', targetRmsDbfs: -25,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(turkeyGobble, dryVineBrush, fieldBirdFlutter),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [turkeyGobble, 0.0, 0.78, 0.93, 1, 10500, 0, 0.001, 0.022],
      [dryVineBrush, 0.24, 0.33, 0.16, 1, 10500, 0, 0.001, 0.022],
      [dryVineBrush, 0.64, 0.29, 0.2, 1, 10500, 0, 0.001, 0.022],
      [fieldBirdFlutter, 0.82, 0.43, 0.18, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
