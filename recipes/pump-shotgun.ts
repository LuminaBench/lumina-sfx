import type { SoundRecipe } from '../engine/types.ts';
import { layer, punch } from '../engine/dsp.ts';
import { discharge } from './_shared/mechanical.ts';

export default {
  id: 'pump-shotgun', name: "Heavy Pump Shotgun", category: 'Weapons',
  tags: ["shotgun","gunshot","heavy","buckshot"], loopable: false, durationSec: 0.92,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.78 } },
  render(ctx, { params }) {
    const sound = discharge(ctx, {
      crack: 1.62, body: 1.68 + params.weight * 0.94, bass: 94, decay: 0.083, grit: 0.27, space: 0.63,
    });
    layer(ctx, sound, 0.009, 0.16, (shot) => punch(shot, [
      { color: 'pink', kind: 'bandpass', hz: 490, q: 0.9, gain: 1.4, attack: 0.003, decay: 0.049 },
      { color: 'white', kind: 'highpass', hz: 2700, gain: 0.48, attack: 0.001, decay: 0.028 },
    ]));
    return sound;
  },
} satisfies SoundRecipe;
