import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/glass-wall-collapse.ts';
import wash from './_recordings/window-glass-shatter.ts';
import detail from './_recordings/jar-shatter-on-tile.ts';

export default {
  id: "plate-glass-partition-progressive-collapse", name: "Plate glass partition — progressive collapse", category: "Impacts",
  tags: ["debris", "break", "material", "plate", "glass", "partition", "passage", "field-foley"], loopable: false, durationSec: 2.93,
  mixRole: "foley", targetRmsDbfs: -21,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "fracture", space: "passage", at: [0, 0.309, 0.99], color: 10900, mass: 0.42, edge: 0.55, scatter: 4, panDepth: 0.38,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
