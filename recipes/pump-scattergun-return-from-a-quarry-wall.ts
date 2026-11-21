import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/response-street-pressure.ts';
import wash from './_recordings/clarity-rifle.ts';
import detail from './_recordings/motion-workshop-slide.ts';

export default {
  id: "pump-scattergun-return-from-a-quarry-wall", name: "Pump scattergun — return from a quarry wall", category: "Weapons",
  tags: ["weapon", "gunshot", "report", "pump", "scattergun", "basin", "field-foley"], loopable: false, durationSec: 1.8,
  mixRole: "impact", targetRmsDbfs: -19,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "report", space: "basin", at: [0], color: 5548, mass: 0.88, edge: 0.71, scatter: 0, panDepth: 0.73,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
