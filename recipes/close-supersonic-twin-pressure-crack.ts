import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/atlas-firecracker.ts';
import foley1 from './_recordings/clarity-field.ts';
import { mix } from '../engine/dsp.ts';
import { airTransient } from './_shared/air-transients.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

const original = {
  id: "close-supersonic-twin-pressure-crack",
  name: "Close supersonic twin pressure crack",
  category: "Aircraft",
  tags: ["close", "supersonic", "twin", "pressure", "crack"],
  loopable: false,
  durationSec: 1.31,
  targetRmsDbfs: -21,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  render(ctx, { params, seed }) {
    const bed = airTransient(ctx, {
      motion: "boom", focus: 0, width: .19, whistle: 0,
      weight: .94, cutoff: 7600, reflection: .043,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["contact", "air", .038, .16, .27, 520, .005],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;

export default withImpactFoley(original, [
  { clip: foley0, at: 0, span: 0.095, gain: 0.97, cutoff: 10400, speed: 0.77 },
  { clip: foley1, at: 0.093, span: 0.18, gain: 0.71, cutoff: 6300, speed: 0.91 },
]);
