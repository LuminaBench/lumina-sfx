import { renderRecording } from '../engine/recording.ts';
import recording from './_recordings/clarity-distant.ts';
import { mix } from '../engine/dsp.ts';
import { arenaReport } from './_shared/arena-reports.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "rifle-distant-report",
  name: "Rifle distant report",
  category: "Weapons",
  tags: ["rifle", "distant", "report", "gunshot", "weapon", "fictional"],
  loopable: false,
  durationSec: 1.31,
  targetRmsDbfs: -26,
  recording: recording.credit,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  render(ctx, { params, seed }) {
    const bed = arenaReport(ctx, {
      span: .0067, body: 126, crack: 6400, edge: .63, action: .04, space: "overlook",
      hits: [0],
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["brush", "air", .18, .89, .39, 585, .026],
    ]);
    mix(bed, detail);
    const take = renderRecording(ctx, recording, {
      seed, speed: 0.96 + ctx.random() * 0.045, cutoffHz: 780 + params.intensity * 730,
    });
    mix(bed, take, 1.65);
    return bed;
  },
} satisfies SoundRecipe;
