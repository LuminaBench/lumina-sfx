import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/response-street-pressure.ts';
import wash from './_recordings/atlas-stone.ts';
import detail from './_recordings/milestone-snapwater.ts';

export default {
  id: "harbor-retaining-wall-two-stage-pressure-burst", name: "Harbor retaining wall — two-stage pressure burst", category: "Impacts",
  tags: ["explosion", "blast", "destruction", "harbor", "retaining", "wall", "basin", "field-foley"], loopable: false, durationSec: 2.337,
  mixRole: "impact", targetRmsDbfs: -19,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "blast", space: "basin", at: [0, 0.507], color: 5429, mass: 0.899, edge: 0.63, scatter: 3, panDepth: 0.44,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
