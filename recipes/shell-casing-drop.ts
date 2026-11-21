import type { SoundRecipe } from '../engine/types.ts';
import { layer, modal, punch, reverb } from '../engine/dsp.ts';

export default {
  id: 'shell-casing-drop', name: "Shell Casing Drop", category: 'Weapons',
  tags: ["casing","shell","metal","bounce"], loopable: false, durationSec: 0.66,
  params: { ring: { label: 'Ring', min: 0, max: 1, default: 0.6 } },
  spectrum: [{ band: 'high', minShare: 0.12 }],
  render(ctx, { params }) {
    const sound = new Float32Array(ctx.frames);
    for (const [at, hz, gain] of [[0, 2910, 1], [0.082, 3350, 0.61], [0.144, 3100, 0.36],
      [0.192, 3890, 0.21], [0.225, 3350, 0.11], [0.248, 3760, 0.08]]) {
      layer(ctx, sound, at, 0.12, (shot) => modal(shot, 'metal', hz, 0.014 + params.ring * 0.022), gain);
    }
    layer(ctx, sound, 0, 0.035, (shot) => punch(shot, [
      { color: 'white', kind: 'highpass', hz: 4000, gain: 0.85, attack: 0.0002, decay: 0.005 },
    ]));
    return reverb(sound, ctx.sampleRate, 'room', 0.32);
  },
} satisfies SoundRecipe;
