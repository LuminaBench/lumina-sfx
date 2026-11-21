import type { SoundRecipe } from '../engine/types.ts';
import { envelope, layer, mix, punch, reverb, sweep, tone, waveshape } from '../engine/dsp.ts';

export default {
  id: 'grenade-explosion', name: "Grenade Explosion", category: 'Weapons',
  tags: ["grenade","explosion","debris","sub-bass"], loopable: false, durationSec: 1.95,
  params: { debris: { label: 'Debris', min: 0, max: 1, default: 0.69 } },
  spectrum: [{ band: 'sub', minShare: 0.24 }],
  render(ctx, { params }) {
    const sound = punch(ctx, [
      { color: 'white', kind: 'highpass', hz: 2200, gain: 1.56, attack: 0.0004, decay: 0.033 },
      { color: 'pink', kind: 'bandpass', hz: 330, q: 0.65, gain: 2.81, attack: 0.003, decay: 0.19 },
      { color: 'brown', kind: 'lowpass', hz: 112, gain: 2.15, attack: 0.006, decay: 0.37 },
    ]);
    mix(sound, tone(ctx, (t) => sweep(114, 37, 0.095, t), (t) => 1.65 * envelope(t, 0.004, 0.28)));
    for (let i = 0; i < 13; i++) {
      const at = 0.06 + ctx.random() ** 2 * 0.77;
      layer(ctx, sound, at, 0.13, (shot) => punch(shot, [
        { color: 'white', kind: 'bandpass', hz: 1800 + ctx.random() * 6300, q: 2, gain: 1, attack: 0.001, decay: 0.028 },
      ]), (0.21 + params.debris * 0.53) * Math.exp(-at * 2.8));
    }
    return reverb(sound.map((x) => waveshape(x * 0.6, 1.5)), ctx.sampleRate, 'outdoor', 0.79);
  },
} satisfies SoundRecipe;
