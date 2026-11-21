import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import dryVineBrush from './_recordings/dry-vine-brush.ts';
import fieldLeafTear from './_recordings/field-leaf-tear.ts';
import naturalGroan from './_recordings/natural-groan.ts';

export default {
  id: 'walker-pulls-free-of-brush', name: "Walker pulls free of brush", category: 'Zombies & Combat',
  tags: ["zombie", "creature", "snag", "leaves", "groan"],
  loopable: false, durationSec: 1.991, mixRole: 'voice', targetRmsDbfs: -25,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(dryVineBrush, fieldLeafTear, naturalGroan),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [dryVineBrush, 0.0, 0.52, 0.34, 1, 10500, 0, 0.001, 0.022],
      [fieldLeafTear, 0.28, 0.39, 0.42, 1, 10500, 0, 0.001, 0.022],
      [naturalGroan, 0.38, 1.42, 0.93, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.073, 0.141], send: 0.13, dampingHz: 2100 });
  },
} satisfies SoundRecipe;
