import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-stone.ts';
import wash from './_recordings/rock-pile-impact.ts';
import detail from './_recordings/natural-gravel.ts';

export default {
  id: "stone-cairn-progressive-collapse", name: "Stone cairn — progressive collapse", category: "Impacts",
  tags: ["debris", "break", "material", "stone", "cairn", "passage", "field-foley"], loopable: false, durationSec: 2.998,
  mixRole: "foley", targetRmsDbfs: -21,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "fracture", space: "passage", at: [0, 0.34, 1.058], color: 7150, mass: 0.64, edge: 0.55, scatter: 4, panDepth: 0.38,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
