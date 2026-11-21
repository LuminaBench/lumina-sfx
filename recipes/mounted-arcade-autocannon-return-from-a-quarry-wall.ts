import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/response-metal-pressure.ts';
import wash from './_recordings/response-air-pressure.ts';
import detail from './_recordings/atlas-scrap.ts';

export default {
  id: "mounted-arcade-autocannon-return-from-a-quarry-wall", name: "Mounted arcade autocannon — return from a quarry wall", category: "Weapons",
  tags: ["weapon", "gunshot", "report", "mounted", "arcade", "autocannon", "basin", "field-foley"], loopable: false, durationSec: 1.8,
  mixRole: "impact", targetRmsDbfs: -19,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "report", space: "basin", at: [0], color: 4674, mass: 0.93, edge: 0.71, scatter: 0, panDepth: 0.73,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
