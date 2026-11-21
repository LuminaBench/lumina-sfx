import { mix } from '../engine/dsp.ts';
import { destruction } from './_shared/destruction-effects.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-metal-pressure.ts';
import source2 from './_recordings/motion-clank-close.ts';

export default {
  id: "vehicle-hull-explosion-with-loose-panels",
  name: "Vehicle hull explosion with loose panels",
  category: "Impacts",
  tags: ["vehicle", "hull", "explosion", "loose", "panels", "blast", "boom"],
  loopable: false,
  durationSec: 2.9,
  targetRmsDbfs: -20.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = destruction(ctx, {
      cracks: [
        { at: 0, width: .023, weight: 1, bite: .83, bloom: .24 },
        { at: .16, width: .013, weight: .35, bite: .65, bloom: .15 },
      ], debris: "steel", debrisAt: .095, debrisSpan: 2.5, fragments: 26, space: "outdoor", color: 9100,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.36, .78, .002, 8800, .002, .27],
      ['clip', source2, .36, .28, .60, .024, 7900, .003, .045],
      ["contact", "iron", .76, .30, .65, 279, .0017],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
