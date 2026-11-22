import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/clarity-rifle.ts';
import foley1 from './_recordings/clarity-distant.ts';
import type { SoundRecipe } from '../engine/types.ts';
import { discharge } from './_shared/mechanical.ts';

const original = {
  id: "long-rifle-shot", name: "Long Rifle Shot", category: 'Weapons',
  tags: ["rifle","gunshot","open-field","long"], loopable: false, durationSec: 1.4,
  params: { tail: { label: "Tail", min: 0, max: 1, default: 0.62 } },
  render(ctx, { params }) {
    return discharge(ctx, { span: 0.00167, low: 536, high: 3300, edge: 1.26, weight: 1.13, tail: 0.40 + params.tail * 0.32, presence: 1.12 });
  },
} satisfies SoundRecipe;

export default withImpactFoley(original, [
  { clip: foley0, at: 0, span: 0.31, gain: 1.16, cutoff: 10800, speed: 0.98 },
  { clip: foley1, at: 0.19, span: 1.18, gain: params => 0.19 + 0.52 * params.tail, cutoff: 2700, speed: 0.96 },
]);
