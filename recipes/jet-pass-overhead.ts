import { mix } from '../engine/dsp.ts';
import { airTransient } from './_shared/air-transients.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-jet-pass.ts';

export default {
  id: "jet-pass-overhead",
  name: "Jet pass overhead",
  category: "Aircraft",
  tags: ["jet", "pass", "overhead"],
  loopable: false,
  durationSec: 3.64,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = airTransient(ctx, {
      motion: "flyby", focus: .43, width: .27, whistle: 228,
      weight: .72, cutoff: 6800, reflection: 0,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 3.64, .81, .62, 8300, .004, .39],
      ["brush", "air", .78, 1.35, .43, 2900, .10],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
