import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldLeafBed from './_recordings/field-leaf-bed.ts';
import naturalWolf from './_recordings/natural-wolf.ts';

export default {
  id: 'wild-wolves-in-a-wooded-valley-loop', name: "Wild wolves in a wooded valley loop", category: 'Animals',
  tags: ["wolf", "wolfpack", "howl", "night", "distant", "loop"],
  loopable: true, durationSec: 4.5, mixRole: 'ambience', targetRmsDbfs: -28,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldLeafBed, naturalWolf),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [fieldLeafBed, 0, 5.0, 0.13, 1, 3500, 2.0, 0.001, 0.015],
      [naturalWolf, 0.41, 3.52, 0.8, 1, 10500, 0, 0.001, 0.022],
      [naturalWolf, 2.78, 1.69, 0.3, 0.98, 3000.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
