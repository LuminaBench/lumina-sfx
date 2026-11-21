import type { SoundRecipe } from '../engine/types.ts';
import { interfaceFeedback } from './_shared/interface-feedback.ts';

export default {
  id: 'inventory-item-place', name: 'Inventory Item Place', category: 'Footsteps & UI',
  tags: ['inventory', 'place', 'drop', 'release', 'item', 'slot', 'bag', 'ui'],
  loopable: false, durationSec: 0.141, targetRmsDbfs: -30,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return interfaceFeedback(ctx, params.pressure, [
      [0, 455, 0.016, 0.94, 'wood'],
      [0.02, 291, 0.02, 0.87, 'felt'],
    ]);
  },
} satisfies SoundRecipe;
