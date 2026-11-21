import { mix } from '../engine/dsp.ts';
import { arenaReport } from './_shared/arena-reports.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-rocker.ts';

export default {
  id: "arcade-scattergun-exterior-short-barrel",
  name: "Arcade scattergun exterior short barrel",
  category: "Weapons",
  tags: ["arcade", "scattergun", "exterior", "short", "barrel", "gunshot", "weapon", "fictional"],
  loopable: false,
  durationSec: 0.74,
  targetRmsDbfs: -21,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = arenaReport(ctx, {
      span: .0090, body: 151, crack: 10800, edge: 1.15, action: .23, space: "field",
      hits: [0],
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, .093, .095, .32, 0, 6790, .001, .02],
      ["brush", "air", .044, .50, .38, 2070, .006],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
