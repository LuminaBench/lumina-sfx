import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/atlas-firecracker.ts';
import foley1 from './_recordings/atlas-scrap.ts';
import { mix } from '../engine/dsp.ts';
import { destruction } from './_shared/destruction-effects.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

const original = {
  id: "blast-behind-a-heavy-steel-bulkhead",
  name: "Blast behind a Heavy Steel Bulkhead",
  category: "Impacts",
  tags: ["blast", "heavy", "steel", "bulkhead"],
  loopable: false,
  durationSec: 2.07,
  targetRmsDbfs: -22,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params, seed }) {
    const bed = destruction(ctx, {
      cracks: [
        { at: 0, width: .030, weight: 1.08, bite: .25, bloom: .151 },
        { at: .085, width: .017, weight: .55, bite: .38, bloom: .107 },
      ], debris: "steel", debrisAt: .18, debrisSpan: 1.26, fragments: 13, space: "dry", color: 1270,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["contact", "iron", .10, .86, .19, 220, .006],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;

export default withImpactFoley(original, [
  { clip: foley0, at: 0, span: 0.32, gain: 0.81, cutoff: 880, speed: 0.77 },
  { clip: foley1, at: 0.043, span: 0.62, gain: 0.47, cutoff: 1530, speed: 0.85 },
]);
