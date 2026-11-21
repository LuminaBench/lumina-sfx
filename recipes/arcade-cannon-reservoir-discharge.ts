import { mix } from '../engine/dsp.ts';
import { destruction } from './_shared/destruction-effects.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "arcade-cannon-reservoir-discharge",
  name: "Arcade Cannon Reservoir Discharge",
  category: "Impacts",
  tags: ["arcade", "cannon", "reservoir", "discharge"],
  loopable: false,
  durationSec: 1.64,
  targetRmsDbfs: -20,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params, seed }) {
    const bed = destruction(ctx, {
      cracks: [
        { at: 0, width: .017, weight: .59, bite: .5, bloom: .11 },
        { at: .081, width: .027, weight: .83, bite: .82, bloom: .17 },
      ], debris: "none", debrisAt: 0, debrisSpan: 0, fragments: 0, space: "room", color: 4300,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["tone", .085, 1.34, .40, 193, 49, .045, 1.11],
      ["brush", "air", .235, 1.11, .56, 799, .08],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
