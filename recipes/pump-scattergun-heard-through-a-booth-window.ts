import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/response-street-pressure.ts';
import wash from './_recordings/clarity-rifle.ts';
import detail from './_recordings/motion-workshop-slide.ts';

export default {
  id: "pump-scattergun-heard-through-a-booth-window", name: "Pump scattergun — heard through a booth window", category: "Weapons",
  tags: ["weapon", "gunshot", "report", "pump", "scattergun", "screened", "field-foley"], loopable: false, durationSec: 1.13,
  mixRole: "impact", targetRmsDbfs: -19,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "report", space: "screened", at: [0], color: 1971, mass: 0.88, edge: 0.71, scatter: 1, panDepth: 0.89,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
