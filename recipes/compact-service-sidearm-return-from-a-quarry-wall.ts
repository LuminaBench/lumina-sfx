import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/clarity-pistol.ts';
import wash from './_recordings/clarity-slide.ts';
import detail from './_recordings/atlas-brass.ts';

export default {
  id: "compact-service-sidearm-return-from-a-quarry-wall", name: "Compact service sidearm — return from a quarry wall", category: "Weapons",
  tags: ["weapon", "gunshot", "report", "compact", "service", "sidearm", "basin", "field-foley"], loopable: false, durationSec: 1.8,
  mixRole: "impact", targetRmsDbfs: -19,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "report", space: "basin", at: [0], color: 6992, mass: 0.26, edge: 0.71, scatter: 0, panDepth: 0.73,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
