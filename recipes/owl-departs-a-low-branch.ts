import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalOwl from './_recordings/natural-owl.ts';
import fieldBirdFlutter from './_recordings/field-bird-flutter.ts';
import dryVineBrush from './_recordings/dry-vine-brush.ts';

export default {
  id: 'owl-departs-a-low-branch', name: "Owl departs a low branch", category: 'Animals',
  tags: ["owl", "nocturnal", "wing", "hoot"],
  loopable: false, durationSec: 1.661, mixRole: 'voice', targetRmsDbfs: -26,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalOwl, fieldBirdFlutter, dryVineBrush),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [naturalOwl, 0.0, 0.96, 0.97, 1, 10500, 0, 0.001, 0.022],
      [fieldBirdFlutter, 0.81, 0.66, 0.33, 1, 10500, 0, 0.001, 0.022],
      [dryVineBrush, 1.05, 0.25, 0.12, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.073, 0.141], send: 0.13, dampingHz: 2100 });
  },
} satisfies SoundRecipe;
