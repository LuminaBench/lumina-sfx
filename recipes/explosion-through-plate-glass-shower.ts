import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/atlas-glass.ts';
import { mix } from '../engine/dsp.ts';
import { destruction } from './_shared/destruction-effects.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/window-glass-shatter.ts';

const original = {
  id: "explosion-through-plate-glass-shower",
  name: "Explosion through plate glass shower",
  category: "Impacts",
  tags: ["explosion", "plate", "glass", "shower", "blast", "boom"],
  loopable: false,
  durationSec: 2.35,
  targetRmsDbfs: -20.7,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = destruction(ctx, {
      cracks: [
        { at: 0, width: .011, weight: 1, bite: .86, bloom: .22 },
      ], debris: "glass", debrisAt: .080, debrisSpan: 1.86, fragments: 29, space: "room", color: 9600,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, .067, 1.92, .71, .020, 11500, .002, .29],
      ["contact", "glass", .19, .12, .48, 2570, .001],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;

export default withImpactFoley(original, [
  { clip: foley0, at: 0.11, span: 0.59, gain: 0.33, cutoff: 10400, speed: 1.03 },
  { clip: foley0, at: 0.49, span: 0.59, gain: 0.17, cutoff: 7400, speed: 1.03 },
]);
