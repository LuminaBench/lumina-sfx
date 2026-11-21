import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/response-metal-pressure.ts';
import wash from './_recordings/car-crash-metal-glass.ts';
import detail from './_recordings/window-glass-shatter.ts';

export default {
  id: "burned-out-car-hull-blast-followed-by-falling-debris", name: "Burned out car hull — blast followed by falling debris", category: "Impacts",
  tags: ["explosion", "blast", "destruction", "burned", "out", "car", "hull", "open", "field-foley"], loopable: false, durationSec: 2.47,
  mixRole: "impact", targetRmsDbfs: -19,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "blast", space: "open", at: [0], color: 7665, mass: 0.669, edge: 0.63, scatter: 7, panDepth: 0.44,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
