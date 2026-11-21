import { mix } from '../engine/dsp.ts';
import { atmosphere, scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "habitat-rotating-clamp-loop",
  name: "Habitat Rotating Clamp",
  category: "Sci-Fi & UI",
  tags: ["habitat", "rotating", "clamp"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -30,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 280, edge: 1530, drift: .44, density: 5.2, material: "iron", texture: .41,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["motor", 0, 9.075, .040, 47, 49, .028, .65],
      ["motor", 0, 9.075, .015, 132, 128, .09, .37],
      ["grains", "iron", .11, 8.8, .088, 480, 49],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
