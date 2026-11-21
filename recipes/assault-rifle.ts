import { renderRecording } from '../engine/recording.ts';
import recording from './_recordings/clarity-rifle.ts';
import type { SoundRecipe } from '../engine/types.ts';
import { layer, mix } from '../engine/dsp.ts';
import { contact, discharge } from './_shared/mechanical.ts';

export default {
  id: 'assault-rifle', name: "Assault Rifle", category: 'Weapons',
  tags: ["rifle","gunshot","automatic","burst"], loopable: false, durationSec: 0.51,
  recording: recording.credit,
  params: { bite: { label: 'Bite', min: 0, max: 1, default: 0.65 } },
  render(ctx, { params, seed }) {
    const sound = discharge(ctx, {
      span: 0.00133, low: 560, high: 3350 + params.bite * 1770, edge: 1.08 + params.bite * 0.43,
      weight: 1.07, tail: 0.34, presence: 0.91,
    });
    layer(ctx, sound, 0.044 + ctx.random() * 0.007, 0.06, (detail) =>
      contact(detail, { body: 1040, bright: 2840, damping: 0.004 }), 0.19);
    layer(ctx, sound, 0.061 + ctx.random() * 0.009, 0.045, (detail) =>
      contact(detail, { body: 840, bright: 4150, damping: 0.0029 }), 0.09);
    const take = renderRecording(ctx, recording, {
      seed, speed: 0.99 + ctx.random() * 0.025, cutoffHz: 6200 + params.bite * 6000,
    });
    mix(sound, take, 2.35);
    return sound;
  },
} satisfies SoundRecipe;
