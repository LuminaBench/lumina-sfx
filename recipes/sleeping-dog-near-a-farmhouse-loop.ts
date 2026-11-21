import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldLeafBed from './_recordings/field-leaf-bed.ts';
import naturalPant from './_recordings/natural-pant.ts';
import naturalDogbreath from './_recordings/natural-dogbreath.ts';

export default {
  id: 'sleeping-dog-near-a-farmhouse-loop', name: "Sleeping dog near a farmhouse loop", category: 'Animals',
  tags: ["dog", "breath", "night", "farm", "loop"],
  loopable: true, durationSec: 4.5, mixRole: 'ambience', targetRmsDbfs: -30,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldLeafBed, naturalPant, naturalDogbreath),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [fieldLeafBed, 0, 5.0, 0.11, 1, 3400, 2.0, 0.001, 0.015],
      [naturalPant, 0.12, 1.65, 0.8, 1, 10500, 0, 0.001, 0.022],
      [naturalDogbreath, 2.13, 0.81, 0.55, 1, 10500, 0, 0.001, 0.022],
      [naturalPant, 3.11, 1.19, 0.53, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
