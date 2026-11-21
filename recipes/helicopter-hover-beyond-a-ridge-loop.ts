import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-rotor-bed.ts';

export default {
  id: "helicopter-hover-beyond-a-ridge-loop",
  name: "Helicopter Hover beyond a Ridge",
  category: "Aircraft",
  tags: ["helicopter", "hover", "beyond", "ridge"],
  loopable: true,
  durationSec: 8.0,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 192, edge: 910, drift: .14, density: 1, material: "air", texture: .15,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 8.075, .87, .09, 1540, 0, 0],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
