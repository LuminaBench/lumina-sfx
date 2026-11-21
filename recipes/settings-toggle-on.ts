import type { SoundRecipe } from '../engine/types.ts';
import { interfaceFeedback } from './_shared/interface-feedback.ts';

export default {
  id: 'settings-toggle-on', name: 'Settings Toggle On', category: 'Footsteps & UI',
  tags: ['menu', 'toggle', 'checkbox', 'option', 'settings', 'enable', 'on', 'ui'],
  loopable: false, durationSec: 0.14, targetRmsDbfs: -30,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return interfaceFeedback(ctx, params.pressure, [
      [0, 491, 0.009, 1, 'plastic'],
      [0.023, 739.99, 0.019, 0.88, 'ceramic'],
    ]);
  },
} satisfies SoundRecipe;
