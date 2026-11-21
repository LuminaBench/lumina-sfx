import type { SoundRecipe } from '../engine/types.ts';
import { layer } from '../engine/dsp.ts';
import { discharge, mechanism } from './_shared/mechanical.ts';

export default {
  id: 'assault-rifle', name: "Assault Rifle", category: 'Weapons',
  tags: ["rifle","gunshot","automatic","burst"], loopable: false, durationSec: 0.51,
  params: { bite: { label: 'Bite', min: 0, max: 1, default: 0.65 } },
  render(ctx, { params }) {
    const sound = discharge(ctx, {
      crack: 1.30 + params.bite * 0.65, body: 1.39, bass: 116, decay: 0.051, grit: 0.35, space: 0.44,
    });
    layer(ctx, sound, 0.048, 0.11, (shot) => mechanism(shot, 960, 0.027), 0.29);
    return sound;
  },
} satisfies SoundRecipe;
