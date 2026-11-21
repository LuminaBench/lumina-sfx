import { mix } from '../engine/dsp.ts';
import { destruction } from './_shared/destruction-effects.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-air-pressure.ts';

export default {
  id: "wooden-shed-explosion-splinter-fall",
  name: "Wooden shed explosion splinter fall",
  category: "Impacts",
  tags: ["wooden", "shed", "explosion", "splinter", "fall", "blast", "boom"],
  loopable: false,
  durationSec: 2.58,
  targetRmsDbfs: -21.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = destruction(ctx, {
      cracks: [
        { at: 0, width: .020, weight: 1, bite: .72, bloom: .20 },
        { at: .081, width: .012, weight: .31, bite: .65, bloom: .14 },
      ], debris: "wood", debrisAt: .09, debrisSpan: 1.96, fragments: 28, space: "outdoor", color: 5350,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.17, .43, .009, 6300, .001, .39],
      ["grains", "wood", .48, 1.7, .65, 693, 17],
      ["contact", "wood", .82, .26, .54, 193, .004],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
