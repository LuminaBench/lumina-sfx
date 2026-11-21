import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/response-street-pressure.ts';
import wash from './_recordings/rock-pile-impact.ts';
import detail from './_recordings/loose-gravel-landing.ts';

export default {
  id: "quarry-spoil-bank-two-stage-pressure-burst", name: "Quarry spoil bank — two-stage pressure burst", category: "Impacts",
  tags: ["explosion", "blast", "destruction", "quarry", "spoil", "bank", "basin", "field-foley"], loopable: false, durationSec: 2.366,
  mixRole: "impact", targetRmsDbfs: -19,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "blast", space: "basin", at: [0, 0.536], color: 4672, mass: 1.016, edge: 0.63, scatter: 3, panDepth: 0.44,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
