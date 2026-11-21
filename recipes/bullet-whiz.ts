import { biquad, clamp, noise, renderSamples, TAU } from '../engine/dsp.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: 'bullet-whiz', name: 'Bullet Whiz', category: 'Weapons',
  tags: ['bullet', 'whiz', 'flyby', 'near-miss', 'whistle', 'doppler'], loopable: false, durationSec: 0.34,
  params: { speed: { label: 'Speed', min: 0, max: 1, default: 0.67 } },
  render(ctx, { params }) {
    const air = noise(ctx.random, 'white');
    const bright = biquad('bandpass', 3790, 0.83, ctx.sampleRate);
    const trail = biquad('bandpass', 1120, 0.69, ctx.sampleRate);
    const buffeting = biquad('lowpass', 640, 0.66, ctx.sampleRate);
    const pass = 0.038 - params.speed * 0.012 + ctx.random() * 0.007;
    const bend = 0.012 - 0.0028 * params.speed;
    const center = (670 + params.speed * 285) * (0.951 + ctx.random() * 0.096);
    const fade = 0.025 + (1 - params.speed) * 0.013;
    let phase = ctx.random() * TAU;
    return renderSamples(ctx, (t) => {
      const x = (t - pass) / bend;
      const direction = x / Math.sqrt(1 + x * x);
      const approach = (1 - direction) * 0.5;
      const source = air();
      const fluctuation = clamp(buffeting(source), -0.4, 0.4);
      const hz = center * (1 - 0.34 * direction + 0.065 * fluctuation);
      phase += TAU * clamp(hz, 0, ctx.sampleRate * 0.45) / ctx.sampleRate;

      const attack = t < pass ? 0.075 + 0.925 * (t / pass) ** 1.68 : 1;
      const level = Math.min(1, t * 920) * attack * Math.exp(-Math.max(0, t - pass) / fade);
      const whistle = Math.sin(phase) + 0.18 * approach * Math.sin(2 * phase);
      const turbulence = approach * bright(source) * 0.42 + (1 - approach) * trail(source) * 0.54;
      return level * (whistle * (0.67 + fluctuation * 0.33) + turbulence);
    });
  },
} satisfies SoundRecipe;
