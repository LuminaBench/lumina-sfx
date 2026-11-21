import { envelope, layer, mix, punch, sweep, tone } from '../../engine/dsp.ts';
import type { RenderContext } from '../../engine/types.ts';

type Surface = 'felt' | 'wood' | 'plastic' | 'string' | 'ceramic' | 'metal';
type Note = readonly [at: number, pitch: number, decay: number, strength: number, surface: Surface, bend?: number];
type Partial = readonly [ratio: number, strength: number, decay: number];

const partials: Record<Surface, readonly Partial[]> = {
  felt: [[1, 0.7, 1], [1.57, 0.22, 0.7], [2.16, 0.1, 0.45]],
  wood: [[1, 0.7, 1], [2.68, 0.26, 0.49], [4.62, 0.12, 0.23]],
  plastic: [[1, 0.62, 1], [1.82, 0.4, 0.52], [3.05, 0.17, 0.31]],
  string: [[1, 0.77, 1], [2.002, 0.19, 0.7], [3.015, 0.1, 0.56], [4.028, 0.08, 0.31]],
  ceramic: [[1, 0.62, 1], [1.48, 0.25, 0.85], [2.73, 0.2, 0.36], [3.19, 0.08, 0.27]],
  metal: [[1, 0.63, 1], [1.34, 0.27, 0.92], [2.37, 0.23, 0.51], [3.69, 0.12, 0.23]],
};

const contact: Record<Surface, number> = { felt: 0.08, wood: 0.16, plastic: 0.34, string: 0.07, ceramic: 0.17, metal: 0.15 };

export function interfaceFeedback(ctx: RenderContext, pressure: number, notes: readonly Note[]): Float32Array {
  const output = new Float32Array(ctx.frames);
  const hardness = 0.72 + 0.44 * pressure;
  for (const [at, pitch, decay, strength, surface, bend = 0] of notes) {
    layer(ctx, output, at, decay * 7.2, (voice) => {
      const pitchOffset = 0.997 + 0.006 * ctx.random();
      const force = contact[surface] * hardness;
      const sound = punch(voice, [
        { color: 'pink', kind: 'bandpass', hz: pitch * 1.54, q: 0.86, gain: force * 0.65, attack: 0.0009, decay: 0.007 },
        { color: 'white', kind: 'highpass', hz: 1950 + 940 * pressure, gain: force * 0.45, attack: 0.00045, decay: 0.0017 },
      ]);
      for (const [ratio, gain, damping] of partials[surface]) {
        const hz = pitch * ratio * pitchOffset;
        if (hz >= ctx.sampleRate * 0.44) continue;
        const attack = (surface === 'felt' ? 0.0026 : 0.00095) / hardness;
        mix(sound, tone(voice,
          (t) => sweep(hz * (1 + bend), hz, decay * 0.8, t),
          (t) => envelope(t, attack, decay * damping)), gain * (ratio === 1 ? 1 : hardness));
      }
      return sound;
    }, strength);
  }
  return output;
}
