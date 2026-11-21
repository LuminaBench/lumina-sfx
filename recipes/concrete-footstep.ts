import { layer, reverb } from '../engine/dsp.ts';
import type { SoundRecipe } from '../engine/types.ts';
import { brush, softContact } from './_shared/foley.ts';

export default {
  id: 'concrete-footstep', name: 'Concrete Footstep', category: 'Footsteps & UI',
  tags: ['footstep', 'concrete', 'boot', 'walk'], loopable: false, durationSec: 0.43,
  params: { heel: { label: 'Heel', min: 0, max: 1, default: 0.67 } },
  render(ctx, { params }) {
    const roll = 0.052 + 0.031 * ctx.random();
    const sound = new Float32Array(ctx.frames);
    layer(ctx, sound, 0, 0.096, (heel) =>
      softContact(heel, { firmness: 0.66 + params.heel * 0.33, texture: 0.81, length: 0.0145 }), 0.76 + params.heel * 0.57);
    layer(ctx, sound, roll * 0.53, 0.15, (tread) =>
      brush(tread, 985, 2640, 0.023, 0.029, 0.39), 0.24 + ctx.random() * 0.21);
    layer(ctx, sound, roll, 0.10, (toe) =>
      softContact(toe, { firmness: 0.47, texture: 0.54, length: 0.012 }), 0.46 + ctx.random() * 0.19);
    layer(ctx, sound, roll + 0.075 + ctx.random() * 0.024, 0.095, (sole) =>
      brush(sole, 968, 2710, 0.014, 0.019, 0.59), 0.19);
    return reverb(sound, ctx.sampleRate, 'room', 0.10);
  },
} satisfies SoundRecipe;
