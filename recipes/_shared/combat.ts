import { layer } from '../../engine/dsp.ts';
import type { RenderContext } from '../../engine/types.ts';
import { brush, foleyGrain, softContact } from './foley.ts';

export function bodyImpact(ctx: RenderContext, weight: number, wetness: number): Float32Array {
  const sound = new Float32Array(ctx.frames);
  layer(ctx, sound, 0, 0.128, (body) =>
    softContact(body, { firmness: 0.43 - 0.21 * weight, texture: 0.33 + wetness * 0.17, length: 0.011 + 0.014 * weight }),
    0.70 + weight * 0.49);
  foleyGrain(ctx, sound, {
    at: 0.001 + ctx.random() * 0.0028, center: 1240 - 300 * weight, edge: 2810,
    duration: 0.0047 + wetness * 0.004, level: 0.40 + wetness * 0.34,
  });
  layer(ctx, sound, 0.011 + ctx.random() * 0.007, 0.155, (drag) =>
    brush(drag, 490 + wetness * 410, 1830, 0.006, 0.018, 0.39 + wetness * 0.27),
    0.27 + wetness * 0.39);
  layer(ctx, sound, 0.045 + ctx.random() * 0.013, 0.12, (cloth) =>
    brush(cloth, 1060, 2490, 0.015, 0.024, 0.42), 0.22 + weight * 0.14);
  return sound;
}
