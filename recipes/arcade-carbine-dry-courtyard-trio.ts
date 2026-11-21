import { mix } from '../engine/dsp.ts';
import { arenaReport } from './_shared/arena-reports.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "arcade-carbine-dry-courtyard-trio",
  name: "Arcade carbine dry courtyard trio",
  category: "Weapons",
  tags: ["arcade", "carbine", "dry", "courtyard", "trio", "gunshot", "weapon", "fictional"],
  loopable: false,
  durationSec: 0.89,
  targetRmsDbfs: -21,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  render(ctx, { params, seed }) {
    const bed = arenaReport(ctx, {
      span: .0044, body: 180, crack: 11900, edge: .82, action: .2, space: "field",
      hits: [0, .081, .178],
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["contact", "iron", .205, .08, .11, 1380, .0009],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
