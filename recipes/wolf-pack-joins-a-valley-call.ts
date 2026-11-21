import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalWolf from './_recordings/natural-wolf.ts';

export default {
  id: 'wolf-pack-joins-a-valley-call', name: "Wolf pack joins a valley call", category: 'Animals',
  tags: ["wolf", "howl", "chorus", "pack"],
  loopable: false, durationSec: 4.211, mixRole: 'voice', targetRmsDbfs: -24,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalWolf),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [naturalWolf, 0.0, 2.55, 0.87, 1, 10500, 0, 0.001, 0.022],
      [naturalWolf, 1.64, 2.38, 0.44, 1.012, 4600.0, 0, 0.001, 0.022],
    ], { taps: [0.073, 0.141], send: 0.13, dampingHz: 2100 });
  },
} satisfies SoundRecipe;
