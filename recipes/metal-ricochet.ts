import type { SoundRecipe } from '../engine/types.ts';
import { envelope, mix, modal, punch, reverb, sweep, tone } from '../engine/dsp.ts';

export default {
  id: 'metal-ricochet', name: "Metal Ricochet Ping", category: 'Weapons',
  tags: ["ricochet","metal","ping","spark"], loopable: false, durationSec: 0.57,
  params: { ring: { label: 'Ring', min: 0, max: 1, default: 0.73 } },
  spectrum: [{ band: 'high', minShare: 0.24 }],
  render(ctx, { params }) {
    const sound = punch(ctx, [
      { color: 'white', kind: 'highpass', hz: 5600, gain: 0.9, attack: 0.0002, decay: 0.016 },
      { color: 'pink', kind: 'bandpass', hz: 1800, gain: 0.45, attack: 0.0002, decay: 0.026 },
    ]);
    mix(sound, modal(ctx, 'metal', 3650, 0.055 + params.ring * 0.042), 0.68);
    mix(sound, tone(ctx, (t) => sweep(6820, 1950, 0.065, t), (t) => envelope(t, 0.001, 0.077),
      (p) => Math.sin(p) + 0.15 * Math.sin(2 * p)), 0.74);
    return reverb(sound, ctx.sampleRate, 'outdoor', 0.4);
  },
} satisfies SoundRecipe;
