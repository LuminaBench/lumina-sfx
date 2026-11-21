import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/motion-clank-close.ts';
import wash from './_recordings/atlas-scrap.ts';
import detail from './_recordings/car-sideswipe-scrape.ts';

export default {
  id: "bent-air-duct-fragments-land-below", name: "Bent air duct — fragments land below", category: "Impacts",
  tags: ["debris", "break", "material", "bent", "air", "duct", "interior", "field-foley"], loopable: false, durationSec: 2.006,
  mixRole: "foley", targetRmsDbfs: -21,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "fracture", space: "interior", at: [0, 0.182, 0.516], color: 8460, mass: 0.76, edge: 0.55, scatter: 3, panDepth: 0.38,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
