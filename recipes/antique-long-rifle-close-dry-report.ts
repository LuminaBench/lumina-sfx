import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-firecracker.ts';
import wash from './_recordings/clarity-distant.ts';
import detail from './_recordings/wood-platform-landing.ts';

export default {
  id: "antique-long-rifle-close-dry-report", name: "Antique long rifle — close dry report", category: "Weapons",
  tags: ["weapon", "gunshot", "report", "antique", "long", "rifle", "open", "field-foley"], loopable: false, durationSec: 1.13,
  mixRole: "impact", targetRmsDbfs: -19,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "report", space: "open", at: [0], color: 7200, mass: 0.82, edge: 0.71, scatter: 1, panDepth: 0.17,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
