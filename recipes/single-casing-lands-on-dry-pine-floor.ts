import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-brass.ts';
import wash from './_recordings/wood-platform-landing.ts';
import detail from './_recordings/slatted-crate-settle.ts';

export default {
  id: "single-casing-lands-on-dry-pine-floor", name: "Single casing lands on dry pine floor", category: "Weapons",
  tags: ["casing", "brass", "drop", "dry", "pine", "floor", "interior", "field-foley"], loopable: false, durationSec: 1.14,
  mixRole: "detail", targetRmsDbfs: -23,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "brass", space: "interior", at: [0], color: 7350, mass: 0.4, edge: 0.64, scatter: 3, panDepth: 0.33,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
