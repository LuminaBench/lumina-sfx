import { mix } from '../engine/dsp.ts';
import { destruction } from './_shared/destruction-effects.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-metal-pressure.ts';
import source2 from './_recordings/response-air-pressure.ts';

export default {
  id: "hangar-secondary-explosions-spaced-chain",
  name: "Hangar secondary explosions spaced chain",
  category: "Impacts",
  tags: ["hangar", "secondary", "explosions", "spaced", "chain"],
  loopable: false,
  durationSec: 4.12,
  targetRmsDbfs: -21,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = destruction(ctx, {
      cracks: [
        { at: 0, width: .022, weight: 1, bite: .81, bloom: .29 },
        { at: .52, width: .023, weight: .59, bite: .7, bloom: .23 },
        { at: 1.23, width: .032, weight: .36, bite: .42, bloom: .23 },
      ], debris: "steel", debrisAt: .15, debrisSpan: 3.65, fragments: 33, space: "room", color: 6500,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.23, .58, .003, 5800, .002, .33],
      ['clip', source2, .58, 2.34, .36, .004, 3300, .015, .45],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
