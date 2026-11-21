import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldFarmMarsh from './_recordings/field-farm-marsh.ts';
import gooseSingleHonk from './_recordings/goose-single-honk.ts';
import fieldGooseHiss from './_recordings/field-goose-hiss.ts';

export default {
  id: 'geese-resting-at-a-river-bend-loop', name: "Geese resting at a river bend loop", category: 'Animals',
  tags: ["goose", "geese", "river", "honk", "loop"],
  loopable: true, durationSec: 4.5, mixRole: 'ambience', targetRmsDbfs: -28,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldFarmMarsh, gooseSingleHonk, fieldGooseHiss),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [fieldFarmMarsh, 0, 5.0, 0.33, 1, 6100, 1.0, 0.001, 0.015],
      [gooseSingleHonk, 0.42, 0.42, 0.65, 1, 10500, 0, 0.001, 0.022],
      [gooseSingleHonk, 1.72, 0.43, 0.46, 1, 10500, 0, 0.001, 0.022],
      [fieldGooseHiss, 2.87, 0.77, 0.4, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
