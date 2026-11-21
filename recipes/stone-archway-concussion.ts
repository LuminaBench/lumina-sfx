import { mix } from '../engine/dsp.ts';
import { destruction } from './_shared/destruction-effects.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "stone-archway-concussion",
  name: "Stone Archway Concussion",
  category: "Impacts",
  tags: ["stone", "archway", "concussion"],
  loopable: false,
  durationSec: 2.05,
  targetRmsDbfs: -20,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params, seed }) {
    const bed = destruction(ctx, {
      cracks: [
        { at: 0, width: .015, weight: .89, bite: .67, bloom: .105 },
        { at: .082, width: .009, weight: .60, bite: .61, bloom: .087 },
        { at: .215, width: .013, weight: .43, bite: .41, bloom: .11 },
      ], debris: "stone", debrisAt: .115, debrisSpan: 1.66, fragments: 25, space: "room", color: 5300,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["contact", "stone", .055, .28, .43, 510, .001],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
