import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalGroan from './_recordings/natural-groan.ts';
import fieldJarContact from './_recordings/field-jar-contact.ts';
import naturalGrowl from './_recordings/natural-growl.ts';

export default {
  id: 'sick-breath-against-glass', name: "Sick breath against glass", category: 'Zombies & Combat',
  tags: ["creature", "zombie", "breath", "window"],
  loopable: false, durationSec: 1.572, mixRole: 'voice', targetRmsDbfs: -25,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalGroan, fieldJarContact, naturalGrowl),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [naturalGroan, 0.0, 1.08, 0.88, 0.95, 4420.0, 0, 0.001, 0.022],
      [fieldJarContact, 0.45, 0.17, 0.11, 1, 10500, 0, 0.001, 0.022],
      [naturalGrowl, 1.07, 0.42, 0.54, 1.0, 3750.0, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
