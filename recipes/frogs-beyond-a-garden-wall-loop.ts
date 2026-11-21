import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import marshFrogsNightLoop from './_recordings/marsh-frogs-night-loop.ts';
import fieldNightCrickets from './_recordings/field-night-crickets.ts';
import naturalOwl from './_recordings/natural-owl.ts';

export default {
  id: 'frogs-beyond-a-garden-wall-loop', name: "Frogs beyond a garden wall loop", category: 'Animals',
  tags: ["frog", "chorus", "garden", "night", "loop"],
  loopable: true, durationSec: 4.5, mixRole: 'ambience', targetRmsDbfs: -29,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(marshFrogsNightLoop, fieldNightCrickets, naturalOwl),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [marshFrogsNightLoop, 0, 5.0, 0.82, 1, 4900, 2.0, 0.001, 0.015],
      [fieldNightCrickets, 0.0, 4.9, 0.14, 1.0, 6200.0, 3.0, 0.001, 0.022],
      [naturalOwl, 2.88, 0.88, 0.16, 0.99, 2500.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
