import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/wooden-crate-smash.ts';
import wash from './_recordings/trim-scrub-branch.ts';
import detail from './_recordings/hatchet-greenwood.ts';

export default {
  id: "split-rail-fence-debris-shifted-under-load", name: "Split rail fence — debris shifted under load", category: "Impacts",
  tags: ["debris", "break", "material", "split", "rail", "fence", "screened", "field-foley"], loopable: false, durationSec: 1.8,
  mixRole: "foley", targetRmsDbfs: -21,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "fracture", space: "screened", at: [0, 0.43], color: 5066, mass: 0.5, edge: 0.55, scatter: 2, panDepth: 0.38,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
