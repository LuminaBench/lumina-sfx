import { mix } from '../engine/dsp.ts';
import { destruction } from './_shared/destruction-effects.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/car-bumper-bump.ts';

export default {
  id: "blast-from-inside-a-vehicle-cabin",
  name: "Blast from inside a Vehicle Cabin",
  category: "Impacts",
  tags: ["blast", "inside", "vehicle", "cabin"],
  loopable: false,
  durationSec: 1.7,
  targetRmsDbfs: -21,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = destruction(ctx, {
      cracks: [
        { at: 0, width: .023, weight: 1.15, bite: .49, bloom: .15 },
        { at: .065, width: .027, weight: .63, bite: .20, bloom: .114 },
      ], debris: "steel", debrisAt: .06, debrisSpan: .9, fragments: 11, space: "dry", color: 1450,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, .079, .61, .50, .035, 2700],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
