import type { SoundRecipe } from '../engine/types.ts';
import { reverb } from '../engine/dsp.ts';
import { bodyImpact } from './_shared/combat.ts';

export default {
  id: 'flesh-impact', name: "Flesh Impact Thud", category: 'Zombies & Combat',
  tags: ["flesh","impact","thud","wet","hit"], loopable: false, durationSec: 0.48,
  params: { wetness: { label: 'Wetness', min: 0, max: 1, default: 0.68 } },
  render(ctx, { params }) {
    const sound = bodyImpact(ctx, 105, 0.071, params.wetness);
    return reverb(sound, ctx.sampleRate, 'room', 0.2);
  },
} satisfies SoundRecipe;
