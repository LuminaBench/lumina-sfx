import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldLeafBed from './_recordings/field-leaf-bed.ts';
import naturalHorde from './_recordings/natural-horde.ts';
import dryBranchSnap from './_recordings/dry-branch-snap.ts';

export default {
  id: 'why-the-forest-fell-quiet-loop', name: "Distant horde in a quiet forest loop", category: 'Zombies & Combat',
  tags: ["horror", "forest", "horde", "distant", "zombie", "loop"],
  loopable: true, durationSec: 4.5, mixRole: 'ambience', targetRmsDbfs: -29,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldLeafBed, naturalHorde, dryBranchSnap),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [fieldLeafBed, 0, 5.0, 0.26, 1, 4800, 1.0, 0.001, 0.015],
      [naturalHorde, 0.45, 3.59, 0.51, 1.0, 2150.0, 0, 0.001, 0.022],
      [dryBranchSnap, 3.88, 0.19, 0.2, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
