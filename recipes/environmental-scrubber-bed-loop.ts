import { mix } from '../engine/dsp.ts';
import { atmosphere, scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "environmental-scrubber-bed-loop",
  name: "Environmental Scrubber Bed",
  category: "Sci-Fi & UI",
  tags: ["environmental", "scrubber", "bed"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -30,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 235, edge: 1950, drift: .19, density: 2.8, material: "air", texture: .35,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["motor", 0, 9.075, .038, 59, 59, .045, .82],
      ["motor", 0, 9.075, .024, 118, 121, .02, .65],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
