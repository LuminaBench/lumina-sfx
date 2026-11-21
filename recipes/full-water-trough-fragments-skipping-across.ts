import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/milestone-smallwater.ts';
import wash from './_recordings/milestone-snapwater.ts';
import detail from './_recordings/milestone-paddlehit.ts';

export default {
  id: "full-water-trough-fragments-skipping-across", name: "Full water trough — fragments skipping across", category: "Weapons",
  tags: ["game-projectile", "impact", "surface", "full", "water", "trough", "open", "field-foley"], loopable: false, durationSec: 1.909,
  mixRole: "impact", targetRmsDbfs: -21,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "contact", space: "open", at: [0, 0.12, 0.329], color: 7150, mass: 0.65, edge: 0.67, scatter: 1, panDepth: 0.4,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
