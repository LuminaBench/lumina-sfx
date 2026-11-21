import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/response-street-pressure.ts';
import wash from './_recordings/motion-clank-close.ts';
import detail from './_recordings/atlas-scrap.ts';

export default {
  id: "spaceport-cargo-cage-two-stage-pressure-burst", name: "Spaceport cargo cage — two-stage pressure burst", category: "Impacts",
  tags: ["explosion", "blast", "destruction", "spaceport", "cargo", "cage", "passage", "field-foley"], loopable: false, durationSec: 2.345,
  mixRole: "impact", targetRmsDbfs: -19,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "blast", space: "passage", at: [0, 0.515], color: 7654, mass: 0.931, edge: 0.63, scatter: 3, panDepth: 0.44,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
