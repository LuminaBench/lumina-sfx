import type { SoundRecipe } from '../engine/types.ts';
import { interfaceFeedback } from './_shared/interface-feedback.ts';

export default {
  id: 'coin-pickup-chime', name: 'Coin Pickup Chime', category: 'Footsteps & UI',
  tags: ['coin', 'currency', 'collect', 'gold', 'hud', 'pickup', 'reward', 'ui'],
  loopable: false, durationSec: 0.208, targetRmsDbfs: -27,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return interfaceFeedback(ctx, params.pressure, [
      [0, 988, 0.018, 0.73, 'metal'],
      [0.023, 1318.51, 0.024, 0.95, 'metal'],
      [0.053, 1567.98, 0.026, 0.47, 'string'],
    ]);
  },
} satisfies SoundRecipe;
