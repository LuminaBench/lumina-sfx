import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-firecracker.ts';
import wash from './_recordings/window-glass-shatter.ts';
import detail from './_recordings/jar-shatter-on-tile.ts';

export default {
  id: "greenhouse-aisle-single-concussive-blast", name: "Greenhouse aisle — single concussive blast", category: "Impacts",
  tags: ["explosion", "blast", "destruction", "greenhouse", "aisle", "interior", "field-foley"], loopable: false, durationSec: 1.8,
  mixRole: "impact", targetRmsDbfs: -19,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "blast", space: "interior", at: [0], color: 9300, mass: 0.54, edge: 0.63, scatter: 2, panDepth: 0.44,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
