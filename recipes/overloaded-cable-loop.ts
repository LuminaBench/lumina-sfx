import { mix } from '../engine/dsp.ts';
import { atmosphere, scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "overloaded-cable-loop",
  name: "Overloaded Cable",
  category: "Sci-Fi & UI",
  tags: ["overloaded", "cable"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -30,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 190, edge: 1585, drift: .38, density: 7.5, material: "iron", texture: .42,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["motor", 0, 9.075, .056, 52, 51, .02, .55],
      ["motor", 0, 9.075, .027, 157, 153, .08, .95],
      ["grains", "iron", .18, 8.67, .09, 2700, 29],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
