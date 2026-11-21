import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-leaf-bed.ts';
import source2 from './_recordings/field-farm-marsh.ts';

export default {
  id: "pond-reed-edge-in-daylight-loop",
  name: "Pond Reed Edge in Daylight",
  category: "Weather & Ambience",
  tags: ["pond", "reed", "edge", "daylight", "ambience"],
  loopable: true,
  durationSec: 14.0,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 410, edge: 2180, drift: .18, density: 8, material: "water", texture: .61,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 14.075, .39, .52, 6400, 0, 0],
      ['clip', source2, 0, 14.075, .19, .63, 4300, 0, 0],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
