import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldBrookBed from './_recordings/field-brook-bed.ts';
import naturalHorde from './_recordings/natural-horde.ts';
import naturalGroan from './_recordings/natural-groan.ts';

export default {
  id: 'infected-below-a-bridge-loop', name: "Infected below a bridge loop", category: 'Zombies & Combat',
  tags: ["zombie", "crowd", "moan", "water", "horror", "loop"],
  loopable: true, durationSec: 4.5, mixRole: 'ambience', targetRmsDbfs: -28,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldBrookBed, naturalHorde, naturalGroan),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [fieldBrookBed, 0, 5.0, 0.23, 1, 4300, 3.0, 0.001, 0.015],
      [naturalHorde, 0.14, 4.28, 0.66, 1.0, 3600.0, 0, 0.001, 0.022],
      [naturalGroan, 2.62, 1.36, 0.46, 0.95, 3990.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
