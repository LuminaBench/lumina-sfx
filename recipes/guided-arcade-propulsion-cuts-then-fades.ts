import { mix } from '../engine/dsp.ts';
import { airTransient } from './_shared/air-transients.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "guided-arcade-propulsion-cuts-then-fades",
  name: "Guided arcade propulsion cuts then fades",
  category: "Missiles",
  tags: ["guided", "arcade", "propulsion", "cuts", "fades", "projectile", "flight", "whoosh"],
  loopable: false,
  durationSec: 1.29,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  render(ctx, { params, seed }) {
    const bed = airTransient(ctx, {
      motion: "flyby", focus: .28, width: .25, whistle: 641,
      weight: .46, cutoff: 4320, reflection: 0,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["contact", "air", .59, .15, .36, 810, .004],
      ["grains", "air", .67, .45, .34, 1430, 7],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
