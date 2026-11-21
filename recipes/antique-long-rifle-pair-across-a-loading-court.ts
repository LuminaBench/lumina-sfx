import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-firecracker.ts';
import wash from './_recordings/clarity-distant.ts';
import detail from './_recordings/wood-platform-landing.ts';

export default {
  id: "antique-long-rifle-pair-across-a-loading-court", name: "Antique long rifle — pair across a loading court", category: "Weapons",
  tags: ["weapon", "gunshot", "report", "antique", "long", "rifle", "passage", "field-foley"], loopable: false, durationSec: 1.939,
  mixRole: "impact", targetRmsDbfs: -19,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "report", space: "passage", at: [0, 0.809], color: 6624, mass: 0.82, edge: 0.71, scatter: 2, panDepth: 0.47,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
