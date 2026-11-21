import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/window-glass-shatter.ts';
import wash from './_recordings/glass-wall-collapse.ts';
import detail from './_recordings/jar-shatter-on-tile.ts';

export default {
  id: "plate-glass-partition-first-piece-gives-way", name: "Plate glass partition — first piece gives way", category: "Impacts",
  tags: ["debris", "break", "material", "plate", "glass", "partition", "open", "field-foley"], loopable: false, durationSec: 1.04,
  mixRole: "foley", targetRmsDbfs: -21,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "fracture", space: "open", at: [0], color: 10900, mass: 0.42, edge: 0.55, scatter: 1, panDepth: 0.38,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
