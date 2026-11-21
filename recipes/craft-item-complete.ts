import type { SoundRecipe } from '../engine/types.ts';
import { interfaceFeedback } from './_shared/interface-feedback.ts';

export default {
  id: 'craft-item-complete', name: 'Craft Item Complete', category: 'Footsteps & UI',
  tags: ['crafting', 'craft', 'progress', 'complete', 'recipe', 'production', 'result', 'ui'],
  loopable: false, durationSec: 0.393, targetRmsDbfs: -27,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return interfaceFeedback(ctx, params.pressure, [
      [0, 386, 0.019, 0.7, 'wood'],
      [0.039, 462, 0.025, 0.64, 'plastic'],
      [0.077, 523.25, 0.044, 1, 'string'],
      [0.127, 659.25, 0.059, 0.77, 'wood'],
    ]);
  },
} satisfies SoundRecipe;
