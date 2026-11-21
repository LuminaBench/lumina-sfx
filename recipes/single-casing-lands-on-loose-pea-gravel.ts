import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-brass.ts';
import wash from './_recordings/natural-gravel.ts';
import detail from './_recordings/loose-gravel-landing.ts';

export default {
  id: "single-casing-lands-on-loose-pea-gravel", name: "Single casing lands on loose pea gravel", category: "Weapons",
  tags: ["casing", "brass", "drop", "loose", "pea", "gravel", "open", "field-foley"], loopable: false, durationSec: 1.14,
  mixRole: "detail", targetRmsDbfs: -23,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "brass", space: "open", at: [0], color: 6300, mass: 0.22, edge: 0.64, scatter: 1, panDepth: 0.33,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
