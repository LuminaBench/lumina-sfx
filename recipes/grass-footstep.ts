import type { SoundRecipe } from '../engine/types.ts';
import { layer, punch, reverb } from '../engine/dsp.ts';
import { soleContact } from './_shared/surfaces.ts';

export default {
  id: 'grass-footstep', name: "Grass Footstep", category: 'Footsteps & UI',
  tags: ["footstep","grass","outdoor","walk"], loopable: false, durationSec: 0.47,
  params: { dryness: { label: 'Dryness', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    const sound = soleContact(ctx, 93, 0.04, 0.31);
    for (let i = 0; i < 12; i++) {
      const at = i * 0.009 + ctx.random() * 0.014;
      layer(ctx, sound, at, 0.16, (shot) => punch(shot, [
        { color: 'pink', kind: 'bandpass', hz: 660 + ctx.random() * 1100, gain: 0.84, attack: 0.0018, decay: 0.033 },
        { color: 'white', kind: 'bandpass', hz: 2030 + ctx.random() * 3300, gain: params.dryness * 0.83, attack: 0.002, decay: 0.023 },
      ]), (0.23 + 0.5 * ctx.random()) * Math.exp(-at * 5));
    }
    return reverb(sound, ctx.sampleRate, 'outdoor', 0.11);
  },
} satisfies SoundRecipe;
