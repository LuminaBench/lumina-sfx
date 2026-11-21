import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldBirdCanopy from './_recordings/field-bird-canopy.ts';
import naturalRaven from './_recordings/natural-raven.ts';

export default {
  id: 'ravens-above-the-tree-line-loop', name: "Ravens above the tree line loop", category: 'Animals',
  tags: ["raven", "forest", "morning", "loop"],
  loopable: true, durationSec: 4.5, mixRole: 'ambience', targetRmsDbfs: -28,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldBirdCanopy, naturalRaven),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [fieldBirdCanopy, 0, 5.0, 0.24, 1, 6000, 3.0, 0.001, 0.015],
      [naturalRaven, 0.26, 0.59, 0.82, 1, 10500, 0, 0.001, 0.022],
      [naturalRaven, 1.51, 0.65, 0.45, 1, 10500, 0, 0.001, 0.022],
      [naturalRaven, 3.17, 0.67, 0.59, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
