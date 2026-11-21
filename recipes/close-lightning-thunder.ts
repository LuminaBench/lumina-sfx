import type { SoundRecipe } from '../engine/types.ts';
import { envelope, layer, mix, punch, reverb, sweep, tone } from '../engine/dsp.ts';

export default {
  id: 'close-lightning-thunder', name: "Close Lightning & Thunder", category: 'Weather & Ambience',
  tags: ["lightning","thunder","storm","rumble","sub-bass"], loopable: false, durationSec: 3.45,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.27 } },
  spectrum: [{ band: 'sub', minShare: 0.45 }],
  render(ctx, { params }) {
    const sound = punch(ctx, [
      { color: 'white', kind: 'highpass', hz: 4100, gain: 1.88 - params.distance * 1.03, attack: 0.0005, decay: 0.016 },
      { color: 'white', kind: 'bandpass', hz: 790, q: 0.7, gain: 1.02, attack: 0.002, decay: 0.069 },
      { color: 'brown', kind: 'lowpass', hz: 117, gain: 1.35, attack: 0.025, decay: 0.48 },
    ]);
    for (const [at, hz, gain] of [[0.038, 99, 1.3], [0.21, 73, 1.05], [0.43, 49, 1.25], [0.74, 59, 0.63], [1.05, 43, 0.47]]) {
      layer(ctx, sound, at, 1.6, (shot) => {
        const rumble = punch(shot, [
          { color: 'brown', kind: 'lowpass', hz: hz + 20, gain: 1.56, attack: 0.04, decay: 0.32 },
          { color: 'pink', kind: 'bandpass', hz: hz * 2.5, gain: 0.83, attack: 0.015, decay: 0.14 },
        ]);
        mix(rumble, tone(shot, (t) => sweep(hz, hz * 0.58, 0.35, t),
          (t) => envelope(t, 0.037, 0.35) * (0.82 + 0.18 * Math.cos(t * 41))), 0.68);
        return rumble;
      }, gain);
    }
    return reverb(sound, ctx.sampleRate, 'outdoor', 0.82 + params.distance * 0.35);
  },
} satisfies SoundRecipe;
