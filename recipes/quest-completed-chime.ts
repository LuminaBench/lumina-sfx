import type { SoundRecipe } from '../engine/types.ts';
import { interfaceFeedback } from './_shared/interface-feedback.ts';

export default {
  id: 'quest-completed-chime', name: 'Quest Completed Chime', category: 'Footsteps & UI',
  tags: ['quest', 'mission', 'finished', 'log', 'complete', 'reward', 'success', 'ui'],
  loopable: false, durationSec: 0.64, targetRmsDbfs: -25,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return interfaceFeedback(ctx, params.pressure, [
      [0, 523.25, 0.046, 0.89, 'string'],
      [0.067, 659.25, 0.057, 0.82, 'wood'],
      [0.135, 783.99, 0.077, 0.92, 'string'],
      [0.196, 1046.5, 0.088, 0.68, 'ceramic'],
      [0.196, 523.25, 0.077, 0.26, 'string'],
    ]);
  },
} satisfies SoundRecipe;
