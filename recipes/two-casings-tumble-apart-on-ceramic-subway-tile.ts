import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-brass.ts';
import wash from './_recordings/ceramic-tile-footstep.ts';
import detail from './_recordings/atlas-brass.ts';

export default {
  id: "two-casings-tumble-apart-on-ceramic-subway-tile", name: "Two casings tumble apart on ceramic subway tile", category: "Weapons",
  tags: ["casing", "brass", "drop", "ceramic", "subway", "tile", "passage", "field-foley"], loopable: false, durationSec: 1.415,
  mixRole: "detail", targetRmsDbfs: -23,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "brass", space: "passage", at: [0, 0.275], color: 11200, mass: 0.55, edge: 0.64, scatter: 2, panDepth: 0.33,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
