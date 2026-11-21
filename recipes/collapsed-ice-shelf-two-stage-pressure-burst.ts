import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/response-air-pressure.ts';
import wash from './_recordings/milestone-ice.ts';
import detail from './_recordings/milestone-snapwater.ts';

export default {
  id: "collapsed-ice-shelf-two-stage-pressure-burst", name: "Collapsed ice shelf — two-stage pressure burst", category: "Impacts",
  tags: ["explosion", "blast", "destruction", "collapsed", "ice", "shelf", "open", "field-foley"], loopable: false, durationSec: 2.334,
  mixRole: "impact", targetRmsDbfs: -19,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "blast", space: "open", at: [0, 0.504], color: 7298, mass: 0.888, edge: 0.63, scatter: 3, panDepth: 0.44,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
