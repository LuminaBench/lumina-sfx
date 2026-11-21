import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldNightCrickets from './_recordings/field-night-crickets.ts';
import naturalLion from './_recordings/natural-lion.ts';

export default {
  id: 'lions-beyond-a-night-camp-loop', name: "Lions beyond a night camp loop", category: 'Animals',
  tags: ["lion", "roar", "night", "distance", "loop"],
  loopable: true, durationSec: 4.5, mixRole: 'ambience', targetRmsDbfs: -27,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldNightCrickets, naturalLion),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [fieldNightCrickets, 0, 5.0, 0.22, 1, 6200, 4.0, 0.001, 0.015],
      [naturalLion, 0.19, 1.47, 0.76, 1, 10500, 0, 0.001, 0.022],
      [naturalLion, 2.57, 1.55, 0.47, 0.98, 3400.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
