import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/atlas-firecracker.ts';
import type { SoundRecipe } from '../engine/types.ts';
import { blast } from './_shared/collisions.ts';

const original = {
  id: "compact-blast", name: "Compact Blast", category: "Impacts",
  tags: ["explosion","blast","compact"], loopable: false, durationSec: 1.15,
  params: { weight: { label: "Weight", min: 0, max: 1, default: 0.62 } },
  spectrum: [{ band: 'sub', minShare: 0.2 }],
  render(ctx, { params }) {
    return blast(ctx, { mass: 0.24 + params.weight * 0.20, distance: 0.10, tail: 0.58, debris: 0.15 });
  },
} satisfies SoundRecipe;

export default withImpactFoley(original, [
  { clip: foley0, at: 0, span: 0.24, gain: 0.77, cutoff: 7900, speed: 0.77 },
]);
