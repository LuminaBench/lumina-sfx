import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/glass-wall-collapse.ts';
import wash from './_recordings/jar-shatter-on-tile.ts';
import detail from './_recordings/window-glass-shatter.ts';

export default {
  id: "plate-glass-partition-debris-shifted-under-load", name: "Plate glass partition — debris shifted under load", category: "Impacts",
  tags: ["debris", "break", "material", "plate", "glass", "partition", "screened", "field-foley"], loopable: false, durationSec: 1.8,
  mixRole: "foley", targetRmsDbfs: -21,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "fracture", space: "screened", at: [0, 0.43], color: 7412, mass: 0.42, edge: 0.55, scatter: 2, panDepth: 0.38,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
