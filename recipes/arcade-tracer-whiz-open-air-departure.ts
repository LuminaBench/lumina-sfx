import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/clarity-pistol.ts';
import wash from './_recordings/light-blade-swish.ts';
import detail from './_recordings/demo-flag-rush.ts';

export default {
  id: "arcade-tracer-whiz-open-air-departure", name: "Arcade tracer whiz — open air departure", category: "Missiles",
  tags: ["flyby", "cinematic", "flight", "arcade", "tracer", "whiz", "open", "field-foley"], loopable: false, durationSec: 1.94,
  mixRole: "impact", targetRmsDbfs: -21,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "pass", trajectory: "departure", space: "open", at: [0], color: 10300, mass: 0.27, edge: 0.65, scatter: 1, panDepth: 0.58,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
