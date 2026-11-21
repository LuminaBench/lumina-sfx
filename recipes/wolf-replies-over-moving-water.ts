import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldBrookBed from './_recordings/field-brook-bed.ts';
import naturalWolf from './_recordings/natural-wolf.ts';

export default {
  id: 'wolf-replies-over-moving-water', name: "Wolf replies over moving water", category: 'Animals',
  tags: ["wolf", "howl", "creek", "stream"],
  loopable: false, durationSec: 3.962, mixRole: 'voice', targetRmsDbfs: -27,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldBrookBed, naturalWolf),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [fieldBrookBed, 0.0, 3.81, 0.2, 1.0, 4100.0, 2.0, 0.001, 0.022],
      [naturalWolf, 0.27, 3.05, 0.87, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
