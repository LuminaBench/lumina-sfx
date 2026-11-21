import { biquad, noise, rng } from '../../engine/dsp.ts';
import type { RenderContext } from '../../engine/types.ts';
import type { RecordedClip } from '../../engine/recording.ts';
import { place, roomReturns, snippet } from './field-layers.ts';
import type { AcousticSpace } from './field-layers.ts';

export type Cut = 'report' | 'blast' | 'fracture' | 'contact' | 'brass' | 'pass';
export interface SoundCut {
  kind: Cut;
  space: AcousticSpace;
  at: readonly number[];
  color: number;
  mass: number;
  edge: number;
  scatter: number;
  panDepth: number;
  trajectory?: 'departure' | 'pass';
}

// Move through the recorded air sound at a continuous changing rate. A
// receding pass loses high frequencies behind the camera; the direct crack
// of a launch stays at the beginning. No repeating tonal oscillator is used.
function trajectory(ctx: RenderContext, signal: Float32Array, departure: boolean, mass: number, color: number) {
  const output = new Float32Array(signal.length);
  const far = biquad('lowpass', color * .29, .68, ctx.sampleRate);
  const closest = .16 + .11 * mass;
  let cursor = 0;
  for (let i = 0; i < output.length; i++) {
    const position = i / output.length;
    const x = (position - closest) / .083;
    const direction = x / Math.sqrt(1 + x * x);
    const sourceIndex = Math.floor(cursor);
    const first = signal[sourceIndex] ?? 0;
    const sample = first + ((signal[sourceIndex + 1] ?? 0) - first) * (cursor - sourceIndex);
    const distance = departure ? position : Math.abs(direction);
    const occlusion = departure ? .16 + .75 * position : .04 + .66 * (.5 + .5 * direction);
    const shape = departure ? Math.exp(-position * 2.8) : .11 + .89 / (1 + x * x * .22);
    output[i] = ((1 - occlusion) * sample + occlusion * far(sample)) * shape * (1 - .16 * distance);
    cursor += departure ? 1.05 - .28 * position : 1.02 - .24 * direction;
  }
  return output;
}

// Track the physical order of each event: direct sound, structure response,
// then loose material. The pressure layer has a noisy, aperiodic decay.
export function cinematicCut(ctx: RenderContext, seed: number, force: number, cut: SoundCut,
  direct: RecordedClip, structure: RecordedClip, debris: RecordedClip) {
  const { sampleRate } = ctx;
  const draw = rng(seed);
  const out = new Float32Array(ctx.frames);
  const explosive = cut.kind === 'report' || cut.kind === 'blast';
  const flight = cut.kind === 'pass';
  const bright = cut.color * (.89 + force * .22);
  for (const [index, cue] of cut.at.entries()) {
    const at = cue + (index === 0 ? 0 : (draw() - .5) * .012);
    const speed = (1.09 - .26 * cut.mass) * (.955 + .09 * draw());
    const span = explosive ? .38 + cut.mass * .42 : flight ? .62 + .32 * cut.mass : .33 + .38 * cut.mass;
    const raw = snippet(ctx, direct, seed + index, span, speed, bright);
    const front = flight ? trajectory(ctx, raw, cut.trajectory === 'departure', cut.mass, bright) : raw;
    const gain = index === 0 ? 1 : .71 + .27 * draw();
    for (let i = 0; i < front.length; i++) {
      const t = i / sampleRate;
      if (cut.kind === 'brass' || cut.kind === 'contact') front[i] *= Math.exp(-t / (.04 + .14 * cut.edge));
    }
    place(out, front, at, gain, sampleRate);

    const contactDelay = explosive ? .021 + .054 * cut.panDepth : flight ? span * .55 : .012 + .055 * cut.mass;
    const body = snippet(ctx, structure, seed + 197 + index, Math.min(1.15, .25 + .87 * cut.mass), .85 + .16 * draw(),
      bright * (flight ? .62 : .76));
    if (explosive) {
      const low = biquad('lowpass', 83 - 23 * cut.mass, .85, sampleRate);
      const highpass = biquad('highpass', 24, .69, sampleRate);
      const air = noise(rng((seed + index * 8399) >>> 0), 'brown');
      const tau = (cut.kind === 'blast' ? .32 : .085) * (.6 + cut.mass);
      for (let i = 0; i < body.length; i++) {
        const t = i / sampleRate;
        const roll = low(highpass(air())) * Math.min(1, t / .011) * Math.exp(-t / tau);
        body[i] = body[i] * Math.exp(-t / (.11 + cut.mass * .52)) * .63 + roll * (cut.kind === 'blast' ? 7.9 : 2.2);
      }
    }
    place(out, body, at + contactDelay, gain * (.48 + .38 * cut.mass), sampleRate);

    // Ballistic bounces shorten their flight, while scattered fragments
    // spread out independently and lose energy over a longer tail.
    let bounce = .055 + .12 * cut.mass;
    let t = at + contactDelay + .011;
    for (let j = 0; j < cut.scatter; j++) {
      const collision = cut.kind === 'brass';
      t += collision ? bounce : (.018 + .12 * draw()) * (1 + .23 * j);
      bounce *= .56 + .16 * draw();
      const tail = snippet(ctx, debris, seed + 1979 * (j + 1) + index, .12 + .21 * draw(),
        (.89 + draw() * .32) * (collision ? 1 + .056 * j : 1), bright * (.9 + .2 * draw()), .025 * draw());
      const grit = (.34 + .25 * cut.edge) * Math.exp(-j * (collision ? .49 : .35));
      place(out, tail, t, grit * gain, sampleRate);
    }
  }
  return roomReturns(ctx, out, cut.space);
}
