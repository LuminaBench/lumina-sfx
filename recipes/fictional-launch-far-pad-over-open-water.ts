import { mix } from '../engine/dsp.ts';
import { airTransient } from './_shared/air-transients.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-air-pressure.ts';

export default {
  id: "fictional-launch-far-pad-over-open-water",
  name: "Fictional launch far pad over open water",
  category: "Missiles",
  tags: ["fictional", "launch", "far", "pad", "open", "water", "projectile", "flight", "whoosh"],
  loopable: false,
  durationSec: 3.4,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = airTransient(ctx, {
      motion: "launch", focus: 0, width: .34, whistle: 0,
      weight: .65, cutoff: 1520, reflection: .52,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.26, .25, .077, 1810, .008, .54],
      ["brush", "water", .77, 2.45, .23, 607, .21],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
