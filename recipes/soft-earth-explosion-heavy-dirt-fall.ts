import { mix } from '../engine/dsp.ts';
import { destruction } from './_shared/destruction-effects.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-air-pressure.ts';

export default {
  id: "soft-earth-explosion-heavy-dirt-fall",
  name: "Soft earth explosion heavy dirt fall",
  category: "Impacts",
  tags: ["soft", "earth", "explosion", "heavy", "dirt", "fall", "blast", "boom"],
  loopable: false,
  durationSec: 3.07,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = destruction(ctx, {
      cracks: [
        { at: 0, width: .029, weight: 1, bite: .61, bloom: .26 },
        { at: .22, width: .018, weight: .44, bite: .48, bloom: .16 },
      ], debris: "dirt", debrisAt: .13, debrisSpan: 2.29, fragments: 35, space: "outdoor", color: 3500,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.27, .55, .006, 3500, .002, .42],
      ["grains", "soil", .30, 2.04, .74, 445, 31],
      ["contact", "soil", .96, .16, .39, 247, .006],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
