import { biquad, envelope, layer, noise, punch, renderSamples, reverb, TAU, tone } from '../engine/dsp.ts';
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "portal-unfold", name: "Portal Unfold", category: "Sci-Fi & UI",
  tags: ["portal", "unfold", "opening", "spell", "space"],
  loopable: false, durationSec: 1.76, targetRmsDbfs: -22,
  params: { shimmer: { label: "Shimmer", min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    const signal = punch(ctx, [
      { kind: 'bandpass', color: 'pink', hz: 335, gain: 0.53, attack: 0.0007, decay: 0.065 },
    ]);
    const drag = noise(ctx.random, 'white');
    const low = biquad('bandpass', 390, 0.76, ctx.sampleRate);
    const edge = biquad('bandpass', 1500, 1.21, ctx.sampleRate);
    layer(ctx, signal, 0.015, 1.13, part => renderSamples(part, (time) => {
      const white = drag();
      const pull = envelope(time, 0.54, 0.14);
      const ripple = 0.63 + 0.37 * Math.sin(TAU * (9 * time + 17 * time * time)) ** 2;
      return pull * (low(white) * 0.87 + edge(white) * ripple * (0.19 + 0.31 * params.shimmer));
    }));
    for (const [hz, gain] of [[77, 0.48], [116, 0.27], [174, 0.17], [311, 0.073]]) {
      layer(ctx, signal, 0.45 + 0.13 * ctx.random(), 1.29, part =>
        tone(part, () => hz, time => envelope(time, 0.27, 0.22) * (0.77 + 0.23 * Math.cos(TAU * 2.7 * time))), gain);
    }
    return reverb(signal, ctx.sampleRate, 'room', 0.19);
  },
} satisfies SoundRecipe;
