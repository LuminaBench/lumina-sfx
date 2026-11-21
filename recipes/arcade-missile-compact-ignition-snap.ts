import { mix } from '../engine/dsp.ts';
import { airTransient } from './_shared/air-transients.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-air-pressure.ts';

export default {
  id: "arcade-missile-compact-ignition-snap",
  name: "Arcade missile compact ignition snap",
  category: "Missiles",
  tags: ["arcade", "missile", "compact", "ignition", "snap", "projectile", "flight", "whoosh"],
  loopable: false,
  durationSec: 0.79,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = airTransient(ctx, {
      motion: "launch", focus: 0, width: .27, whistle: 558,
      weight: .38, cutoff: 6200, reflection: .04,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .44, .35, .003, 4100, .001, .19],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
