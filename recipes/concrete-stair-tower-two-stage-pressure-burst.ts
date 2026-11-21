import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/response-air-pressure.ts';
import wash from './_recordings/atlas-stone.ts';
import detail from './_recordings/rock-pile-impact.ts';

export default {
  id: "concrete-stair-tower-two-stage-pressure-burst", name: "Concrete stair tower — two-stage pressure burst", category: "Impacts",
  tags: ["explosion", "blast", "destruction", "concrete", "stair", "tower", "passage", "field-foley"], loopable: false, durationSec: 2.307,
  mixRole: "impact", targetRmsDbfs: -19,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "blast", space: "passage", at: [0, 0.477], color: 6052, mass: 0.781, edge: 0.63, scatter: 3, panDepth: 0.44,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
