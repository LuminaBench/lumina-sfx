import type { SoundRecipe } from '../engine/types.ts';
import { discharge } from './_shared/mechanical.ts';

export default {
  id: 'pistol-9mm', name: "9mm Pistol", category: 'Weapons',
  tags: ["pistol","gunshot","sidearm","short"], loopable: false, durationSec: 0.43,
  params: { snap: { label: 'Snap', min: 0, max: 1, default: 0.72 } },
  render(ctx, { params }) {
    return discharge(ctx, {
      span: 0.00089, low: 820, high: 3300, edge: 0.83 + params.snap * 0.46,
      weight: 0.64, tail: 0.23, presence: 0.72,
    });
  },
} satisfies SoundRecipe;
