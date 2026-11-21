import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/milestone-blade.ts';
import wash from './_recordings/motion-clank-close.ts';
import detail from './_recordings/atlas-scrap.ts';

export default {
  id: "steel-tunnel-liner-fragments-skipping-across", name: "Steel tunnel liner — fragments skipping across", category: "Weapons",
  tags: ["game-projectile", "impact", "surface", "steel", "tunnel", "liner", "passage", "field-foley"], loopable: false, durationSec: 1.899,
  mixRole: "impact", targetRmsDbfs: -21,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "contact", space: "passage", at: [0, 0.12, 0.319], color: 11500, mass: 0.54, edge: 0.67, scatter: 1, panDepth: 0.4,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
