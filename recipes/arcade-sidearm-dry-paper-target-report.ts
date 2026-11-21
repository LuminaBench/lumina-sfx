import { mix } from '../engine/dsp.ts';
import { arenaReport } from './_shared/arena-reports.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "arcade-sidearm-dry-paper-target-report",
  name: "Arcade sidearm dry paper target report",
  category: "Weapons",
  tags: ["arcade", "sidearm", "dry", "paper", "target", "report", "gunshot", "weapon", "fictional"],
  loopable: false,
  durationSec: 0.44,
  targetRmsDbfs: -21,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  render(ctx, { params, seed }) {
    const bed = arenaReport(ctx, {
      span: .0025, body: 228, crack: 13100, edge: 1.14, action: .18, space: "close",
      hits: [0],
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["contact", "paper", .055, .092, .15, 1110, .0008],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
