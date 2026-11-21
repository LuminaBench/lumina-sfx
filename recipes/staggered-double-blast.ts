import type { SoundRecipe } from '../engine/types.ts';
import { layer } from '../engine/dsp.ts';
import { blast } from './_shared/collisions.ts';

export default {
  id: "staggered-double-blast", name: "Staggered Double Blast", category: "Impacts",
  tags: ["explosion","double","cascade"], loopable: false, durationSec: 2.65,
  params: { spacing: { label: "Spacing", min: 0, max: 1, default: 0.6 } },
  spectrum: [{ band: 'sub', minShare: 0.22 }],
  render(ctx, { params }) {
    const sound = blast(ctx, { mass: 0.46, distance: 0.37, tail: 1.02, debris: 0.24 });
    layer(ctx, sound, 0.29 + params.spacing * 0.59, 1.63, (tail) => blast(tail, { mass: 0.64, distance: 0.28, tail: 1.31, debris: 0.40 }), 0.85);
    return sound;
  },
} satisfies SoundRecipe;
