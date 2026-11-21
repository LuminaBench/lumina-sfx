import type { SoundRecipe } from '../engine/types.ts';
import { discharge } from './_shared/mechanical.ts';

export default {
  id: "heavy-revolver-shot", name: "Heavy Revolver Shot", category: 'Weapons',
  tags: ["revolver","sidearm","gunshot","heavy"], loopable: false, durationSec: 0.79,
  params: { weight: { label: "Weight", min: 0, max: 1, default: 0.69 } },
  render(ctx, { params }) {
    return discharge(ctx, { span: 0.00218, low: 394, high: 2350, edge: 1.19, weight: 1.25 + 0.71 * params.weight, tail: 0.52, presence: 1.18 });
  },
} satisfies SoundRecipe;
