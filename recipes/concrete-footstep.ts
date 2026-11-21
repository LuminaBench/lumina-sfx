import type { SoundRecipe } from '../engine/types.ts';
import { layer, punch, reverb } from '../engine/dsp.ts';
import { soleContact } from './_shared/surfaces.ts';

export default {
  id: 'concrete-footstep', name: "Concrete Footstep", category: 'Footsteps & UI',
  tags: ["footstep","concrete","boot","walk"], loopable: false, durationSec: 0.43,
  params: { heel: { label: 'Heel', min: 0, max: 1, default: 0.67 } },
  render(ctx, { params }) {
    const sound = soleContact(ctx, 134, 0.022, 0.57 + params.heel * 0.6);
    layer(ctx, sound, 0.053, 0.16, (shot) => soleContact(shot, 204, 0.018, 1.23), 0.48);
    layer(ctx, sound, 0.081, 0.16, (shot) => punch(shot, [
      { color: 'pink', kind: 'bandpass', hz: 1700, gain: 1.12, attack: 0.012, decay: 0.041 },
    ]), 0.49);
    return reverb(sound, ctx.sampleRate, 'room', 0.32);
  },
} satisfies SoundRecipe;
