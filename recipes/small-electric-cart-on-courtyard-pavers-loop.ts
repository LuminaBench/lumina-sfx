import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-wet-road.ts';

export default {
  id: "small-electric-cart-on-courtyard-pavers-loop",
  name: "Small Electric Cart on Courtyard Pavers",
  category: "Vehicles & Engines",
  tags: ["small", "electric", "cart", "courtyard", "pavers", "vehicle"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 272, edge: 1350, drift: .23, density: 9.2, material: "stone", texture: .48,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["motor", 0, 9.075, .023, 131, 138, .11, .44],
      ["grains", "stone", .043, 8.75, .06, 388, 92],
      ['clip', source, .6, 2.7, .18, .07, 3560, .6, .5],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
