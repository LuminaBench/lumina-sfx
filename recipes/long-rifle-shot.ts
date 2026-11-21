import type { SoundRecipe } from '../engine/types.ts';
import { discharge } from './_shared/mechanical.ts';

export default {
  id: "long-rifle-shot", name: "Long Rifle Shot", category: 'Weapons',
  tags: ["rifle","gunshot","open-field","long"], loopable: false, durationSec: 0.94,
  params: { tail: { label: "Tail", min: 0, max: 1, default: 0.62 } },
  render(ctx, { params }) {
    return discharge(ctx, { span: 0.00167, low: 536, high: 3300, edge: 1.26, weight: 1.13, tail: 0.40 + params.tail * 0.32, presence: 0.95 + params.tail * 0.40 });
  },
} satisfies SoundRecipe;
