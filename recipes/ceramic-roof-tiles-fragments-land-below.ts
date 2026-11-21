import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-stone.ts';
import wash from './_recordings/jar-shatter-on-tile.ts';
import detail from './_recordings/ceramic-tile-footstep.ts';

export default {
  id: "ceramic-roof-tiles-fragments-land-below", name: "Ceramic roof tiles — fragments land below", category: "Impacts",
  tags: ["debris", "break", "material", "ceramic", "roof", "tiles", "interior", "field-foley"], loopable: false, durationSec: 2.006,
  mixRole: "foley", targetRmsDbfs: -21,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "fracture", space: "interior", at: [0, 0.182, 0.516], color: 9600, mass: 0.48, edge: 0.55, scatter: 3, panDepth: 0.38,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
