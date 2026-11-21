import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/atlas-stone.ts';
import { mix } from '../engine/dsp.ts';
import { destruction } from './_shared/destruction-effects.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-street-pressure.ts';

const original = {
  id: "close-alley-explosion-concrete-debris",
  name: "Close alley explosion concrete debris",
  category: "Impacts",
  tags: ["close", "alley", "explosion", "concrete", "debris", "blast", "boom"],
  loopable: false,
  durationSec: 2.79,
  targetRmsDbfs: -20.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = destruction(ctx, {
      cracks: [
        { at: 0, width: .018, weight: 1, bite: .92, bloom: .22 },
        { at: .22, width: .013, weight: .28, bite: .57, bloom: .16 },
      ], debris: "stone", debrisAt: .13, debrisSpan: 1.9, fragments: 24, space: "outdoor", color: 8500,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.86, .68, .002, 10000, .001, .21],
      ["grains", "stone", .22, 1.51, .36, 870, 13],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;

export default withImpactFoley(original, [
  { clip: foley0, at: 0.153, span: 0.65, gain: 0.3, cutoff: 7100, speed: 0.86 },
  { clip: foley0, at: 0.58, span: 0.24, gain: 0.12, cutoff: 3550, speed: 0.86 },
]);
