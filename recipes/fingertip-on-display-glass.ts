import type { SoundRecipe } from '../engine/types.ts';
import { scene } from './_shared/material-scenes.ts';

export default {
  id: 'fingertip-on-display-glass',
  name: 'Close fingertip contact on display glass',
  category: 'Footsteps & UI',
  tags: [
    'finger',
    'fingertip',
    'glass',
    'display',
    'touchscreen',
    'hardware',
    'close',
    'single',
    'soft',
    'contact',
    'tap',
  ],
  mixRole: 'foley',
  isolation: 'isolated',
  loopable: false,
  durationSec: 0.062,
  targetRmsDbfs: -34,
  perspective: 'close dry contact',
  contains: ['one damped finger-pad contact on display glass'],
  markers: { contact: 0 },
  params: { pressure: { label: 'Finger pressure', min: 0, max: 1, default: 0.52 } },
  render(ctx, { seed, params }) {
    const pressure = params.pressure;
    return scene(ctx, seed, pressure, [
      ['contact', 'rubber', 0, 0.039, 0.9, 345 + 105 * pressure, 0.0015],
      ['brush', 'cloth', 0.0008, 0.018, 0.32, 1020 + 180 * pressure, 0.001],
      ['contact', 'glass', 0.0014, 0.012, 0.07, 890, 0.0012],
    ]);
  },
} satisfies SoundRecipe;
