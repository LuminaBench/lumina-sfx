import type { SoundRecipe } from '../engine/types.ts';
import { interfaceFeedback } from './_shared/interface-feedback.ts';

export default {
  id: 'menu-cancel-release', name: 'Menu Cancel Release', category: 'Footsteps & UI',
  tags: ['menu', 'close', 'exit', 'cancel', 'back', 'release', 'ui'],
  loopable: false, durationSec: 0.16, targetRmsDbfs: -30,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return interfaceFeedback(ctx, params.pressure, [
      [0, 692, 0.015, 0.58, 'felt'],
      [0.027, 447, 0.022, 1, 'felt', 0.14],
    ]);
  },
} satisfies SoundRecipe;
