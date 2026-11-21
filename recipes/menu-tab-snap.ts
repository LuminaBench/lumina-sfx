import type { SoundRecipe } from '../engine/types.ts';
import { interfaceFeedback } from './_shared/interface-feedback.ts';

export default {
  id: 'menu-tab-snap', name: 'Menu Tab Snap', category: 'Footsteps & UI',
  tags: ['menu', 'tab', 'page', 'navigation', 'switch', 'select', 'ui'],
  loopable: false, durationSec: 0.105, targetRmsDbfs: -30,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return interfaceFeedback(ctx, params.pressure, [
      [0, 932, 0.007, 0.67, 'plastic'],
      [0.018, 555, 0.016, 0.84, 'wood'],
    ]);
  },
} satisfies SoundRecipe;
