import { layer } from '../engine/dsp.ts';
import type { SoundRecipe } from '../engine/types.ts';
import { brush, foleyGrain, softContact } from './_shared/foley.ts';

export default {
  id: 'gravel-footstep', name: 'Gravel Footstep', category: 'Footsteps & UI',
  tags: ['footstep', 'gravel', 'stone', 'walk', 'crunch'], loopable: false, durationSec: 0.52,
  params: { coarseness: { label: 'Coarseness', min: 0, max: 1, default: 0.72 } },
  render(ctx, { params }) {
    const sound = new Float32Array(ctx.frames);
    const roll = 0.074 + ctx.random() * 0.043;
    const size = params.coarseness;
    layer(ctx, sound, 0, 0.13, (heel) =>
      softContact(heel, { firmness: 0.54, texture: 0.44, length: 0.019 }), 0.36);
    layer(ctx, sound, roll, 0.12, (toe) =>
      softContact(toe, { firmness: 0.40, texture: 0.36, length: 0.014 }), 0.34);
    layer(ctx, sound, 0.003, 0.22, (grit) =>
      brush(grit, 840, 5660, 0.037, 0.062, 0.48 + size * 0.27), 0.49);
    layer(ctx, sound, roll + 0.045, 0.24, (grit) =>
      brush(grit, 1290, 6480, 0.051, 0.049, 0.58), 0.43);
    for (const [start, span, count, weight] of [
      [0, 0.073 + 0.017 * size, 31, 0.76],
      [roll * 0.76, 0.110, 36, 0.96],
      [roll + 0.10, 0.102 + 0.045 * size, 23, 0.44],
    ]) {
      for (let i = 0; i < count; i++) {
        const scale = ctx.random();
        const phase = ctx.random();
        foleyGrain(ctx, sound, {
          at: start + phase ** 1.08 * span,
          center: 350 + (1 - scale) * (1240 + (1 - size) * 460),
          edge: 4220 + ctx.random() * 4120 - size * scale * 740,
          duration: 0.0014 + (0.007 + size * 0.004) * scale ** 1.5,
          level: (0.10 + 0.66 * ctx.random() ** 3.4) * (1 - 0.53 * phase) * weight,
        });
      }
    }
    return sound;
  },
} satisfies SoundRecipe;
