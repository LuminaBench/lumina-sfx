import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/clarity-field.ts';
import foley1 from './_recordings/clarity-slide.ts';
import type { SoundRecipe } from '../engine/types.ts';
import { discharge } from './_shared/mechanical.ts';

const original = {
  id: "heavy-revolver-shot", name: "Heavy Revolver Shot", category: 'Weapons',
  tags: ["revolver","sidearm","gunshot","heavy"], loopable: false, durationSec: 0.79,
  params: { weight: { label: "Weight", min: 0, max: 1, default: 0.69 } },
  render(ctx, { params }) {
    return discharge(ctx, { span: 0.00218, low: 394, high: 2350, edge: 1.19, weight: 1.25 + 0.71 * params.weight, tail: 0.52, presence: 1.18 });
  },
} satisfies SoundRecipe;

export default withImpactFoley(original, [
  { clip: foley0, at: 0, span: 0.38, gain: 1.13, cutoff: 8700, speed: 0.86 },
  { clip: foley1, at: 0.058, span: 0.092, gain: 0.17, cutoff: 6500, speed: 1.06 },
]);
