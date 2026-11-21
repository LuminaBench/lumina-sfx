import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalPuddles from './_recordings/natural-puddles.ts';
import drySandFootstep from './_recordings/dry-sand-footstep.ts';
import pressPottingSoil from './_recordings/press-potting-soil.ts';

export default {
  id: 'shallow-puddles-to-dune-sand-walking-transition', name: "Shallow puddles to dune sand walking transition", category: 'Footsteps & UI',
  tags: ["water", "wet", "splash", "puddle", "beach", "sand", "desert", "footstep", "crossing", "threshold", "transition", "walk"],
  loopable: false, durationSec: 1.892, mixRole: 'foley', targetRmsDbfs: -29,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalPuddles, drySandFootstep, pressPottingSoil),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [naturalPuddles, 0, 0.7424, 0.66, 0.99, 7200, 0, 0.001, 0.022],
      [naturalPuddles, 0.465, 0.735, 0.78, 1, 10500, 0, 0.001, 0.022],
      [drySandFootstep, 0.94, 0.439, 1, 1, 10500, 0, 0.001, 0.022],
      [pressPottingSoil, 1.04, 0.16, 0.1, 1.07, 5900, 0, 0.001, 0.022],
      [drySandFootstep, 1.424, 0.4181, 0.82, 1.05, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
