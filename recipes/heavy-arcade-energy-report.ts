import { mix } from '../engine/dsp.ts';
import { destruction } from './_shared/destruction-effects.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "heavy-arcade-energy-report",
  name: "Heavy Arcade Energy Report",
  category: "Impacts",
  tags: ["heavy", "arcade", "energy", "report"],
  loopable: false,
  durationSec: 1.19,
  targetRmsDbfs: -20,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params, seed }) {
    const bed = destruction(ctx, {
      cracks: [
        { at: 0, width: .013, weight: .91, bite: 1.14, bloom: .092 },
      ], debris: "none", debrisAt: 0, debrisSpan: 0, fragments: 0, space: "dry", color: 6150,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["tone", 0, .96, .62, 235, 43, .015, .87],
      ["brush", "air", .11, .68, .45, 1470, .034],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
