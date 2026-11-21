import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/response-air-pressure.ts';
import wash from './_recordings/clarity-slide.ts';
import detail from './_recordings/atlas-brass.ts';

export default {
  id: "damped-arcade-sidearm-heard-through-a-booth-window", name: "Damped arcade sidearm — heard through a booth window", category: "Weapons",
  tags: ["weapon", "gunshot", "report", "damped", "arcade", "sidearm", "screened", "field-foley"], loopable: false, durationSec: 1.13,
  mixRole: "impact", targetRmsDbfs: -19,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "report", space: "screened", at: [0], color: 1066, mass: 0.39, edge: 0.71, scatter: 1, panDepth: 0.89,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
