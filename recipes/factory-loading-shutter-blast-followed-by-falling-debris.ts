import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/response-metal-pressure.ts';
import wash from './_recordings/atlas-scrap.ts';
import detail from './_recordings/motion-chain-scrape.ts';

export default {
  id: "factory-loading-shutter-blast-followed-by-falling-debris", name: "Factory loading shutter — blast followed by falling debris", category: "Impacts",
  tags: ["explosion", "blast", "destruction", "factory", "loading", "shutter", "passage", "field-foley"], loopable: false, durationSec: 2.47,
  mixRole: "impact", targetRmsDbfs: -19,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "blast", space: "passage", at: [0], color: 8295, mass: 0.686, edge: 0.63, scatter: 7, panDepth: 0.44,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
