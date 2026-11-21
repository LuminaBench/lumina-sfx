import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-brass.ts';
import wash from './_recordings/leather-strap-flex.ts';
import detail from './_recordings/jacket-movement-rustle.ts';

export default {
  id: "two-casings-tumble-apart-on-cabin-rubber-mat", name: "Two casings tumble apart on cabin rubber mat", category: "Weapons",
  tags: ["casing", "brass", "drop", "cabin", "rubber", "mat", "screened", "field-foley"], loopable: false, durationSec: 1.34,
  mixRole: "detail", targetRmsDbfs: -23,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "brass", space: "screened", at: [0, 0.2], color: 4900, mass: 0.16, edge: 0.64, scatter: 2, panDepth: 0.33,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
