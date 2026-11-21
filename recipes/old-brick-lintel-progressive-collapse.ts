import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/rock-pile-impact.ts';
import wash from './_recordings/atlas-stone.ts';
import detail from './_recordings/natural-gravel.ts';

export default {
  id: "old-brick-lintel-progressive-collapse", name: "Old brick lintel — progressive collapse", category: "Impacts",
  tags: ["debris", "break", "material", "old", "brick", "lintel", "passage", "field-foley"], loopable: false, durationSec: 3.067,
  mixRole: "foley", targetRmsDbfs: -21,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "fracture", space: "passage", at: [0, 0.37, 1.127], color: 6200, mass: 0.86, edge: 0.55, scatter: 4, panDepth: 0.38,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
