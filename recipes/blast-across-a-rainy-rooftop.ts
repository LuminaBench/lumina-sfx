import { mix } from '../engine/dsp.ts';
import { destruction } from './_shared/destruction-effects.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/watering-garden-soak.ts';

export default {
  id: "blast-across-a-rainy-rooftop",
  name: "Blast across a Rainy Rooftop",
  category: "Impacts",
  tags: ["blast", "across", "rainy", "rooftop"],
  loopable: false,
  durationSec: 2.14,
  targetRmsDbfs: -22,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = destruction(ctx, {
      cracks: [
        { at: 0, width: .015, weight: .95, bite: .68, bloom: .139 },
        { at: .097, width: .019, weight: .54, bite: .51, bloom: .18 },
      ], debris: "water", debrisAt: .15, debrisSpan: 1.63, fragments: 35, space: "outdoor", color: 5700,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, .24, 1.65, .23, 0, 9000],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
