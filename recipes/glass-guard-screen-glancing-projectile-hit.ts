import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/window-glass-shatter.ts';
import wash from './_recordings/field-glass-lid.ts';
import detail from './_recordings/jar-shatter-on-tile.ts';

export default {
  id: "glass-guard-screen-glancing-projectile-hit", name: "Glass guard screen — glancing projectile hit", category: "Weapons",
  tags: ["game-projectile", "impact", "surface", "glass", "guard", "screen", "interior", "field-foley"], loopable: false, durationSec: 1.58,
  mixRole: "impact", targetRmsDbfs: -21,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "contact", space: "interior", at: [0], color: 9900, mass: 0.41, edge: 0.67, scatter: 2, panDepth: 0.4,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
