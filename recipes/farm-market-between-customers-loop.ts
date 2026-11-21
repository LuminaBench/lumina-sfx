import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-farm-air.ts';
import source2 from './_recordings/burlap-feed-sack-open.ts';
import source3 from './_recordings/ceramic-tile-footstep.ts';
import source4 from './_recordings/wooden-chest-shut.ts';

export default {
  id: "farm-market-between-customers-loop",
  name: "Farm Market between Customers",
  category: "Weather & Ambience",
  tags: ["farm", "market", "between", "customers", "ambience"],
  loopable: true,
  durationSec: 14.0,
  targetRmsDbfs: -33,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3, source4),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 395, edge: 1720, drift: .20, density: 4, material: "wood", texture: .42,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 14.075, .32, 2.75, 7200, 0, 0],
      ['clip', source2, 2.17, .84, .12, .02, 3900, .09, .19],
      ['clip', source3, 6.93, .55, .09, .02, 3750, .04, .11],
      ['clip', source4, 11.91, .54, .075, .021, 3300, .04, .12],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
