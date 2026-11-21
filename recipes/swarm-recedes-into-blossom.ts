import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import insideBeehiveLoop from './_recordings/inside-beehive-loop.ts';

export default {
  id: 'swarm-recedes-into-blossom', name: "Swarm recedes into blossom", category: 'Animals',
  tags: ["bee", "insects", "swarm", "fading"],
  loopable: false, durationSec: 3.092, mixRole: 'voice', targetRmsDbfs: -28,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(insideBeehiveLoop),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [insideBeehiveLoop, 0.0, 1.44, 0.85, 1.0, 8050.0, 2.0, 0.001, 0.022],
      [insideBeehiveLoop, 1.08, 1.25, 0.44, 0.981, 5250.0, 3.7, 0.001, 0.022],
      [insideBeehiveLoop, 2.04, 0.9, 0.22, 1.0, 3300.0, 1.3, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
