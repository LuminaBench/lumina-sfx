import { biquad, layer, noise, punch, renderSamples, TAU } from '../../engine/dsp.ts';
import type { RenderContext } from '../../engine/types.ts';

export function rainBed(ctx: RenderContext, intensity: number, drops: number, period: number): Float32Array {
  const mist = noise(ctx.random, 'white');
  const shower = noise(ctx.random, 'pink');
  const wash = biquad('bandpass', 1430 + intensity * 880, 0.59, ctx.sampleRate);
  const hiss = biquad('highpass', 3980, 0.69, ctx.sampleRate);
  const under = biquad('lowpass', 590, 0.71, ctx.sampleRate);
  const sound = renderSamples(ctx, (t) => {
    const cloud = 0.92 + 0.1 * Math.cos(TAU * t * 3 / period);
    return cloud * (wash(shower()) * (0.86 + intensity) + hiss(mist()) * (0.08 + intensity * 0.26)) +
      under(shower()) * (0.08 + intensity * 0.42);
  });
  const events = Math.round((80 + drops * 115) * (1 + intensity));
  const duration = ctx.frames / ctx.sampleRate;
  for (let i = 0; i < events; i++) {
    const at = ctx.random() * duration;
    const strength = (0.07 + ctx.random() ** 3.4 * 0.83) * (1 - intensity * 0.19);
    const hz = 1210 + ctx.random() * 4210;
    const decay = 0.0038 + ctx.random() * 0.013;
    layer(ctx, sound, at, 0.057, (shot) => punch(shot, [
      { color: 'white', kind: 'bandpass', hz, q: 1.65, gain: 1, attack: 0.00035, decay },
      { color: 'white', kind: 'bandpass', hz: hz * 0.57, q: 1.17, gain: 0.76, attack: 0.0014, decay: decay * 1.6 },
    ]), strength);
  }
  return sound;
}
