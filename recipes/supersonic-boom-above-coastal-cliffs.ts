import { mix } from '../engine/dsp.ts';
import { airTransient } from './_shared/air-transients.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "supersonic-boom-above-coastal-cliffs",
  name: "Supersonic boom above coastal cliffs",
  category: "Aircraft",
  tags: ["supersonic", "boom", "above", "coastal", "cliffs"],
  loopable: false,
  durationSec: 2.84,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  render(ctx, { params, seed }) {
    const bed = airTransient(ctx, {
      motion: "boom", focus: 0, width: .255, whistle: 0,
      weight: .89, cutoff: 4100, reflection: .58,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["contact", "stone", .26, .24, .32, 171, .004],
      ["contact", "air", .52, .22, .26, 580, .008],
      ["contact", "air", 1.10, .32, .14, 474, .015],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
