import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/response-metal-pressure.ts';
import wash from './_recordings/atlas-scrap.ts';
import detail from './_recordings/motion-chain-link.ts';

export default {
  id: "derelict-boxcar-two-stage-pressure-burst", name: "Derelict boxcar — two-stage pressure burst", category: "Impacts",
  tags: ["explosion", "blast", "destruction", "derelict", "boxcar", "interior", "field-foley"], loopable: false, durationSec: 2.334,
  mixRole: "impact", targetRmsDbfs: -19,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "blast", space: "interior", at: [0, 0.504], color: 6008, mass: 0.888, edge: 0.63, scatter: 3, panDepth: 0.44,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
