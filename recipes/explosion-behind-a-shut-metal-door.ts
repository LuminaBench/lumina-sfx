import { mix } from '../engine/dsp.ts';
import { destruction } from './_shared/destruction-effects.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-metal-pressure.ts';

export default {
  id: "explosion-behind-a-shut-metal-door",
  name: "Explosion behind a shut metal door",
  category: "Impacts",
  tags: ["explosion", "shut", "door", "blast", "boom"],
  loopable: false,
  durationSec: 2.12,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = destruction(ctx, {
      cracks: [
        { at: 0, width: .026, weight: 1, bite: .54, bloom: .24 },
        { at: .14, width: .012, weight: .23, bite: .46, bloom: .15 },
      ], debris: "steel", debrisAt: .22, debrisSpan: 1.37, fragments: 12, space: "room", color: 1420,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.37, .44, .002, 1780, .001, .29],
      ["contact", "iron", .096, .38, .68, 233, .003],
      ["contact", "iron", .365, .20, .41, 399, .007],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
