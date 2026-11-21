import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-brass.ts';
import wash from './_recordings/trowel-soft-soil.ts';
import detail from './_recordings/dry-sand-footstep.ts';

export default {
  id: "two-casings-tumble-apart-on-hard-packed-earth", name: "Two casings tumble apart on hard packed earth", category: "Weapons",
  tags: ["casing", "brass", "drop", "hard", "packed", "earth", "open", "field-foley"], loopable: false, durationSec: 1.344,
  mixRole: "detail", targetRmsDbfs: -23,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "brass", space: "open", at: [0, 0.204], color: 5400, mass: 0.18, edge: 0.64, scatter: 2, panDepth: 0.33,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
