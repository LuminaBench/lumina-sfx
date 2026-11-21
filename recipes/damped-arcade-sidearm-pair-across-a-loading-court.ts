import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/response-air-pressure.ts';
import wash from './_recordings/clarity-slide.ts';
import detail from './_recordings/atlas-brass.ts';

export default {
  id: "damped-arcade-sidearm-pair-across-a-loading-court", name: "Damped arcade sidearm — pair across a loading court", category: "Weapons",
  tags: ["weapon", "gunshot", "report", "damped", "arcade", "sidearm", "passage", "field-foley"], loopable: false, durationSec: 1.483,
  mixRole: "impact", targetRmsDbfs: -19,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "report", space: "passage", at: [0, 0.353], color: 3634, mass: 0.39, edge: 0.71, scatter: 2, panDepth: 0.47,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
