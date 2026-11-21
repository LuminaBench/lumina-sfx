import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/milestone-ice.ts';
import wash from './_recordings/milestone-snapwater.ts';
import detail from './_recordings/milestone-smallwater.ts';

export default {
  id: "frozen-shallow-pool-glancing-projectile-hit", name: "Frozen shallow pool — glancing projectile hit", category: "Weapons",
  tags: ["game-projectile", "impact", "surface", "frozen", "shallow", "pool", "open", "field-foley"], loopable: false, durationSec: 1.58,
  mixRole: "impact", targetRmsDbfs: -21,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "contact", space: "open", at: [0], color: 8600, mass: 0.49, edge: 0.67, scatter: 2, panDepth: 0.4,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
