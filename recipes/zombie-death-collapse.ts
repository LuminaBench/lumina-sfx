import type { SoundRecipe } from '../engine/types.ts';
import { layer, punch, reverb } from '../engine/dsp.ts';
import { bodyImpact, undeadVoice } from './_shared/combat.ts';

export default {
  id: 'zombie-death-collapse', name: "Zombie Death Collapse", category: 'Zombies & Combat',
  tags: ["zombie","death","collapse","vocal","impact"], loopable: false, durationSec: 1.52,
  params: { mass: { label: 'Mass', min: 0, max: 1, default: 0.72 } },
  render(ctx, { params }) {
    const sound = undeadVoice(ctx, { pitch: 41, drift: 51, length: 0.56, attack: 0.032,
      anger: 0.48, rot: 0.82, vowel: 0.37 });
    layer(ctx, sound, 0.36, 0.39, (shot) => bodyImpact(shot, 116, 0.084, 0.73), 0.52);
    layer(ctx, sound, 0.516, 0.48, (shot) => bodyImpact(shot, 74 - 24 * params.mass, 0.13, 0.52), 1.44);
    layer(ctx, sound, 0.58, 0.22, (shot) => punch(shot, [
      { color: 'white', kind: 'bandpass', hz: 790, gain: 0.76, attack: 0.009, decay: 0.081 },
    ]));
    return reverb(sound, ctx.sampleRate, 'room', 0.47);
  },
} satisfies SoundRecipe;
