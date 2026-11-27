import type { SoundRecipe } from '../engine/types.ts';
import tap from './_recordings/isolated-ceramic-mug-set-down.ts';
import { scene } from './_shared/material-scenes.ts';

export default {
  id: 'stylus-tip-on-tablet-glass',
  name: 'Polymer pen tip on tablet glass',
  category: 'Footsteps & UI',
  tags: ['stylus', 'pen', 'nib', 'tip', 'tablet', 'glass', 'hardware', 'single', 'tap', 'contact', 'close'],
  mixRole: 'foley',
  recording: tap.credit,
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
    return scene(
      ctx,
      seed,
      pressure,
      [
        ['contact', 'rubber', 0, 0.036, 0.72, 510 + 125 * pressure, 0.00045],
        ['contact', 'glass', 0.0004, 0.026, 0.32, 920 + 140 * pressure, 0.00065],
      ],
      tap,
    );
  },
} satisfies SoundRecipe;
