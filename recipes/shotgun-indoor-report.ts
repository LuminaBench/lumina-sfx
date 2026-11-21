import { mix } from '../engine/dsp.ts';
import { arenaReport } from './_shared/arena-reports.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-metal-pressure.ts';

export default {
  id: "shotgun-indoor-report",
  name: "Shotgun indoor report",
  category: "Weapons",
  tags: ["shotgun", "indoor", "report", "gunshot", "weapon", "fictional"],
  loopable: false,
  durationSec: 1.03,
  targetRmsDbfs: -19.8,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = arenaReport(ctx, {
      span: .0139, body: 132, crack: 12400, edge: .98, action: .27, space: "hall",
      hits: [0],
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["contact", "iron", .038, .10, .38, 383, .001],
      ['clip', source, 0, .37, .28, .001, 7330, .001, .13],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
