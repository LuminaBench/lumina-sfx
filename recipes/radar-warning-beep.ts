import type { SoundRecipe } from '../engine/types.ts';
import { envelope, layer, reverb, sweep, tone } from '../engine/dsp.ts';

export default {
  id: 'radar-warning-beep', name: "Radar Warning Beep", category: 'Footsteps & UI',
  tags: ["radar","warning","beep","ui","sci-fi"], loopable: false, durationSec: 0.57,
  params: { alert: { label: 'Alert', min: 0, max: 1, default: 0.65 } },
  render(ctx, { params }) {
    const sound = new Float32Array(ctx.frames);
    for (const [at, hz, gain] of [[0, 1120, 1], [0.135, 1510, 0.82]]) {
      layer(ctx, sound, at, 0.21, (shot) => tone(shot,
        (t) => sweep(hz * 1.19, hz, 0.015, t),
        (t) => envelope(t, 0.0017, 0.11) / (1 + Math.exp((t - 0.073) * 240)),
        (p) => Math.sin(p) + (0.07 + params.alert * 0.21) * Math.sin(2 * p) + 0.09 * Math.sin(3 * p)), gain);
    }
    return reverb(sound, ctx.sampleRate, 'room', 0.26);
  },
} satisfies SoundRecipe;
