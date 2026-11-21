import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/wooden-crate-smash.ts';
import wash from './_recordings/hatchet-greenwood.ts';
import detail from './_recordings/trim-scrub-branch.ts';

export default {
  id: "split-rail-fence-progressive-collapse", name: "Split rail fence — progressive collapse", category: "Impacts",
  tags: ["debris", "break", "material", "split", "rail", "fence", "passage", "field-foley"], loopable: false, durationSec: 2.955,
  mixRole: "foley", targetRmsDbfs: -21,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "fracture", space: "passage", at: [0, 0.32, 1.015], color: 7450, mass: 0.5, edge: 0.55, scatter: 4, panDepth: 0.38,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
