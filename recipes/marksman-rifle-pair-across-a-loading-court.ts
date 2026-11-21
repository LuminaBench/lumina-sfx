import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/clarity-rifle.ts';
import wash from './_recordings/clarity-distant.ts';
import detail from './_recordings/motion-workshop-slide.ts';

export default {
  id: "marksman-rifle-pair-across-a-loading-court", name: "Marksman rifle — pair across a loading court", category: "Weapons",
  tags: ["weapon", "gunshot", "report", "marksman", "rifle", "passage", "field-foley"], loopable: false, durationSec: 1.848,
  mixRole: "impact", targetRmsDbfs: -19,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "report", space: "passage", at: [0, 0.718], color: 9476, mass: 0.76, edge: 0.71, scatter: 2, panDepth: 0.47,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
