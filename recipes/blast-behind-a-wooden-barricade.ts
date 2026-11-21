import { mix } from '../engine/dsp.ts';
import { destruction } from './_shared/destruction-effects.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/wooden-crate-smash.ts';

export default {
  id: "blast-behind-a-wooden-barricade",
  name: "Blast Behind a Wooden Barricade",
  category: "Impacts",
  tags: ["blast", "wooden", "barricade"],
  loopable: false,
  durationSec: 1.64,
  targetRmsDbfs: -21,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = destruction(ctx, {
      cracks: [
        { at: 0, width: .021, weight: .88, bite: .47, bloom: .137 },
        { at: .126, width: .010, weight: .46, bite: .52, bloom: .103 },
      ], debris: "wood", debrisAt: .081, debrisSpan: 1.2, fragments: 19, space: "outdoor", color: 2360,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, .11, .71, .47, .09, 4900],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
