import type { SoundRecipe } from '../engine/types.ts';
import { mix, punch, reverb } from '../engine/dsp.ts';
import { undeadVoice } from './_shared/combat.ts';

export default {
  id: 'aggressive-zombie-snarl', name: "Aggressive Zombie Snarl", category: 'Zombies & Combat',
  tags: ["zombie","snarl","vocal","attack"], loopable: false, durationSec: 0.88,
  params: { rage: { label: 'Rage', min: 0, max: 1, default: 0.81 } },
  render(ctx, { params }) {
    const sound = undeadVoice(ctx, { pitch: 83, drift: 69, length: 0.48, attack: 0.023,
      anger: 0.66 + params.rage * 0.34, rot: 0.44, vowel: 0.22 });
    mix(sound, punch(ctx, [
      { color: 'white', kind: 'bandpass', hz: 2800, gain: 0.36, attack: 0.018, decay: 0.084 },
    ]));
    return reverb(sound, ctx.sampleRate, 'room', 0.29);
  },
} satisfies SoundRecipe;
