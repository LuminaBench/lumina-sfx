import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/response-street-pressure.ts';
import wash from './_recordings/atlas-stone.ts';
import detail from './_recordings/milestone-snapwater.ts';

export default {
  id: "harbor-retaining-wall-muffled-blast-through-cover", name: "Harbor retaining wall — muffled blast through cover", category: "Impacts",
  tags: ["explosion", "blast", "destruction", "harbor", "retaining", "wall", "screened", "field-foley"], loopable: false, durationSec: 1.67,
  mixRole: "impact", targetRmsDbfs: -19,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "blast", space: "screened", at: [0], color: 1830, mass: 0.874, edge: 0.63, scatter: 1, panDepth: 0.8,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
