import type { SoundRecipe } from '../engine/types.ts';
import { reverb } from '../engine/dsp.ts';
import { undeadVoice } from './_shared/combat.ts';

export default {
  id: 'wet-zombie-groan', name: "Wet Zombie Groan", category: 'Zombies & Combat',
  tags: ["zombie","groan","vocal","wet"], loopable: false, durationSec: 1.44,
  params: { rot: { label: 'Rot', min: 0, max: 1, default: 0.72 } },
  render(ctx, { params }) {
    const sound = undeadVoice(ctx, { pitch: 61, drift: 28, length: 0.98, attack: 0.15,
      anger: 0.22, rot: params.rot, vowel: 0.6 });
    return reverb(sound, ctx.sampleRate, 'room', 0.37);
  },
} satisfies SoundRecipe;
