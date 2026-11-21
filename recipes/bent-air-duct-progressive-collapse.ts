import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/car-sideswipe-scrape.ts';
import wash from './_recordings/atlas-scrap.ts';
import detail from './_recordings/motion-clank-close.ts';

export default {
  id: "bent-air-duct-progressive-collapse", name: "Bent air duct — progressive collapse", category: "Impacts",
  tags: ["debris", "break", "material", "bent", "air", "duct", "passage", "field-foley"], loopable: false, durationSec: 3.036,
  mixRole: "foley", targetRmsDbfs: -21,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "fracture", space: "passage", at: [0, 0.356, 1.096], color: 8460, mass: 0.76, edge: 0.55, scatter: 4, panDepth: 0.38,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
