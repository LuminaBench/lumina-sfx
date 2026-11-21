import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/wooden-crate-smash.ts';
import wash from './_recordings/dry-branch-snap.ts';
import detail from './_recordings/atlas-fire.ts';

export default {
  id: "charred-wood-trestle-progressive-collapse", name: "Charred wood trestle — progressive collapse", category: "Impacts",
  tags: ["debris", "break", "material", "charred", "wood", "trestle", "passage", "field-foley"], loopable: false, durationSec: 2.952,
  mixRole: "foley", targetRmsDbfs: -21,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "fracture", space: "passage", at: [0, 0.319, 1.012], color: 6200, mass: 0.49, edge: 0.55, scatter: 4, panDepth: 0.38,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
