import { mix } from '../engine/dsp.ts';
import { arenaReport } from './_shared/arena-reports.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-street-pressure.ts';

export default {
  id: "arcade-rifle-gravel-pit-single-report",
  name: "Arcade rifle gravel pit single report",
  category: "Weapons",
  tags: ["arcade", "rifle", "gravel", "pit", "single", "report", "gunshot", "weapon", "fictional"],
  loopable: false,
  durationSec: 0.94,
  targetRmsDbfs: -21,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = arenaReport(ctx, {
      span: .0078, body: 144, crack: 11600, edge: .93, action: .29, space: "canyon",
      hits: [0],
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .79, .31, .002, 6500, .001, .20],
      ["contact", "iron", .022, .078, .15, 1050, .001],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
