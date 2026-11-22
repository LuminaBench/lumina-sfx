import { layer, renderSamples, TAU } from '../../engine/dsp.ts';
import type { RenderContext } from '../../engine/types.ts';

export function radarSignal(ctx: RenderContext, state: 'search' | 'lock' | 'lost', intensity: number) {
  // Fictional HUD language. Preserve the contour across takes; the player learns the cadence.
  const notes =
    state === 'lock'
      ? [
          [0, 0.085, 1280],
          [0.145, 0.245, 1490],
        ]
      : state === 'lost'
        ? [
            [0, 0.085, 1000],
            [0.106, 0.15, 685],
          ]
        : [
            [0, 0.043, 796],
            [0.19, 0.043, 796],
            [0.315, 0.057, 944],
          ];
  const out = new Float32Array(ctx.frames);
  const trim = 0.993 + ctx.random() * 0.014;
  for (const [at, duration, pitch] of notes) {
    layer(ctx, out, at, duration, (part) =>
      renderSamples(part, (t) => {
        const phase = TAU * pitch * trim * t;
        const edge = Math.min(1, t / 0.003, (duration - t) / 0.012);
        const gain = Math.max(0, edge) * (0.88 + 0.12 * Math.exp(-t / 0.022));
        return gain * (Math.sin(phase) + (0.08 + 0.06 * intensity) * Math.sin(phase * 3));
      }),
    );
  }
  return out;
}
