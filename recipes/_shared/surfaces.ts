import { mix, modal, punch } from '../../engine/dsp.ts';
import type { RenderContext } from '../../engine/types.ts';

export function soleContact(ctx: RenderContext, hz: number, decay: number, hardness: number): Float32Array {
  const sound = punch(ctx, [
    { color: 'brown', kind: 'lowpass', hz: 210, gain: 1.31, attack: 0.0016, decay: decay * 1.8 },
    { color: 'pink', kind: 'bandpass', hz: 780, q: 0.68, gain: 1.1, attack: 0.0013, decay },
    { color: 'white', kind: 'bandpass', hz: 2610, gain: hardness, attack: 0.00035, decay: decay * 0.45 },
  ]);
  mix(sound, modal(ctx, 'wood', hz, decay * 1.24), 0.64);
  return sound;
}
