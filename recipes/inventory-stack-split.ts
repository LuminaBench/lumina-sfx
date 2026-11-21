import type { SoundRecipe } from '../engine/types.ts';
import { interfaceFeedback } from './_shared/interface-feedback.ts';

export default {
  id: 'inventory-stack-split', name: 'Inventory Stack Split', category: 'Footsteps & UI',
  tags: ['inventory', 'stack', 'split', 'divide', 'count', 'quantity', 'item', 'ui'],
  loopable: false, durationSec: 0.165, targetRmsDbfs: -31,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return interfaceFeedback(ctx, params.pressure, [
      [0, 561, 0.016, 0.91, 'wood'],
      [0.025, 748, 0.019, 0.77, 'wood'],
      [0.055, 606, 0.011, 0.45, 'felt'],
    ]);
  },
} satisfies SoundRecipe;
