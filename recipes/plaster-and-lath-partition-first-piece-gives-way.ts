import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-stone.ts';
import wash from './_recordings/dry-branch-snap.ts';
import detail from './_recordings/dry-sand-footstep.ts';

export default {
  id: "plaster-and-lath-partition-first-piece-gives-way", name: "Plaster and lath partition — first piece gives way", category: "Impacts",
  tags: ["debris", "break", "material", "plaster", "and", "lath", "partition", "open", "field-foley"], loopable: false, durationSec: 1.04,
  mixRole: "foley", targetRmsDbfs: -21,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "fracture", space: "open", at: [0], color: 6800, mass: 0.47, edge: 0.55, scatter: 1, panDepth: 0.38,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
