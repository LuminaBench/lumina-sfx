import { mix } from '../engine/dsp.ts';
import { destruction } from './_shared/destruction-effects.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-air-pressure.ts';

export default {
  id: "subway-distant-blast",
  name: "Subway distant blast",
  category: "Impacts",
  tags: ["subway", "distant", "blast"],
  loopable: false,
  durationSec: 3.9,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = destruction(ctx, {
      cracks: [
        { at: 0, width: .018, weight: 1, bite: .44, bloom: .27 },
        { at: .31, width: .023, weight: .42, bite: .3, bloom: .25 },
        { at: .88, width: .016, weight: .19, bite: .27, bloom: .23 },
      ], debris: "stone", debrisAt: .39, debrisSpan: 2.6, fragments: 11, space: "room", color: 1280,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, .071, 2.21, .37, .012, 1180, .014, .57],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
