import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalWolf from './_recordings/natural-wolf.ts';
import fieldLeafBed from './_recordings/field-leaf-bed.ts';

export default {
  id: 'wolf-howl-behind-the-treeline', name: "Wolf howl behind the treeline", category: 'Animals',
  tags: ["wolf", "howl", "distance", "forest"],
  loopable: false, durationSec: 3.131, mixRole: 'voice', targetRmsDbfs: -27,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalWolf, fieldLeafBed),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [naturalWolf, 0.0, 2.84, 0.96, 0.995, 4550.0, 0, 0.001, 0.022],
      [fieldLeafBed, 0.0, 2.94, 0.06, 1.0, 3600.0, 1.0, 0.001, 0.022],
    ], { taps: [0.073, 0.141], send: 0.13, dampingHz: 2100 });
  },
} satisfies SoundRecipe;
