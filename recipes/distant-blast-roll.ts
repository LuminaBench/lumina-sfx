import type { SoundRecipe } from '../engine/types.ts';
import { blast } from './_shared/collisions.ts';

export default {
  id: "distant-blast-roll", name: "Distant Blast Roll", category: "Impacts",
  tags: ["explosion","distant","rumble"], loopable: false, durationSec: 2.8,
  params: { distance: { label: "Distance", min: 0, max: 1, default: 0.67 } },
  spectrum: [{ band: 'sub', minShare: 0.3 }],
  render(ctx, { params }) {
    return blast(ctx, { mass: 0.71, distance: 0.51 + params.distance * 0.43, tail: 1.82, debris: 0.03 });
  },
} satisfies SoundRecipe;
