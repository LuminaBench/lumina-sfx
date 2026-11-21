import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/clarity-rifle.ts';
import { mix } from '../engine/dsp.ts';
import { arenaReport } from './_shared/arena-reports.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

const original = {
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

export default withImpactFoley(original, [
  { clip: foley0, at: 0, span: 0.12, gain: 1, cutoff: 10800, speed: 0.98 },
  { clip: foley0, at: 0.081, span: 0.12, gain: 0.9, cutoff: 10800, speed: 0.98 },
  { clip: foley0, at: 0.178, span: 0.12, gain: 1.1, cutoff: 10800, speed: 0.98 },
]);
