import { mix } from '../engine/dsp.ts';
import { destruction } from './_shared/destruction-effects.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/car-crash-metal-glass.ts';

export default {
  id: "small-tank-like-arcade-hull-rupture",
  name: "Small Tank-like Arcade Hull Rupture",
  category: "Impacts",
  tags: ["small", "tank", "like", "arcade", "hull", "rupture"],
  loopable: false,
  durationSec: 2.1,
  targetRmsDbfs: -21,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = destruction(ctx, {
      cracks: [
        { at: 0, width: .022, weight: 1.02, bite: .60, bloom: .19 },
        { at: .127, width: .012, weight: .51, bite: 1.4, bloom: .085 },
      ], debris: "steel", debrisAt: .095, debrisSpan: 1.64, fragments: 26, space: "outdoor", color: 5700,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, .16, .88, .30, .09, 6900],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
