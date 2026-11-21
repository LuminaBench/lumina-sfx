import type { SoundRecipe } from '../engine/types.ts';
import { interfaceFeedback } from './_shared/interface-feedback.ts';

export default {
  id: 'checkpoint-save-cue', name: 'Checkpoint Save Cue', category: 'Footsteps & UI',
  tags: ['checkpoint', 'autosave', 'save', 'stored', 'status', 'gameplay', 'ui'],
  loopable: false, durationSec: 0.304, targetRmsDbfs: -29,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return interfaceFeedback(ctx, params.pressure, [
      [0, 560, 0.027, 0.78, 'ceramic'],
      [0.031, 742, 0.039, 0.75, 'ceramic'],
      [0.082, 556, 0.032, 0.56, 'felt'],
    ]);
  },
} satisfies SoundRecipe;
