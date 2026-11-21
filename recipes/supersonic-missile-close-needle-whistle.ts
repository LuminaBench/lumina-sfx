import { mix } from '../engine/dsp.ts';
import { airTransient } from './_shared/air-transients.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "supersonic-missile-close-needle-whistle",
  name: "Supersonic missile close needle whistle",
  category: "Missiles",
  tags: ["supersonic", "missile", "close", "needle", "whistle", "projectile", "flight", "whoosh"],
  loopable: false,
  durationSec: 0.42,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  render(ctx, { params, seed }) {
    const bed = airTransient(ctx, {
      motion: "flyby", focus: .48, width: .24, whistle: 2770,
      weight: .49, cutoff: 8900, reflection: 0,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["brush", "air", .045, .34, .24, 4580, .022],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
