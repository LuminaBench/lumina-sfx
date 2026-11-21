import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-scrap.ts';
import wash from './_recordings/motion-chain-link.ts';
import detail from './_recordings/steel-drawer-shut.ts';

export default {
  id: "steel-shelving-unit-first-piece-gives-way", name: "Steel shelving unit — first piece gives way", category: "Impacts",
  tags: ["debris", "break", "material", "steel", "shelving", "unit", "open", "field-foley"], loopable: false, durationSec: 1.04,
  mixRole: "foley", targetRmsDbfs: -21,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "fracture", space: "open", at: [0], color: 8250, mass: 0.73, edge: 0.55, scatter: 1, panDepth: 0.38,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
