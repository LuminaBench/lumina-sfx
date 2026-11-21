import { mix } from '../engine/dsp.ts';
import { arenaReport } from './_shared/arena-reports.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "arcade-scattergun-distant-yard-echo",
  name: "Arcade scattergun distant yard echo",
  category: "Weapons",
  tags: ["arcade", "scattergun", "distant", "yard", "echo", "gunshot", "weapon", "fictional"],
  loopable: false,
  durationSec: 1.31,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  render(ctx, { params, seed }) {
    const bed = arenaReport(ctx, {
      span: .022, body: 94, crack: 6200, edge: .41, action: .04, space: "overlook",
      hits: [0],
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["brush", "air", .22, .71, .15, 560, .035],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
