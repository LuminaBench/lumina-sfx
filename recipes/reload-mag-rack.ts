import type { SoundRecipe } from '../engine/types.ts';
import { layer, punch, reverb } from '../engine/dsp.ts';
import { mechanism } from './_shared/mechanical.ts';

export default {
  id: 'reload-mag-rack', name: "Reload · Mag In & Rack", category: 'Weapons',
  tags: ["reload","magazine","rack","mechanical"], loopable: false, durationSec: 0.92,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.6 } },
  render(ctx, { params }) {
    const sound = new Float32Array(ctx.frames);
    layer(ctx, sound, 0, 0.13, (shot) => mechanism(shot, 675, 0.024), 0.86 + params.weight * 0.34);
    layer(ctx, sound, 0.130, 0.11, (shot) => mechanism(shot, 480, 0.024), 0.53);
    layer(ctx, sound, 0.288, 0.16, (shot) => punch(shot, [
      { color: 'white', kind: 'bandpass', hz: 2950, q: 1.4, gain: 1, attack: 0.029, decay: 0.063 },
      { color: 'pink', kind: 'bandpass', hz: 880, q: 1.0, gain: 1.1, attack: 0.035, decay: 0.051 },
    ]), 0.72);
    layer(ctx, sound, 0.388, 0.14, (shot) => mechanism(shot, 1150, 0.029), 1.05);
    layer(ctx, sound, 0.481, 0.11, (shot) => mechanism(shot, 745, 0.018), 0.62);
    return reverb(sound, ctx.sampleRate, 'room', 0.23);
  },
} satisfies SoundRecipe;
