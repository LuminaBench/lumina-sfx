import { mix } from '../engine/dsp.ts';
import { arenaReport } from './_shared/arena-reports.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-air-pressure.ts';

export default {
  id: "pneumatic-launcher-practice-report",
  name: "Pneumatic launcher practice report",
  category: "Weapons",
  tags: ["pneumatic", "launcher", "practice", "report", "gunshot", "weapon", "fictional"],
  loopable: false,
  durationSec: 0.6,
  targetRmsDbfs: -24.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = arenaReport(ctx, {
      span: .0038, body: 201, crack: 9600, edge: .83, action: .20, space: "close",
      hits: [0],
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .50, .39, .024, 5100, .001, .15],
      ["brush", "air", .02, .50, .57, 2580, .011],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
