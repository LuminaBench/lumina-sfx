import { mix } from '../engine/dsp.ts';
import { destruction } from './_shared/destruction-effects.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/rock-pile-impact.ts';

export default {
  id: "debris-falling-after-a-distant-blast",
  name: "Debris Falling after a Distant Blast",
  category: "Impacts",
  tags: ["debris", "falling", "distant", "blast"],
  loopable: false,
  durationSec: 1.83,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = destruction(ctx, {
      cracks: [
        { at: 0, width: .013, weight: .23, bite: .31, bloom: .071 },
      ], debris: "dirt", debrisAt: .019, debrisSpan: 1.59, fragments: 31, space: "outdoor", color: 3650,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["grains", "stone", .13, 1.46, .28, 621, 18],
      ['clip', source, .25, .53, .37, .07, 5000],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
