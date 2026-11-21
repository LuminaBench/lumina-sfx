import { mix } from '../engine/dsp.ts';
import { arenaReport } from './_shared/arena-reports.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-air-pressure.ts';

export default {
  id: "antique-powder-report",
  name: "Antique powder report",
  category: "Weapons",
  tags: ["antique", "powder", "report", "gunshot", "weapon", "fictional"],
  loopable: false,
  durationSec: 1.68,
  targetRmsDbfs: -22,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = arenaReport(ctx, {
      span: .027, body: 114, crack: 4390, edge: .52, action: .07, space: "field",
      hits: [0],
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.57, .57, .006, 4200, .001, .39],
      ["brush", "air", .08, 1.02, .45, 1490, .017],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
