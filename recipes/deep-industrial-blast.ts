import type { SoundRecipe } from '../engine/types.ts';
import { blast } from './_shared/collisions.ts';

export default {
  id: "deep-industrial-blast", name: "Deep Industrial Blast", category: "Impacts",
  tags: ["explosion","blast","heavy","debris"], loopable: false, durationSec: 3.1,
  params: { debris: { label: "Debris", min: 0, max: 1, default: 0.55 } },
  spectrum: [{ band: 'sub', minShare: 0.25 }],
  render(ctx, { params }) {
    return blast(ctx, { mass: 0.89, distance: 0.17, tail: 2.08, debris: 0.35 + params.debris * 0.54 });
  },
} satisfies SoundRecipe;
