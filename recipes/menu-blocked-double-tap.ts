import type { SoundRecipe } from '../engine/types.ts';
import { interfaceFeedback } from './_shared/interface-feedback.ts';

export default {
  id: 'menu-blocked-double-tap', name: 'Menu Blocked Double Tap', category: 'Footsteps & UI',
  tags: ['menu', 'invalid', 'denied', 'disabled', 'blocked', 'ui', 'error', 'ui'],
  loopable: false, durationSec: 0.13, targetRmsDbfs: -28,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return interfaceFeedback(ctx, params.pressure, [
      [0, 342, 0.015, 1, 'wood'],
      [0.035, 326, 0.011, 0.69, 'wood'],
      [0.036, 695, 0.009, 0.24, 'plastic'],
    ]);
  },
} satisfies SoundRecipe;
