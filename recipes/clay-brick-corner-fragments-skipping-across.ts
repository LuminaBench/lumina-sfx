import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/natural-gravel-drag.ts';
import wash from './_recordings/atlas-stone.ts';
import detail from './_recordings/loose-gravel-landing.ts';

export default {
  id: "clay-brick-corner-fragments-skipping-across", name: "Clay brick corner — fragments skipping across", category: "Weapons",
  tags: ["game-projectile", "impact", "surface", "clay", "brick", "corner", "open", "field-foley"], loopable: false, durationSec: 1.908,
  mixRole: "impact", targetRmsDbfs: -21,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "contact", space: "open", at: [0, 0.12, 0.328], color: 8100, mass: 0.64, edge: 0.67, scatter: 1, panDepth: 0.4,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
