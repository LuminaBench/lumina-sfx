import { mix } from '../engine/dsp.ts';
import { airTransient } from './_shared/air-transients.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
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
