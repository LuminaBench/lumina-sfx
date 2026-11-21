import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldLeafBed from './_recordings/field-leaf-bed.ts';
import naturalCrowRoost from './_recordings/natural-crow-roost.ts';
import fieldBirdFlutter from './_recordings/field-bird-flutter.ts';

export default {
  id: 'crow-roost-on-a-forest-edge-loop', name: "Crow roost on a forest edge loop", category: 'Animals',
  tags: ["crow", "forest", "flock", "nest", "loop"],
  loopable: true, durationSec: 4.5, mixRole: 'ambience', targetRmsDbfs: -28,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldLeafBed, naturalCrowRoost, fieldBirdFlutter),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [fieldLeafBed, 0, 5.0, 0.24, 1, 5600, 3.0, 0.001, 0.015],
      [naturalCrowRoost, 0.42, 1.42, 0.72, 1, 10500, 0, 0.001, 0.022],
      [naturalCrowRoost, 2.58, 1.38, 0.59, 1, 10500, 0, 0.001, 0.022],
      [fieldBirdFlutter, 3.66, 0.5, 0.25, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
