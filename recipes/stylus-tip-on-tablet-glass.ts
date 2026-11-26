import type { SoundRecipe } from '../engine/types.ts';
import { scene } from './_shared/material-scenes.ts';

export default {
  id: 'stylus-tip-on-tablet-glass',
  name: 'Polymer pen tip on tablet glass',
  category: 'Footsteps & UI',
  tags: ['stylus', 'pen', 'nib', 'tip', 'tablet', 'glass', 'hardware', 'single', 'tap', 'contact', 'close'],
  mixRole: 'foley',
  isolation: 'isolated',
  loopable: false,
  durationSec: 0.054,
  targetRmsDbfs: -30,
  perspective: 'close dry contact',
  contains: ['one polymer nib tap on tablet glass'],
  markers: { contact: 0 },
  params: { pressure: { label: 'Nib pressure', min: 0, max: 1, default: 0.46 } },
  render(ctx, { seed, params }) {
    const pressure = params.pressure;
    return scene(ctx, seed, pressure, [
      ['contact', 'stone', 0, 0.01, 0.52, 2150 + 320 * pressure, 0.00024],
      ['contact', 'glass', 0.0007, 0.018, 0.21, 1040 + 90 * pressure, 0.0008],
      ['contact', 'rubber', 0.0017, 0.034, 0.65, 440, 0.0013],
    ]);
  },
} satisfies SoundRecipe;
