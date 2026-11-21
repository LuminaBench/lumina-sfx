import { mix } from '../engine/dsp.ts';
import { destruction } from './_shared/destruction-effects.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "single-blast-through-a-cave-mouth",
  name: "Single Blast through a Cave Mouth",
  category: "Impacts",
  tags: ["single", "blast", "cave", "mouth"],
  loopable: false,
  durationSec: 2.53,
  targetRmsDbfs: -21,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params, seed }) {
    const bed = destruction(ctx, {
      cracks: [
        { at: 0, width: .019, weight: .89, bite: .72, bloom: .18 },
        { at: .21, width: .027, weight: .59, bite: .43, bloom: .14 },
        { at: .60, width: .024, weight: .38, bite: .34, bloom: .18 },
      ], debris: "stone", debrisAt: .244, debrisSpan: 1.79, fragments: 21, space: "room", color: 4100,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["contact", "stone", .19, .41, .35, 290, .008],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
