import type { SoundRecipe } from '../engine/types.ts';
import { layer } from '../engine/dsp.ts';
import { discharge } from './_shared/mechanical.ts';

export default {
  id: "double-barrel-shot", name: "Double-Barrel Shot", category: 'Weapons',
  tags: ["shotgun","gunshot","double-barrel","heavy"], loopable: false, durationSec: 0.89,
  params: { weight: { label: "Weight", min: 0, max: 1, default: 0.66 } },
  render(ctx, { params }) {
    const sound = discharge(ctx, { span: 0.00282, low: 327, high: 2190, edge: 1.02, weight: 1.59 + 0.69 * params.weight, tail: 0.55, presence: 1.19 });
    layer(ctx, sound, 0.012 + ctx.random() * 0.004, 0.231, (front) => discharge(front, { span: 0.00213, low: 385, high: 2550, edge: 0.90, weight: 0.96, tail: 0.112, presence: 0.70 }), 0.51);
    return sound;
  },
} satisfies SoundRecipe;
