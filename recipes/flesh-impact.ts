import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/field-cabbage-chop.ts';
import foley1 from './_recordings/spade-wet-mud.ts';
import type { SoundRecipe } from '../engine/types.ts';
import { bodyImpact } from './_shared/combat.ts';

const original = {
  id: 'flesh-impact', name: 'Flesh Impact Thud', category: 'Impacts',
  tags: ['flesh', 'impact', 'thud', 'wet', 'hit'], loopable: false, durationSec: 0.48,
  mixRole: 'foley',
  params: { wetness: { label: 'Wetness', min: 0, max: 1, default: 0.68 } },
  render(ctx, { params }) {
    return bodyImpact(ctx, 0.68, params.wetness);
  },
} satisfies SoundRecipe;

export default withImpactFoley(original, [
  { clip: foley0, at: 0, span: 0.115, gain: 1.1, cutoff: 1700, speed: 0.75 },
  { clip: foley1, at: 0.019, span: 0.117, gain: 0.33, cutoff: 3660, speed: 0.87 },
]);
