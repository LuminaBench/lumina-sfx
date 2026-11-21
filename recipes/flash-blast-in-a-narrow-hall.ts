import { destruction } from './_shared/destruction-effects.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "flash-blast-in-a-narrow-hall",
  name: "Flash Blast in a Narrow Hall",
  category: "Impacts",
  tags: ["flash", "blast", "narrow", "hall"],
  loopable: false,
  durationSec: 1.41,
  targetRmsDbfs: -21,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    const bed = destruction(ctx, {
      cracks: [
        { at: 0, width: .005, weight: .52, bite: 1.35, bloom: .055 },
        { at: .051, width: .006, weight: .51, bite: 1.04, bloom: .055 },
        { at: .128, width: .008, weight: .37, bite: .74, bloom: .098 },
      ], debris: "glass", debrisAt: .092, debrisSpan: .81, fragments: 12, space: "room", color: 8550,
    }, params.intensity);
    return bed;
  },
} satisfies SoundRecipe;
