import { mix } from '../engine/dsp.ts';
import { destruction } from './_shared/destruction-effects.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-street-pressure.ts';

export default {
  id: "flash-charge-explosion-empty-corridor",
  name: "Flash charge explosion empty corridor",
  category: "Impacts",
  tags: ["flash", "charge", "explosion", "empty", "corridor", "blast", "boom"],
  loopable: false,
  durationSec: 1.62,
  targetRmsDbfs: -22,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = destruction(ctx, {
      cracks: [
        { at: 0, width: .007, weight: 1, bite: 1.29, bloom: .135 },
        { at: .057, width: .006, weight: .31, bite: .77, bloom: .09 },
      ], debris: "none", debrisAt: .09, debrisSpan: .73, fragments: 0, space: "room", color: 11000,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.46, .70, .001, 10600, .001, .27],
      ["contact", "air", .09, .14, .21, 770, .003],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
