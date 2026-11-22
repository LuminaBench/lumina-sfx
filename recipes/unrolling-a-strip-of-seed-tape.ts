import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/book-page-turn.ts';
import source2 from './_recordings/seed-packet-rustle.ts';

export default {
  id: "unrolling-a-strip-of-seed-tape",
  name: "Unrolling a Strip of Seed Tape",
  category: "Farming",
  tags: ["unrolling", "strip", "seed", "tape", "farm"],
  loopable: false,
  durationSec: 0.7,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .35, .63, .032, 10900],
      ['clip', source2, .17, .47, .56, .09, 7800],
      ["brush", "cloth", .33, .22, .19, 910, .039],
    ]);
  },
} satisfies SoundRecipe;
