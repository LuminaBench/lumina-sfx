import { mix } from '../engine/dsp.ts';
import { airTransient } from './_shared/air-transients.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "supersonic-missile-canyon-edge-pass",
  name: "Supersonic missile canyon edge pass",
  category: "Missiles",
  tags: ["supersonic", "missile", "canyon", "edge", "pass", "projectile", "flight", "whoosh"],
  loopable: false,
  durationSec: 1.46,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  render(ctx, { params, seed }) {
    const bed = airTransient(ctx, {
      motion: "flyby", focus: .32, width: .24, whistle: 1030,
      weight: .57, cutoff: 4090, reflection: 0,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["brush", "air", .31, .71, .26, 1280, .033],
      ["contact", "stone", .43, .165, .29, 691, .008],
      ["contact", "air", .72, .19, .28, 615, .03],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
