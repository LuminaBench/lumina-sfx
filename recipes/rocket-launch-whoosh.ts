import { mix } from '../engine/dsp.ts';
import { airTransient } from './_shared/air-transients.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-turbine-ignition.ts';

export default {
  id: "rocket-launch-whoosh",
  name: "Rocket launch whoosh",
  category: "Missiles",
  tags: ["rocket", "launch", "whoosh", "projectile", "flight"],
  loopable: false,
  durationSec: 2.48,
  targetRmsDbfs: -21.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = airTransient(ctx, {
      motion: "launch", focus: 0, width: .31, whistle: 94,
      weight: .89, cutoff: 3640, reflection: .25,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.31, .38, .09, 5800, .001, .61],
      ["contact", "iron", 0, .087, .38, 579, .0007],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
