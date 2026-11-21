import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/spade-wet-mud.ts';
import wash from './_recordings/wet-crop-brush.ts';
import detail from './_recordings/milestone-smallwater.ts';

export default {
  id: "mud-bank-glancing-projectile-hit", name: "Mud bank — glancing projectile hit", category: "Weapons",
  tags: ["game-projectile", "impact", "surface", "mud", "bank", "open", "field-foley"], loopable: false, durationSec: 1.58,
  mixRole: "impact", targetRmsDbfs: -21,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "contact", space: "open", at: [0], color: 5600, mass: 0.49, edge: 0.67, scatter: 2, panDepth: 0.4,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
