import { biquad, clamp, envelope, layer, mix, noise, renderSamples, TAU } from '../../engine/dsp.ts';
import type { RenderContext } from '../../engine/types.ts';
import { pressure, rumble, scatter } from './acoustics.ts';

type AirMotion = 'launch' | 'flyby' | 'boom';

interface AirEvent {
  motion: AirMotion;
  /** Fraction of the cue at which the launch or closest pass is heard. */
  focus: number;
  /** Width of the audible air envelope, as a fraction of the cue. */
  width: number;
  whistle: number;
  weight: number;
  cutoff: number;
  reflection: number;
}

export function airTransient(ctx: RenderContext, spec: AirEvent, intensity: number): Float32Array {
  const length = ctx.frames / ctx.sampleRate;
  const focus = spec.focus * length;
  const width = length * spec.width;
  const near = spec.motion === 'flyby';
  const white = noise(ctx.random, 'white');
  const rough = noise(ctx.random, 'pink');
  const air = biquad('bandpass', spec.cutoff * 0.83, 0.61, ctx.sampleRate);
  const motor = biquad('bandpass', 270 + spec.weight * 230, 0.65, ctx.sampleRate);
  const buffeting = biquad('lowpass', 41, 0.72, ctx.sampleRate);
  const pitchBias = 0.94 + 0.10 * ctx.random() + 0.035 * intensity;
  const energy = 0.80 + intensity * 0.35;
  let phase = ctx.random() * TAU;

  const out = renderSamples(ctx, (time) => {
    const travel = (time - focus) / width;
    const approach = Math.exp(-(Math.abs(travel) ** 1.52));
    const wake = time < focus ? 0 : envelope(time - focus, 0.011, width * 0.89);
    const contour = near ? approach : 0.085 * approach + wake;
    const turn = 0.5 + 0.5 * Math.tanh(travel * (near ? 3.6 : 1.45));
    const source = white();
    const texture = rough();
    const turbulence = clamp(0.83 + buffeting(texture) * 6, 0.47, 1.38);
    const pitch = spec.whistle * pitchBias * (1.37 - 0.78 * turn) * (0.994 + 0.010 * turbulence);
    phase += TAU * Math.min(ctx.sampleRate * 0.19, pitch) / ctx.sampleRate;
    const whistle = (Math.sin(phase) + 0.19 * Math.sin(phase * 2.006 + 0.33))
      * (spec.whistle ? 0.11 : 0) * (near ? approach ** 1.2 : wake * 0.7);
    const edge = air(source) * (near ? 0.22 + 0.68 * (1 - turn * 0.62) : 0.42);
    const body = motor(texture) * (0.42 + spec.weight * 0.68);
    const fade = Math.min(1, time / 0.003, (length - time) / 0.045);
    const rush = spec.motion === 'boom' ? 0.19 : 0.90;
    return fade * energy * (whistle + rush * contour * (edge + body) * turbulence);
  });

  if (spec.motion === 'flyby') {
    layer(ctx, out, focus, 0.082, (part) =>
      pressure(part, { span: 0.0018, low: 435, high: spec.cutoff, edge: 0.51, weight: spec.weight }), spec.weight * 0.37);
    return out;
  }

  const isBoom = spec.motion === 'boom';
  const front = (at: number, span: number, weight: number) => {
    const signal = pressure({ ...ctx, frames: Math.round(ctx.sampleRate * 0.12) }, {
      span, low: 158 + 90 * (1 - spec.weight), high: spec.cutoff, edge: 0.85 * energy, weight,
    });
    mix(out, signal, weight, Math.round(at * ctx.sampleRate));
    if (spec.reflection > 0 && at === 0) scatter(ctx, out, signal, length * 0.37, spec.reflection, spec.cutoff * 0.72);
  };
  front(focus, isBoom ? 0.0085 : 0.0036, 0.62 + spec.weight * 0.64);
  if (isBoom) front(focus + width * 0.21, 0.012, spec.weight * 0.67);
  layer(ctx, out, focus + 0.014, length * 0.91, (part) =>
    rumble(part, isBoom ? 108 : 157, 0.022 + width * 0.059, width * 1.12, spec.weight * 0.73), spec.weight * 1.64);
  return out;
}
