import { mix } from '../engine/dsp.ts';
import { airTransient } from './_shared/air-transients.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "supersonic-boom-heard-from-cockpit-cabin",
  name: "Supersonic boom heard from cockpit cabin",
  category: "Aircraft",
  tags: ["supersonic", "boom", "heard", "cockpit", "cabin"],
  loopable: false,
  durationSec: 1.83,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  render(ctx, { params, seed }) {
    const bed = airTransient(ctx, {
      motion: "boom", focus: 0, width: .23, whistle: 0,
      weight: .77, cutoff: 710, reflection: .24,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["contact", "glass", 0, .16, .45, 322, .002],
      ["contact", "iron", .082, .34, .41, 187, .005],
      ["grains", "iron", .44, .82, .22, 497, 9],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
