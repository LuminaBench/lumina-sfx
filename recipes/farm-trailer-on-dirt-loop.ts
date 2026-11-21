import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-diesel-idle.ts';
import source2 from './_recordings/chain-rattle-short.ts';

export default {
  id: "farm-trailer-on-dirt-loop",
  name: "Farm Trailer on Dirt",
  category: "Vehicles & Engines",
  tags: ["farm", "trailer", "dirt", "vehicle"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 245, edge: 1300, drift: .44, density: 8.9, material: "stone", texture: .62,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 9.075, .37, 1.85, 1500, 0, 0],
      ['clip', source2, 2.06, .64, .11, .02, 3900, .031, .20],
      ['clip', source2, 7.17, .75, .077, .05, 4100, .068, .21],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
