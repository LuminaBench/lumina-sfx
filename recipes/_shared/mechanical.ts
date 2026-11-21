import { envelope, mix, modal, punch, reverb, sweep, tone, waveshape } from '../../engine/dsp.ts';
import type { RenderContext } from '../../engine/types.ts';

interface Discharge {
  crack: number;
  body: number;
  bass: number;
  decay: number;
  grit: number;
  space: number;
}

export function discharge(ctx: RenderContext, voice: Discharge): Float32Array {
  const { crack, body, bass, decay, grit, space } = voice;
  const burst = punch(ctx, [
    { color: 'white', kind: 'highpass', hz: 3700, gain: crack, attack: 0.00019, decay: 0.009 },
    { color: 'white', kind: 'bandpass', hz: 1450, gain: 0.82, attack: 0.0003, decay: decay * 0.63 },
    { color: 'pink', kind: 'bandpass', hz: 277, q: 0.75, gain: body * 1.8, attack: 0.0009, decay },
    { color: 'brown', kind: 'lowpass', hz: 175, gain: body * 0.70, attack: 0.0012, decay: decay * 1.26 },
  ]);
  mix(burst, tone(ctx, (t) => sweep(bass * 2.1, bass * 0.65, 0.022, t),
    (t) => envelope(t, 0.0013, decay * 0.86)), body * 0.58);
  mix(burst, modal(ctx, 'metal', 1200, 0.025), grit);
  const saturated = burst.map((sample) => waveshape(sample * 0.7, 1.8));
  return reverb(saturated, ctx.sampleRate, 'outdoor', space);
}

export function mechanism(ctx: RenderContext, hz: number, decay: number): Float32Array {
  const click = punch(ctx, [
    { color: 'white', kind: 'highpass', hz: 2400, gain: 0.69, attack: 0.0002, decay: 0.007 },
    { color: 'pink', kind: 'bandpass', hz: 420, gain: 0.91, attack: 0.0003, decay: decay * 0.8 },
  ]);
  mix(click, modal(ctx, 'metal', hz, decay), 0.54);
  return click;
}
