import { mix } from '../engine/dsp.ts';
import { destruction } from './_shared/destruction-effects.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "arcade-pulse-launcher-world-space-charge-release",
  name: "Arcade pulse launcher world-space charge release",
  category: "Weapons",
  tags: ["arcade", "pulse", "launcher", "world", "space", "charge", "release", "gunshot", "weapon", "fictional"],
  loopable: false,
  durationSec: 1.63,
  targetRmsDbfs: -20,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  render(ctx, { params, seed }) {
    const bed = destruction(ctx, {
      cracks: [
        { at: .39, width: .016, weight: 1, bite: .85, bloom: .139 },
      ], debris: "none", debrisAt: .51, debrisSpan: .82, fragments: 0, space: "outdoor", color: 7500,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["contact", "iron", 0, .067, .75, 985, .001],
      ["tone", .014, .41, .18, 132, 710, .007, .72],
      ["brush", "air", .41, .94, .36, 2180, .011],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
