import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/dry-branch-snap.ts';
import wash from './_recordings/wooden-crate-smash.ts';
import detail from './_recordings/slatted-crate-settle.ts';

export default {
  id: "loose-timber-shutter-fragments-skipping-across", name: "Loose timber shutter — fragments skipping across", category: "Weapons",
  tags: ["game-projectile", "impact", "surface", "loose", "timber", "shutter", "interior", "field-foley"], loopable: false, durationSec: 1.894,
  mixRole: "impact", targetRmsDbfs: -21,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "contact", space: "interior", at: [0, 0.12, 0.314], color: 7600, mass: 0.49, edge: 0.67, scatter: 1, panDepth: 0.4,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
