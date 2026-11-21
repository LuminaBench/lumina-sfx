import type { SoundRecipe } from '../engine/types.ts';
import { layer, modal, punch, reverb } from '../engine/dsp.ts';
import { soleContact } from './_shared/surfaces.ts';

export default {
  id: 'gravel-footstep', name: "Gravel Footstep", category: 'Footsteps & UI',
  tags: ["footstep","gravel","stone","walk","crunch"], loopable: false, durationSec: 0.52,
  params: { coarseness: { label: 'Coarseness', min: 0, max: 1, default: 0.72 } },
  render(ctx, { params }) {
    const sound = soleContact(ctx, 119, 0.036, 0.63);
    for (let i = 0; i < 19; i++) {
      const at = (i % 9) * 0.007 + (i > 8 ? 0.078 : 0) + ctx.random() * 0.014;
      const hz = 580 + ctx.random() * (850 + params.coarseness * 1420);
      layer(ctx, sound, at, 0.08, (shot) => modal(shot, 'wood', hz, 0.006 + 0.011 * ctx.random()),
        (0.15 + 0.31 * ctx.random()) * Math.exp(-at * 4.2));
      layer(ctx, sound, at, 0.073, (shot) => punch(shot, [
        { color: 'white', kind: 'bandpass', hz: hz * 1.71, q: 0.85, gain: 0.88, attack: 0.0005, decay: 0.014 },
      ]), 0.28 * Math.exp(-at * 3.8));
    }
    return reverb(sound, ctx.sampleRate, 'outdoor', 0.17);
  },
} satisfies SoundRecipe;
