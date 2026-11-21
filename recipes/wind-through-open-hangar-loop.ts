import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-sheltered-wind.ts';
import source2 from './_recordings/demo-fighter-taxi.ts';

export default {
  id: "wind-through-open-hangar-loop",
  name: "Wind through Open Hangar",
  category: "Weather & Ambience",
  tags: ["wind", "open", "hangar", "ambience"],
  loopable: true,
  durationSec: 10.0,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 226, edge: 1290, drift: .15, density: 1.2, material: "air", texture: .24,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 10.075, .53, 2.09, 3200, 0, 0],
      ['clip', source2, 3.02, 5.13, .16, .57, 1770, .75, 1.8],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
