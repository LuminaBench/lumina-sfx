import { biquad, noise, TAU } from '../../engine/dsp.ts';
import type { SoundRecipe, RenderContext } from '../../engine/types.ts';

export interface SweepTexture {
  lowHz: number;
  highHz: number;
  grainHz: number;
  grainDepth: number;
  air: number;
  body: number;
}
export interface Gesture {
  duration: number;
  apex: number;
  direction: number;
  travel: number;
  reverse: boolean;
  echo: number;
}

export function editorSweep(id: string, name: string, tags: string[], texture: SweepTexture, gesture: Gesture): SoundRecipe {
  function sweep(ctx: RenderContext, detail: number) {
    const colored = noise(ctx.random, 'pink');
    const lo = biquad('bandpass', texture.lowHz * (.85 + .3 * detail), .80, ctx.sampleRate);
    const hi = biquad('bandpass', texture.highHz * (.78 + .46 * detail), .94, ctx.sampleRate);
    const edge = biquad('highpass', 780, .76, ctx.sampleRate);
    const signal = new Float32Array(ctx.frames);
    const phase = ctx.random() * TAU;
    const rate = texture.grainHz * (.96 + .08 * ctx.random());
    const delay = Math.max(1, Math.round(.046 * ctx.sampleRate));
    for (let i = 0; i < signal.length; i++) {
      const u = i / Math.max(1, signal.length - 1);
      const rise = Math.min(1, u / gesture.apex);
      const fall = Math.max(0, (u - gesture.apex) / (1 - gesture.apex));
      const weight = (.055 + .945 * Math.sin(Math.PI * .5 * rise) ** 1.4) * (1 - fall) ** 2.7;
      const motion = gesture.reverse ? 1 - u : u;
      const grain = 1 + texture.grainDepth * Math.sin(phase + TAU * rate * gesture.duration * (u + .4*u*u));
      const air = ctx.random() * 2 - 1;
      const low = lo(colored()) * texture.body * (1.3 - motion);
      const high = hi(air) * (.15 + motion) + edge(air) * texture.air;
      signal[i] = weight * grain * (low + high) + (i >= delay ? signal[i-delay] * gesture.echo : 0);
    }
    return signal;
  }
  const recipe: SoundRecipe = {
    id, name, tags, durationSec: gesture.duration, isolation: 'isolated', loopable: false, category: 'Sci-Fi & UI',
    perspective: 'editorial transition', contains: ['one continuous gesture'], mixRole: 'interface', targetRmsDbfs: -26,
    markers: { apex: gesture.duration * gesture.apex },
    params: { detail: { label: 'Texture brightness', min: 0, max: 1, default: .46 } },
    render(ctx, { params }) { return sweep(ctx, params.detail); },
  };
  if (!gesture.direction) return recipe;
  return { ...recipe, renderStereo(ctx, { params }) {
    const mono = sweep(ctx, params.detail);
    const left = new Float32Array(mono.length), right = new Float32Array(mono.length);
    for (let i = 0; i < mono.length; i++) {
      const travel = Math.cos(Math.PI * i / Math.max(1, mono.length - 1));
      const angle = Math.PI / 4 * (1 - gesture.direction * gesture.travel * travel);
      left[i] = mono[i] * Math.cos(angle);
      right[i] = mono[i] * Math.sin(angle);
    }
    return [left, right];
  } };
}
