import { biquad, envelope, layer, noise, punch, renderSamples, tone } from '../engine/dsp.ts';
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "frost-spell-cast", name: "Frost Spell Cast", category: "Sci-Fi & UI",
  tags: ["frost", "ice", "cast", "magic", "spell"],
  loopable: false, durationSec: 1.1, targetRmsDbfs: -22,
  params: { shimmer: { label: "Shimmer", min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    const signal = new Float32Array(ctx.frames);
    for (const [hz, level, decay] of [[1660, 0.35, 0.056], [3027, 0.20, 0.036], [4931, 0.12, 0.018]]) {
      layer(ctx, signal, 0, 0.27, part => tone(part, () => hz, t => envelope(t, 0.0009, decay)), level);
    }
    for (let i = 0; i < 15; i++) {
      const at = 0.059 + i * 0.021 + i * i * 0.0013 + ctx.random() * 0.026;
      const center = 2250 + 3750 * ctx.random();
      layer(ctx, signal, at, 0.076, part => punch(part, [
        { color: 'white', kind: 'bandpass', hz: center, gain: 0.94, attack: 0.0005, decay: 0.004 + ctx.random() * 0.013 },
        { color: 'pink', kind: 'bandpass', hz: 1080, gain: 0.22, attack: 0.0011, decay: 0.011 },
      ]), (0.58 + 0.30 * ctx.random()) * Math.exp(-i * 0.122));
    }
    const air = noise(ctx.random, 'white');
    const frost = biquad('bandpass', 5100 + 1950 * params.shimmer, 0.79, ctx.sampleRate);
    layer(ctx, signal, 0.105, 0.98, part => renderSamples(part, t =>
      frost(air()) * envelope(t, 0.159, 0.184)), 0.3 + 0.2 * params.shimmer);
    return signal;
  },
} satisfies SoundRecipe;
