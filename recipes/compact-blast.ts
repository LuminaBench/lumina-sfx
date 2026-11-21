import type { SoundRecipe } from '../engine/types.ts';
import { blast } from './_shared/collisions.ts';

export default {
  id: "compact-blast", name: "Compact Blast", category: "Impacts",
  tags: ["explosion","blast","compact"], loopable: false, durationSec: 1.15,
  params: { weight: { label: "Weight", min: 0, max: 1, default: 0.62 } },
  spectrum: [{ band: 'sub', minShare: 0.2 }],
  render(ctx, { params }) {
    return blast(ctx, { mass: 0.24 + params.weight * 0.20, distance: 0.10, tail: 0.58, debris: 0.15 });
  },
} satisfies SoundRecipe;
