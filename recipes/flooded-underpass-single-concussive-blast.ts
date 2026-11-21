import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/response-street-pressure.ts';
import wash from './_recordings/heavy-puddle-stomp.ts';
import detail from './_recordings/atlas-drain.ts';

export default {
  id: "flooded-underpass-single-concussive-blast", name: "Flooded underpass — single concussive blast", category: "Impacts",
  tags: ["explosion", "blast", "destruction", "flooded", "underpass", "passage", "field-foley"], loopable: false, durationSec: 1.8,
  mixRole: "impact", targetRmsDbfs: -19,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "blast", space: "passage", at: [0], color: 5600, mass: 0.94, edge: 0.63, scatter: 2, panDepth: 0.44,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
