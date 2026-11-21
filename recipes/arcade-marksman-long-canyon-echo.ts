import { mix } from '../engine/dsp.ts';
import { arenaReport } from './_shared/arena-reports.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "arcade-marksman-long-canyon-echo",
  name: "Arcade marksman long canyon echo",
  category: "Weapons",
  tags: ["arcade", "marksman", "long", "canyon", "echo", "gunshot", "weapon", "fictional"],
  loopable: false,
  durationSec: 1.89,
  targetRmsDbfs: -23.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  render(ctx, { params, seed }) {
    const bed = arenaReport(ctx, {
      span: .0095, body: 131, crack: 9200, edge: .81, action: .12, space: "canyon",
      hits: [0],
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["brush", "air", .49, 1.20, .13, 540, .081],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
