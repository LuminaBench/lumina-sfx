import { mix } from '../engine/dsp.ts';
import { destruction } from './_shared/destruction-effects.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-street-pressure.ts';

export default {
  id: "indoor-concussion-blast",
  name: "Indoor concussion blast",
  category: "Impacts",
  tags: ["indoor", "concussion", "blast"],
  loopable: false,
  durationSec: 1.87,
  targetRmsDbfs: -20,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = destruction(ctx, {
      cracks: [
        { at: 0, width: .007, weight: 1, bite: .92, bloom: .17 },
      ], debris: "none", debrisAt: .1, debrisSpan: .72, fragments: 0, space: "room", color: 7100,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.69, .37, .003, 5900, .001, .25],
      ["contact", "iron", .08, .13, .19, 420, .004],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
