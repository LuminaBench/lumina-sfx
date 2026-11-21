import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import marshFrogsNightLoop from './_recordings/marsh-frogs-night-loop.ts';
import fieldNightCrickets from './_recordings/field-night-crickets.ts';
import fieldStalkBed from './_recordings/field-stalk-bed.ts';

export default {
  id: 'frogs-and-crickets-in-drainage-reeds-loop', name: "Frogs and crickets in drainage reeds loop", category: 'Animals',
  tags: ["frog", "insect", "night", "marsh", "chorus", "loop"],
  loopable: true, durationSec: 4.5, mixRole: 'ambience', targetRmsDbfs: -29,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(marshFrogsNightLoop, fieldNightCrickets, fieldStalkBed),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [marshFrogsNightLoop, 0, 5.0, 0.75, 1, 8250, 2.0, 0.001, 0.015],
      [fieldNightCrickets, 0.0, 4.9, 0.33, 1.0, 8950.0, 2.0, 0.001, 0.022],
      [fieldStalkBed, 1.6, 2.7, 0.16, 1.0, 5450.0, 2.0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
