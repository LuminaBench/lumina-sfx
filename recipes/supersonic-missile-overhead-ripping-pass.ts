import { mix } from '../engine/dsp.ts';
import { airTransient } from './_shared/air-transients.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "supersonic-missile-overhead-ripping-pass",
  name: "Supersonic missile overhead ripping pass",
  category: "Missiles",
  tags: ["supersonic", "missile", "overhead", "ripping", "pass", "projectile", "flight", "whoosh"],
  loopable: false,
  durationSec: 0.81,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  render(ctx, { params, seed }) {
    const bed = airTransient(ctx, {
      motion: "flyby", focus: .45, width: .245, whistle: 1280,
      weight: .64, cutoff: 9900, reflection: 0,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["brush", "air", .18, .55, .66, 2700, .017],
      ["contact", "air", .38, .13, .27, 1430, .003],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
