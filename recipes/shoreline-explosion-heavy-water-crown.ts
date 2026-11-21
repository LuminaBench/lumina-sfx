import { mix } from '../engine/dsp.ts';
import { destruction } from './_shared/destruction-effects.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-snapwater.ts';
import source2 from './_recordings/milestone-smallwater.ts';

export default {
  id: "shoreline-explosion-heavy-water-crown",
  name: "Shoreline explosion heavy water crown",
  category: "Impacts",
  tags: ["shoreline", "explosion", "heavy", "water", "crown", "blast", "boom"],
  loopable: false,
  durationSec: 3.75,
  targetRmsDbfs: -22,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = destruction(ctx, {
      cracks: [
        { at: 0, width: .027, weight: 1, bite: .49, bloom: .35 },
        { at: .17, width: .021, weight: .29, bite: .37, bloom: .18 },
      ], debris: "water", debrisAt: .12, debrisSpan: 2.78, fragments: 22, space: "outdoor", color: 5650,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, .11, 1.43, .68, .05, 6500, .003, .35],
      ['clip', source2, .40, 3.28, .48, .27, 5700, .19, .38],
      ["brush", "water", .24, 2.77, .68, 427, .055],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
