import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/clarity-distant.ts';
import foley1 from './_recordings/atlas-firecracker.ts';
import { mix } from '../engine/dsp.ts';
import { airTransient } from './_shared/air-transients.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

const original = {
  id: "distant-supersonic-boom-across-open-country",
  name: "Distant supersonic boom across open country",
  category: "Aircraft",
  tags: ["distant", "supersonic", "boom", "across", "open", "country"],
  loopable: false,
  durationSec: 2.73,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  render(ctx, { params, seed }) {
    const bed = airTransient(ctx, {
      motion: "boom", focus: 0, width: .27, whistle: 0,
      weight: .80, cutoff: 1330, reflection: .68,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["brush", "air", .28, 2.29, .22, 410, .11],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;

export default withImpactFoley(original, [
  { clip: foley0, at: 0, span: 0.75, gain: 0.69, cutoff: 1160, speed: 0.96 },
  { clip: foley1, at: 0.1, span: 0.39, gain: 0.31, cutoff: 1480, speed: 0.77 },
]);
