import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/rock-pile-impact.ts';
import wash from './_recordings/atlas-stone.ts';
import detail from './_recordings/milestone-snapwater.ts';

export default {
  id: "concrete-fountain-rim-fragments-skipping-across", name: "Concrete fountain rim — fragments skipping across", category: "Weapons",
  tags: ["game-projectile", "impact", "surface", "concrete", "fountain", "rim", "open", "field-foley"], loopable: false, durationSec: 1.907,
  mixRole: "impact", targetRmsDbfs: -21,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "contact", space: "open", at: [0, 0.12, 0.327], color: 8400, mass: 0.63, edge: 0.67, scatter: 1, panDepth: 0.4,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
