import type { SoundRecipe } from '../engine/types.ts';
import { interfaceFeedback } from './_shared/interface-feedback.ts';

export default {
  id: 'settings-toggle-off', name: 'Settings Toggle Off', category: 'Footsteps & UI',
  tags: ['menu', 'toggle', 'checkbox', 'option', 'settings', 'disable', 'off', 'ui'],
  loopable: false, durationSec: 0.135, targetRmsDbfs: -31,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return interfaceFeedback(ctx, params.pressure, [
      [0, 739.99, 0.01, 0.72, 'plastic'],
      [0.019, 493.88, 0.015, 1, 'felt'],
    ]);
  },
} satisfies SoundRecipe;
