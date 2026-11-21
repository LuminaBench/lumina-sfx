import { mix } from '../engine/dsp.ts';
import { arenaReport } from './_shared/arena-reports.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-button.ts';

export default {
  id: "sidearm-tight-indoor-report",
  name: "Sidearm tight indoor report",
  category: "Weapons",
  tags: ["sidearm", "tight", "indoor", "report", "gunshot", "weapon", "fictional"],
  loopable: false,
  durationSec: 0.69,
  targetRmsDbfs: -20,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = arenaReport(ctx, {
      span: .0042, body: 196, crack: 10900, edge: .99, action: .23, space: "hall",
      hits: [0],
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, .068, .08, .18, 0, 9300, .001, .023],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
