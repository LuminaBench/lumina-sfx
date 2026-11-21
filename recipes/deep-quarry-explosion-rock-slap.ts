import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/atlas-stone.ts';
import foley1 from './_recordings/clarity-distant.ts';
import { mix } from '../engine/dsp.ts';
import { destruction } from './_shared/destruction-effects.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-street-pressure.ts';

const original = {
  id: "deep-quarry-explosion-rock-slap",
  name: "Deep quarry explosion rock slap",
  category: "Impacts",
  tags: ["deep", "quarry", "explosion", "rock", "slap", "blast", "boom"],
  loopable: false,
  durationSec: 3.84,
  targetRmsDbfs: -22.8,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = destruction(ctx, {
      cracks: [
        { at: 0, width: .024, weight: 1, bite: .51, bloom: .31 },
        { at: .49, width: .026, weight: .37, bite: .44, bloom: .23 },
        { at: 1.03, width: .017, weight: .17, bite: .32, bloom: .27 },
      ], debris: "stone", debrisAt: .29, debrisSpan: 2.7, fragments: 23, space: "outdoor", color: 3220,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.77, .34, .015, 2680, .001, .36],
      ["contact", "stone", 1.25, .19, .30, 470, .005],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;

export default withImpactFoley(original, [
  { clip: foley0, at: 0.27, span: 0.65, gain: 0.26, cutoff: 7100, speed: 0.86 },
  { clip: foley1, at: 0.45, span: 0.75, gain: 0.19, cutoff: 1850, speed: 0.96 },
]);
