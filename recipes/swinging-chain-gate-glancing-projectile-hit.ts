import type { SoundRecipe } from '../engine/types.ts';
import { cinematicCut } from './_shared/cinematic-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/motion-chain-link.ts';
import wash from './_recordings/motion-clank-close.ts';
import detail from './_recordings/motion-chain-scrape.ts';

export default {
  id: "swinging-chain-gate-glancing-projectile-hit", name: "Swinging chain gate — glancing projectile hit", category: "Weapons",
  tags: ["game-projectile", "impact", "surface", "swinging", "chain", "gate", "passage", "field-foley"], loopable: false, durationSec: 1.58,
  mixRole: "impact", targetRmsDbfs: -21,
  params: { force: { label: "Force", min: 0, max: 1, default: 0.58 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return cinematicCut(ctx, seed, params.force, {
      kind: "contact", space: "passage", at: [0], color: 11400, mass: 0.46, edge: 0.67, scatter: 2, panDepth: 0.4,
    }, source, wash, detail);
  },
} satisfies SoundRecipe;
