import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldNightCrickets from './_recordings/field-night-crickets.ts';
import naturalGrassDrag from './_recordings/natural-grass-drag.ts';
import fieldLeafBed from './_recordings/field-leaf-bed.ts';

export default {
  id: 'crickets-pause-at-a-passing-foot', name: "Crickets pause at a passing foot", category: 'Animals',
  tags: ["insect", "crickets", "nocturnal", "footstep"],
  loopable: false, durationSec: 2.56, mixRole: 'voice', targetRmsDbfs: -30,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldNightCrickets, naturalGrassDrag, fieldLeafBed),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [fieldNightCrickets, 0.0, 1.84, 0.8, 1.0, 10200.0, 3.0, 0.001, 0.022],
      [naturalGrassDrag, 1.6, 0.49, 0.57, 1, 10500, 0, 0.001, 0.022],
      [fieldLeafBed, 1.79, 0.72, 0.12, 1.0, 3400.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
