import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/clarity-field.ts';
import wash from './_recordings/wooden-crate-smash.ts';
import detail from './_recordings/milestone-smallwater.ts';

export default {
  id: "timber-footbridge-muffled-blast-through-cover", name: "Timber footbridge — muffled blast through cover", category: "Impacts",
  tags: ["explosion", "blast", "destruction", "timber", "footbridge", "screened", "field-foley"], loopable: false, durationSec: 1.67,
  mixRole: "impact", targetRmsDbfs: -19,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "blast", space: "screened", at: [0], color: 2175, mass: 0.614, edge: 0.63, scatter: 1, panDepth: 0.8,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
