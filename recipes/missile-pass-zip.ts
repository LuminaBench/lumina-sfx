import { mix } from '../engine/dsp.ts';
import { airTransient } from './_shared/air-transients.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "missile-pass-zip",
  name: "Missile pass zip",
  category: "Missiles",
  tags: ["missile", "pass", "zip", "projectile", "flight", "whoosh"],
  loopable: false,
  durationSec: 0.52,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  render(ctx, { params, seed }) {
    const bed = airTransient(ctx, {
      motion: "flyby", focus: .44, width: .255, whistle: 1890,
      weight: .58, cutoff: 6800, reflection: 0,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["brush", "air", .05, .42, .21, 3190, .028],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
