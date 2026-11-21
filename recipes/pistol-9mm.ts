import type { SoundRecipe } from '../engine/types.ts';
import { discharge } from './_shared/mechanical.ts';

export default {
  id: 'pistol-9mm', name: "9mm Pistol", category: 'Weapons',
  tags: ["pistol","gunshot","sidearm","short"], loopable: false, durationSec: 0.43,
  params: { snap: { label: 'Snap', min: 0, max: 1, default: 0.72 } },
  render(ctx, { params }) {
    return discharge(ctx, {
      crack: 1.06 + 0.92 * params.snap, body: 1.04, bass: 148, decay: 0.043, grit: 0.16, space: 0.28,
    });
  },
} satisfies SoundRecipe;
