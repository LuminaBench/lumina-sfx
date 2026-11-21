import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/atlas-firecracker.ts';
import foley1 from './_recordings/clarity-distant.ts';
import type { SoundRecipe } from '../engine/types.ts';
import { blast } from './_shared/collisions.ts';

const original = {
  id: "distant-blast-roll", name: "Distant Blast Roll", category: "Impacts",
  tags: ["explosion","distant","rumble"], loopable: false, durationSec: 2.8,
  params: { distance: { label: "Distance", min: 0, max: 1, default: 0.67 } },
  spectrum: [{ band: 'sub', minShare: 0.3 }],
  render(ctx, { params }) {
    return blast(ctx, { mass: 0.71, distance: 0.51 + params.distance * 0.43, tail: 1.82, debris: 0.03 });
  },
} satisfies SoundRecipe;

export default withImpactFoley(original, [
  { clip: foley0, at: 0, span: 0.42, gain: 0.63, cutoff: 1300, speed: 0.77 },
  { clip: foley1, at: 0.17, span: 0.75, gain: 0.25, cutoff: 740, speed: 0.96 },
]);
