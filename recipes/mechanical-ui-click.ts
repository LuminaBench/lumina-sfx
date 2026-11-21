import type { SoundRecipe } from '../engine/types.ts';
import { layer, mix, modal, punch } from '../engine/dsp.ts';

export default {
  id: 'mechanical-ui-click', name: "Mechanical UI Click", category: 'Footsteps & UI',
  tags: ["click","ui","switch","button","mechanical"], loopable: false, durationSec: 0.18,
  params: { snap: { label: 'Snap', min: 0, max: 1, default: 0.77 } },
  render(ctx, { params }) {
    const sound = punch(ctx, [
      { color: 'white', kind: 'highpass', hz: 2800, gain: 0.63 + params.snap * 0.59, attack: 0.00015, decay: 0.0045 },
      { color: 'pink', kind: 'bandpass', hz: 940, q: 0.85, gain: 0.83, attack: 0.0004, decay: 0.013 },
    ]);
    mix(sound, modal(ctx, 'wood', 1160, 0.009), 0.73);
    layer(ctx, sound, 0.018, 0.06, (shot) => modal(shot, 'metal', 2090, 0.007), 0.27);
    return sound;
  },
} satisfies SoundRecipe;
