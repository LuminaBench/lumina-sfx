import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalCrow from './_recordings/natural-crow.ts';
import fieldBirdFlutter from './_recordings/field-bird-flutter.ts';
import slattedCrateSettle from './_recordings/slatted-crate-settle.ts';

export default {
  id: 'crow-leaves-a-fence-post', name: "Crow leaves a fence post", category: 'Animals',
  tags: ["crow", "caw", "wing", "fence"],
  loopable: false, durationSec: 1.152, mixRole: 'voice', targetRmsDbfs: -24,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalCrow, fieldBirdFlutter, slattedCrateSettle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [naturalCrow, 0.0, 0.63, 0.96, 1, 10500, 0, 0.001, 0.022],
      [fieldBirdFlutter, 0.34, 0.66, 0.69, 1, 10500, 0, 0.001, 0.022],
      [slattedCrateSettle, 0.36, 0.13, 0.08, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
