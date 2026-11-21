import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/clarity-field.ts';
import wash from './_recordings/response-metal-pressure.ts';
import detail from './_recordings/atlas-brass.ts';

export default {
  id: "patrol-autocarbine-close-dry-report", name: "Patrol autocarbine — close dry report", category: "Weapons",
  tags: ["weapon", "gunshot", "report", "patrol", "autocarbine", "open", "field-foley"], loopable: false, durationSec: 1.13,
  mixRole: "impact", targetRmsDbfs: -19,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "report", space: "open", at: [0], color: 8500, mass: 0.51, edge: 0.71, scatter: 1, panDepth: 0.17,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
