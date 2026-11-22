import { biquad, envelope, layer, noise, renderSamples, TAU } from '../../engine/dsp.ts';
import type { RenderContext } from '../../engine/types.ts';

// A sheet of water tears into spray. Under the surface, each entrained bubble
// rings once; pitch, arrival and decay depend on its own size.
export function waterCrossing(ctx: RenderContext, force: number, entering: boolean) {
  const out = new Float32Array(ctx.frames);
  const surface = entering ? 0 : 0.2;
  const weight = 0.8 + force * 0.4;
  layer(ctx, out, surface, entering ? 0.53 : 0.45, (part) => {
    const wash = noise(part.random, 'pink');
    const edge = biquad('bandpass', entering ? 2850 : 4800, 0.7, part.sampleRate);
    const deep = biquad('lowpass', 420 * weight, 0.8, part.sampleRate);
    return renderSamples(part, (t) => {
      const air = wash(),
        white = part.random() * 2 - 1;
      return (
        weight *
        (2.2 * deep(air) * envelope(t, 0.001, 0.088) +
          0.51 * edge(white) * envelope(t, 0.002, 0.056) +
          0.35 * air * envelope(t, 0.026, entering ? 0.1 : 0.074))
      );
    });
  });
  const count = entering ? 100 : 55;
  for (let j = 0; j < count; j++) {
    const f = (j + ctx.random()) / count;
    const wet = entering || f < 0.33;
    const at =
      j === 0 ? 0 : entering ? 0.045 + 0.98 * f ** 1.5 : f < 0.33 ? 0.54 * f : 0.23 + 0.97 * (f - 0.33);
    const hz = ((wet ? 290 : 1200) * (1 + 5 * ctx.random() ** 2)) / weight;
    const decay = (0.008 + 0.011 * ctx.random()) * Math.sqrt(850 / hz);
    const gain = (0.12 + 0.27 * ctx.random()) * (1 - 0.76 * f) * (j === 0 ? 1.4 : 1);
    layer(ctx, out, at, Math.min(0.14, decay * 7), (part) =>
      renderSamples(
        part,
        (t) => gain * Math.sin(TAU * hz * (t + (0.17 * t * t) / (t + 0.013))) * envelope(t, 0.0006, decay),
      ),
    );
  }
  return out;
}
