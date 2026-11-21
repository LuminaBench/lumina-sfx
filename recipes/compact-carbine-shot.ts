import type { SoundRecipe } from '../engine/types.ts';
import { layer } from '../engine/dsp.ts';
import { contact, discharge } from './_shared/mechanical.ts';

export default {
  id: "compact-carbine-shot", name: "Compact Carbine Shot", category: 'Weapons',
  tags: ["carbine","rifle","gunshot","snap"], loopable: false, durationSec: 0.55,
  params: { bite: { label: "Bite", min: 0, max: 1, default: 0.66 } },
  render(ctx, { params }) {
    const sound = discharge(ctx, { span: 0.00108, low: 715, high: 3590 + 1340 * params.bite, edge: 1.16, weight: 0.83, tail: 0.37, presence: 0.96 });
    layer(ctx, sound, 0.027 + ctx.random() * 0.017, 0.071, (metal) => contact(metal, { body: 1030, bright: 3750, damping: 0.0039 }), 0.16);
    return sound;
  },
} satisfies SoundRecipe;
