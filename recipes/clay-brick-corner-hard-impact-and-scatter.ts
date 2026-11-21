import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/loose-gravel-landing.ts';
import wash from './_recordings/atlas-stone.ts';
import detail from './_recordings/natural-gravel-drag.ts';

export default {
  id: "clay-brick-corner-hard-impact-and-scatter", name: "Clay brick corner — hard impact and scatter", category: "Weapons",
  tags: ["game-projectile", "impact", "surface", "clay", "brick", "corner", "open", "field-foley"], loopable: false, durationSec: 1.58,
  mixRole: "impact", targetRmsDbfs: -21,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "contact", space: "open", at: [0], color: 8100, mass: 0.64, edge: 0.67, scatter: 5, panDepth: 0.4,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
