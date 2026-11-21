import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-turbine-idle.ts';

export default {
  id: "jet-cabin-cruise-loop",
  name: "Jet Cabin Cruise",
  category: "Aircraft",
  tags: ["jet", "cabin", "cruise"],
  loopable: true,
  durationSec: 8.0,
  targetRmsDbfs: -31,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 295, edge: 1110, drift: .25, density: 1.1, material: "air", texture: .15,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 8.075, .83, .15, 1080, 0, 0],
      ["motor", 0, 8.075, .011, 56, 58, .05, .32],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
