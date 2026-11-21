import { mix } from '../engine/dsp.ts';
import { arenaReport } from './_shared/arena-reports.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-metal-pressure.ts';

export default {
  id: "arcade-mounted-report-through-a-stairwell",
  name: "Arcade mounted report through a stairwell",
  category: "Weapons",
  tags: ["arcade", "mounted", "report", "stairwell", "gunshot", "weapon", "fictional"],
  loopable: false,
  durationSec: 1.53,
  targetRmsDbfs: -23.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = arenaReport(ctx, {
      span: .020, body: 86, crack: 7150, edge: .57, action: .11, space: "hall",
      hits: [0],
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.39, .35, .013, 2210, .001, .27],
      ["contact", "iron", .22, .21, .4, 305, .006],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
