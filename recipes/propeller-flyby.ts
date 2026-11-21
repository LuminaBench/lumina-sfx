import { mix } from '../engine/dsp.ts';
import { airTransient } from './_shared/air-transients.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-prop-pass.ts';

export default {
  id: "propeller-flyby",
  name: "Propeller flyby",
  category: "Aircraft",
  tags: ["propeller", "flyby"],
  loopable: false,
  durationSec: 3.54,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = airTransient(ctx, {
      motion: "flyby", focus: .37, width: .32, whistle: 118,
      weight: .36, cutoff: 3500, reflection: 0,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 3.54, .88, .57, 5800, .002, .40],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
