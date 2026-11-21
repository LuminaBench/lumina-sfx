import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-corn-rustle.ts';
import source2 from './_recordings/field-leaf-bed.ts';

export default {
  id: "heavy-corn-leaves-in-a-breeze-loop",
  name: "Heavy Corn Leaves in a Breeze",
  category: "Weather & Ambience",
  tags: ["heavy", "corn", "leaves", "breeze", "ambience"],
  loopable: true,
  durationSec: 14.0,
  targetRmsDbfs: -31,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 525, edge: 2140, drift: .24, density: 3.1, material: "plant", texture: .59,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 14.075, .91, .78, 8400, 0, 0],
      ['clip', source2, 2.1, 10.2, .13, .53, 4900, .75, 1.54],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
