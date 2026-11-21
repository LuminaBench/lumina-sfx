import { mix } from '../engine/dsp.ts';
import { atmosphere, scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "shield-power-cycling-loop",
  name: "Shield Power Cycling",
  category: "Sci-Fi & UI",
  tags: ["shield", "power", "cycling"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 380, edge: 2100, drift: .37, density: 2.1, material: "air", texture: .37,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["motor", 0, 9.075, .058, 101, 109, .105, .26],
      ["motor", 0, 9.075, .045, 175, 164, .105, .35],
      ["motor", 1.5, 2.2, .058, 303, 410, .38, .56],
      ["motor", 4.90, 2.3, .043, 330, 489, .50, .46],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
