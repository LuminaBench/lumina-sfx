import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldNightCrickets from './_recordings/field-night-crickets.ts';
import paddockGateSwing from './_recordings/paddock-gate-swing.ts';

export default {
  id: 'crickets-under-the-garden-gate', name: "Crickets under the garden gate", category: 'Animals',
  tags: ["crickets", "insect", "garden", "gate"],
  loopable: false, durationSec: 3.092, mixRole: 'voice', targetRmsDbfs: -30,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldNightCrickets, paddockGateSwing),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [fieldNightCrickets, 0.0, 2.94, 0.91, 1.0, 10000.0, 4.0, 0.001, 0.022],
      [paddockGateSwing, 0.78, 0.75, 0.23, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
