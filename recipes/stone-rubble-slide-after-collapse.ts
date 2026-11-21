import { mix } from '../engine/dsp.ts';
import { destruction } from './_shared/destruction-effects.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/rock-pile-impact.ts';
import source2 from './_recordings/mixed-rubble-footstep.ts';

export default {
  id: "stone-rubble-slide-after-collapse",
  name: "Stone Rubble Slide after Collapse",
  category: "Impacts",
  tags: ["stone", "rubble", "slide", "collapse"],
  loopable: false,
  durationSec: 1.91,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = destruction(ctx, {
      cracks: [
        { at: 0, width: .031, weight: .52, bite: .39, bloom: .11 },
        { at: .24, width: .021, weight: .30, bite: .23, bloom: .15 },
      ], debris: "stone", debrisAt: .03, debrisSpan: 1.72, fragments: 38, space: "dry", color: 3900,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .77, .68, .052, 7800],
      ['clip', source2, .55, .77, .40, .10, 7150],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
