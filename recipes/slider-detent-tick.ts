import type { SoundRecipe } from '../engine/types.ts';
import { interfaceFeedback } from './_shared/interface-feedback.ts';

export default {
  id: 'slider-detent-tick', name: 'Slider Detent Tick', category: 'Footsteps & UI',
  tags: ['slider', 'knob', 'step', 'setting', 'value', 'adjust', 'detent', 'ui'],
  loopable: false, durationSec: 0.092, targetRmsDbfs: -34,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return interfaceFeedback(ctx, params.pressure, [
      [0, 1188, 0.009, 0.84, 'plastic'],
      [0.009, 476, 0.008, 0.24, 'felt'],
    ]);
  },
} satisfies SoundRecipe;
