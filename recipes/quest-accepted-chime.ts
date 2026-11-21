import type { SoundRecipe } from '../engine/types.ts';
import { interfaceFeedback } from './_shared/interface-feedback.ts';

export default {
  id: 'quest-accepted-chime', name: 'Quest Accepted Chime', category: 'Footsteps & UI',
  tags: ['quest', 'mission', 'accepted', 'log', 'start', 'prompt', 'task', 'ui'],
  loopable: false, durationSec: 0.472, targetRmsDbfs: -27,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return interfaceFeedback(ctx, params.pressure, [
      [0, 349.23, 0.041, 0.94, 'string'],
      [0.054, 523.25, 0.063, 0.86, 'string'],
      [0.145, 587.33, 0.068, 0.62, 'wood'],
    ]);
  },
} satisfies SoundRecipe;
