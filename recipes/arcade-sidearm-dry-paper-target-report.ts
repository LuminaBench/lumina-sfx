import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/clarity-pistol.ts';
import foley1 from './_recordings/seed-packet-rustle.ts';
import { mix } from '../engine/dsp.ts';
import { arenaReport } from './_shared/arena-reports.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

const original = {
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

export default withImpactFoley(original, [
  { clip: foley0, at: 0, span: 0.19, gain: 1.1, cutoff: 11300, speed: 1.01 },
  { clip: foley1, at: 0.16, span: 0.078, gain: 0.12, cutoff: 7000, speed: 1.2 },
]);
