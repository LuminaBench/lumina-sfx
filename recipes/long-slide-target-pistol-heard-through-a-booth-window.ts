import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/clarity-pistol.ts';
import wash from './_recordings/motion-workshop-slide.ts';
import detail from './_recordings/atlas-brass.ts';

export default {
  id: "long-slide-target-pistol-heard-through-a-booth-window", name: "Long slide target pistol — heard through a booth window", category: "Weapons",
  tags: ["weapon", "gunshot", "report", "long", "slide", "target", "pistol", "screened", "field-foley"], loopable: false, durationSec: 1.13,
  mixRole: "impact", targetRmsDbfs: -19,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "report", space: "screened", at: [0], color: 2376, mass: 0.36, edge: 0.71, scatter: 1, panDepth: 0.89,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
