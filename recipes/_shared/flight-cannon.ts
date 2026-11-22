import { biquad, envelope, layer, noise, renderSamples } from '../../engine/dsp.ts';
import { renderRecording } from '../../engine/recording.ts';
import type { RenderContext } from '../../engine/types.ts';
import attacks from '../_recordings/isolated-clarity-pistol.ts';

export const cannonCredit = attacks.credit;
export function cannonBurst(ctx: RenderContext, seed: number, force: number, cockpit: boolean) {
  const out = new Float32Array(ctx.frames);
  let at = 0;
  for (let n = 0; n < 6; n++) {
    const take = seed + n;
    const detune = 0.8 + ctx.random() * 0.18;
    layer(
      ctx,
      out,
      at,
      0.25,
      (part) => {
        const crack = renderRecording(part, attacks, {
          seed: take,
          speed: detune,
          cutoffHz: cockpit ? 3800 : 13500,
        });
        const body = biquad('bandpass', cockpit ? 177 : 118, 0.88, part.sampleRate);
        const air = noise(part.random, 'pink');
        const shell = biquad('bandpass', 860, 0.74, part.sampleRate);
        return renderSamples(
          part,
          (t, i) =>
            crack[i] * (cockpit ? 0.75 : 1.35) +
            body(air()) * (2.6 + force) * envelope(t, 0.0006, cockpit ? 0.051 : 0.085) +
            shell(part.random() * 2 - 1) * 0.43 * envelope(t, 0.001, 0.02),
        );
      },
      0.9 + ctx.random() * 0.1,
    );
    at += (0.064 + 0.007 * ctx.random()) * (1.035 - 0.07 * force);
  }
  return out;
}
