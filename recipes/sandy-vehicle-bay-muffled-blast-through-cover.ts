import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/response-air-pressure.ts';
import wash from './_recordings/shovel-dry-earth.ts';
import detail from './_recordings/natural-gravel.ts';

export default {
  id: "sandy-vehicle-bay-muffled-blast-through-cover", name: "Sandy vehicle bay — muffled blast through cover", category: "Impacts",
  tags: ["explosion", "blast", "destruction", "sandy", "vehicle", "bay", "screened", "field-foley"], loopable: false, durationSec: 1.67,
  mixRole: "impact", targetRmsDbfs: -19,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "blast", space: "screened", at: [0], color: 1335, mass: 0.749, edge: 0.63, scatter: 1, panDepth: 0.8,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
