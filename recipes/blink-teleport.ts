import { biquad, envelope, layer, noise, punch, renderSamples, sweep, tone } from '../engine/dsp.ts';
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "blink-teleport", name: "Blink Teleport", category: "Sci-Fi & UI",
  tags: ["blink", "teleport", "magic", "warp"],
  loopable: false, durationSec: 0.34, targetRmsDbfs: -23,
  params: { shimmer: { label: "Shimmer", min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    const signal = new Float32Array(ctx.frames);
    const air = noise(ctx.random, 'white');
    const inhale = biquad('bandpass', 850 + 900 * params.shimmer, 1.13, ctx.sampleRate);
    layer(ctx, signal, 0, 0.072, part => renderSamples(part, time =>
      inhale(air()) * (0.15 + time * 12) * Math.sin(Math.PI * time / 0.072) ** 0.8), 0.8);
    layer(ctx, signal, 0.099, 0.085, part => punch(part, [
      { color: 'white', kind: 'bandpass', hz: 3100 + 1600 * params.shimmer, gain: 1, attack: 0.0004, decay: 0.008 },
      { color: 'pink', kind: 'bandpass', hz: 640, gain: 0.72, attack: 0.001, decay: 0.015 },
    ]));
    layer(ctx, signal, 0.101, 0.15, part =>
      tone(part, time => sweep(174, 71, 0.022, time), time => envelope(time, 0.002, 0.031)), 0.41);
    return signal;
  },
} satisfies SoundRecipe;
