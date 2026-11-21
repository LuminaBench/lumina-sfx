import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-firecracker.ts';
import wash from './_recordings/window-glass-shatter.ts';
import detail from './_recordings/jar-shatter-on-tile.ts';

export default {
  id: "greenhouse-aisle-two-stage-pressure-burst", name: "Greenhouse aisle — two-stage pressure burst", category: "Impacts",
  tags: ["explosion", "blast", "destruction", "greenhouse", "aisle", "interior", "field-foley"], loopable: false, durationSec: 2.256,
  mixRole: "impact", targetRmsDbfs: -19,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "blast", space: "interior", at: [0, 0.426], color: 8277, mass: 0.578, edge: 0.63, scatter: 3, panDepth: 0.44,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
