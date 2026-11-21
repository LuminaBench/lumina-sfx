import type { SoundRecipe } from '../engine/types.ts';
import { layer } from '../engine/dsp.ts';
import { contact, discharge } from './_shared/mechanical.ts';

export default {
  id: "suppressed-sidearm-shot", name: "Suppressed Sidearm Shot", category: 'Weapons',
  tags: ["pistol","sidearm","gunshot","suppressed","mechanical"], loopable: false, durationSec: 0.39,
  params: { action: { label: "Action", min: 0, max: 1, default: 0.61 } },
  render(ctx, { params }) {
    const sound = discharge(ctx, { span: 0.00164, low: 568, high: 1950, edge: 0.57, weight: 0.63, tail: 0.162, presence: 0.47 });
    layer(ctx, sound, 0.021 + ctx.random() * 0.011, 0.071, (metal) => contact(metal, { body: 830, bright: 3160, damping: 0.0031 }), 0.33 + params.action * 0.43);
    return sound;
  },
} satisfies SoundRecipe;
