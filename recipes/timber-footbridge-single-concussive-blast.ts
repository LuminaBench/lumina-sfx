import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/clarity-field.ts';
import wash from './_recordings/wooden-crate-smash.ts';
import detail from './_recordings/milestone-smallwater.ts';

export default {
  id: "timber-footbridge-single-concussive-blast", name: "Timber footbridge — single concussive blast", category: "Impacts",
  tags: ["explosion", "blast", "destruction", "timber", "footbridge", "open", "field-foley"], loopable: false, durationSec: 1.8,
  mixRole: "impact", targetRmsDbfs: -19,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "blast", space: "open", at: [0], color: 7250, mass: 0.59, edge: 0.63, scatter: 2, panDepth: 0.44,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
