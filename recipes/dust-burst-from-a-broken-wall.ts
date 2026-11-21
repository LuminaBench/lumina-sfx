import { mix } from '../engine/dsp.ts';
import { destruction } from './_shared/destruction-effects.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "dust-burst-from-a-broken-wall",
  name: "Dust Burst from a Broken Wall",
  category: "Impacts",
  tags: ["dust", "burst", "broken", "wall"],
  loopable: false,
  durationSec: 1.71,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params, seed }) {
    const bed = destruction(ctx, {
      cracks: [
        { at: 0, width: .024, weight: .63, bite: .37, bloom: .113 },
        { at: .236, width: .021, weight: .25, bite: .22, bloom: .107 },
      ], debris: "dirt", debrisAt: .179, debrisSpan: 1.45, fragments: 25, space: "outdoor", color: 2630,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["brush", "soil", .13, 1.43, .46, 560, .13],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
