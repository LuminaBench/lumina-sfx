import { layer } from '../engine/dsp.ts';
import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import attack from './_recordings/isolated-atlas-firecracker.ts';
import { pressure, rumble } from './_shared/acoustics.ts';

export default {
  id: 'flight-airburst-open-sky',
  name: 'Open-sky airburst',
  category: 'Impacts',
  mixRole: 'impact',
  isolation: 'isolated',
  tags: ['dogfight', 'aircraft', 'explosion', 'airburst', 'outside'],
  durationSec: 1.65,
  loopable: false,
  targetRmsDbfs: -21,
  recording: attack.credit,
  params: { size: { label: 'Apparent weight', min: 0, max: 1, default: 0.58 } },
  render(ctx, { seed, params }) {
    const out = pressure(ctx, { span: 0.029, low: 72, high: 2900, edge: 0.83, weight: 1.1 });
    layer(ctx, out, 0, 0.07, (p) => renderRecording(p, attack, { seed, speed: 0.84, cutoffHz: 10800 }), 1.15);
    layer(
      ctx,
      out,
      0.013,
      1.5,
      (p) => rumble(p, 95 + 30 * params.size, 0.025, 0.31 + 0.2 * params.size, 0.27),
      2.5,
    );
    return out;
  },
} satisfies SoundRecipe;
