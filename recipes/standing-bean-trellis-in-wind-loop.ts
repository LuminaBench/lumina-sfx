import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-leaf-bed.ts';
import source2 from './_recordings/dry-branch-snap.ts';

export default {
  id: "standing-bean-trellis-in-wind-loop",
  name: "Standing Bean Trellis in Wind",
  category: "Weather & Ambience",
  tags: ["standing", "bean", "trellis", "wind", "ambience"],
  loopable: true,
  durationSec: 14.0,
  targetRmsDbfs: -33,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 445, edge: 1960, drift: .29, density: 2.6, material: "plant", texture: .42,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 14.075, .59, .14, 7300, 0, 0],
      ['clip', source2, 4.57, .35, .05, .046, 3200, .01, .07],
      ['clip', source2, 10.46, .31, .065, 0, 4400, .014, .053],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
