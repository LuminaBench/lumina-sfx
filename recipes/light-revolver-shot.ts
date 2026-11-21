import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/clarity-pistol.ts';
import type { SoundRecipe } from '../engine/types.ts';
import { discharge } from './_shared/mechanical.ts';

const original = {
  id: "light-revolver-shot", name: "Light Revolver Shot", category: 'Weapons',
  tags: ["revolver","sidearm","gunshot","light"], loopable: false, durationSec: 0.48,
  params: { snap: { label: "Snap", min: 0, max: 1, default: 0.68 } },
  render(ctx, { params }) {
    return discharge(ctx, { span: 0.00081, low: 733, high: 3130, edge: 0.89 + params.snap * 0.47, weight: 0.51, tail: 0.24, presence: 0.64 });
  },
} satisfies SoundRecipe;

export default withImpactFoley(original, [
  { clip: foley0, at: 0, span: 0.14, gain: 1.1, cutoff: 11300, speed: 1.09 },
]);
