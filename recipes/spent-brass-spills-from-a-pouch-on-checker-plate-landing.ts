import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-brass.ts';
import wash from './_recordings/motion-clank-close.ts';
import detail from './_recordings/atlas-brass.ts';

export default {
  id: "spent-brass-spills-from-a-pouch-on-checker-plate-landing", name: "Spent brass spills from a pouch on checker plate landing", category: "Weapons",
  tags: ["casing", "brass", "drop", "checker", "plate", "landing", "passage", "field-foley"], loopable: false, durationSec: 1.63,
  mixRole: "detail", targetRmsDbfs: -23,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "brass", space: "passage", at: [0, 0.086, 0.177, 0.321, 0.49], color: 10500, mass: 0.57, edge: 0.64, scatter: 2, panDepth: 0.33,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
