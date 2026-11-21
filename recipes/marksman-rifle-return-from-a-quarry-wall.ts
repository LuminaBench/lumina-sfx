import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/clarity-rifle.ts';
import wash from './_recordings/clarity-distant.ts';
import detail from './_recordings/motion-workshop-slide.ts';

export default {
  id: "marksman-rifle-return-from-a-quarry-wall", name: "Marksman rifle — return from a quarry wall", category: "Weapons",
  tags: ["weapon", "gunshot", "report", "marksman", "rifle", "basin", "field-foley"], loopable: false, durationSec: 1.8,
  mixRole: "impact", targetRmsDbfs: -19,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "report", space: "basin", at: [0], color: 7828, mass: 0.76, edge: 0.71, scatter: 0, panDepth: 0.73,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
