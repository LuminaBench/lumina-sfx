import type { SoundRecipe } from '../engine/types.ts';
import { interfaceFeedback } from './_shared/interface-feedback.ts';

export default {
  id: 'inventory-item-lift', name: 'Inventory Item Lift', category: 'Footsteps & UI',
  tags: ['inventory', 'pick', 'up', 'lift', 'drag', 'bag', 'item', 'ui'],
  loopable: false, durationSec: 0.154, targetRmsDbfs: -31,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return interfaceFeedback(ctx, params.pressure, [
      [0, 494, 0.014, 0.72, 'felt', -0.12],
      [0.017, 652, 0.022, 1, 'string', -0.07],
    ]);
  },
} satisfies SoundRecipe;
