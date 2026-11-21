import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/atlas-firecracker.ts';
import foley1 from './_recordings/atlas-scrap.ts';
import type { SoundRecipe } from '../engine/types.ts';
import { blast } from './_shared/collisions.ts';

const original = {
  id: "deep-industrial-blast", name: "Deep Industrial Blast", category: "Impacts",
  tags: ["explosion","blast","heavy","debris"], loopable: false, durationSec: 3.1,
  params: { debris: { label: "Debris", min: 0, max: 1, default: 0.55 } },
  spectrum: [{ band: 'sub', minShare: 0.25 }],
  render(ctx, { params }) {
    return blast(ctx, { mass: 0.89, distance: 0.17, tail: 2.08, debris: 0.35 + params.debris * 0.54 });
  },
} satisfies SoundRecipe;

export default withImpactFoley(original, [
  { clip: foley0, at: 0, span: 0.42, gain: 0.63, cutoff: 7900, speed: 0.77 },
  { clip: foley1, at: 0.26, span: 0.62, gain: 0.25, cutoff: 6700, speed: 0.85 },
]);
