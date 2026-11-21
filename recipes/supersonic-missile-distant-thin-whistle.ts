import { mix } from '../engine/dsp.ts';
import { airTransient } from './_shared/air-transients.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "supersonic-missile-distant-thin-whistle",
  name: "Supersonic missile distant thin whistle",
  category: "Missiles",
  tags: ["supersonic", "missile", "distant", "thin", "whistle", "projectile", "flight", "whoosh"],
  loopable: false,
  durationSec: 0.89,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  render(ctx, { params, seed }) {
    const bed = airTransient(ctx, {
      motion: "flyby", focus: .39, width: .34, whistle: 1450,
      weight: .18, cutoff: 3150, reflection: 0,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["tone", .11, .61, .035, 1530, 604, .042, .32],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
