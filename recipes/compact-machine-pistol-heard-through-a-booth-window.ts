import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/clarity-pistol.ts';
import wash from './_recordings/atlas-firecracker.ts';
import detail from './_recordings/clarity-slide.ts';

export default {
  id: "compact-machine-pistol-heard-through-a-booth-window", name: "Compact machine pistol — heard through a booth window", category: "Weapons",
  tags: ["weapon", "gunshot", "report", "compact", "machine", "pistol", "screened", "field-foley"], loopable: false, durationSec: 1.13,
  mixRole: "impact", targetRmsDbfs: -19,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "report", space: "screened", at: [0], color: 2511, mass: 0.31, edge: 0.71, scatter: 1, panDepth: 0.89,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
