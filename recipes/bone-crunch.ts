import type { SoundRecipe } from '../engine/types.ts';
import { layer, modal, punch, reverb } from '../engine/dsp.ts';
import { bodyImpact } from './_shared/combat.ts';

export default {
  id: 'bone-crunch', name: "Bone Crunch", category: 'Zombies & Combat',
  tags: ["bone","crunch","break","impact"], loopable: false, durationSec: 0.58,
  params: { splinter: { label: 'Splinter', min: 0, max: 1, default: 0.72 } },
  render(ctx, { params }) {
    const sound = bodyImpact(ctx, 128, 0.043, 0.33);
    for (let i = 0; i < 8; i++) {
      const at = i * 0.009 + ctx.random() * 0.016;
      const hz = 730 + ctx.random() * 1070;
      layer(ctx, sound, at, 0.1, (shot) => modal(shot, 'wood', hz, 0.008 + params.splinter * 0.013),
        0.89 * Math.exp(-i * 0.24));
      layer(ctx, sound, at, 0.045, (shot) => punch(shot, [
        { color: 'white', kind: 'highpass', hz: 1750, gain: 1, attack: 0.00015, decay: 0.008 },
      ]), 0.65 * Math.exp(-i * 0.21));
    }
    return reverb(sound, ctx.sampleRate, 'room', 0.21);
  },
} satisfies SoundRecipe;
