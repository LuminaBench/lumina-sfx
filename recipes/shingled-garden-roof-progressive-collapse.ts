import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-stone.ts';
import wash from './_recordings/wooden-crate-smash.ts';
import detail from './_recordings/slatted-crate-settle.ts';

export default {
  id: "shingled-garden-roof-progressive-collapse", name: "Shingled garden roof — progressive collapse", category: "Impacts",
  tags: ["debris", "break", "material", "shingled", "garden", "roof", "passage", "field-foley"], loopable: false, durationSec: 2.974,
  mixRole: "foley", targetRmsDbfs: -21,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "fracture", space: "passage", at: [0, 0.328, 1.034], color: 7400, mass: 0.56, edge: 0.55, scatter: 4, panDepth: 0.38,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
