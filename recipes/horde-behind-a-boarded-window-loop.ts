import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalHorde from './_recordings/natural-horde.ts';
import urgentDoorKnock from './_recordings/urgent-door-knock.ts';
import slattedCrateSettle from './_recordings/slatted-crate-settle.ts';
import naturalGroan from './_recordings/natural-groan.ts';

export default {
  id: 'horde-behind-a-boarded-window-loop', name: "Horde behind a boarded window loop", category: 'Zombies & Combat',
  tags: ["zombie", "walla", "boarded", "window", "crowd", "loop"],
  loopable: true, durationSec: 4.5, mixRole: 'ambience', targetRmsDbfs: -27,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalHorde, urgentDoorKnock, slattedCrateSettle, naturalGroan),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [naturalHorde, 0, 3.33, 0.84, 1, 2850, 0, 0.08, 0.42],
      [naturalHorde, 2.89, 2.35, 0.6888, 1, 2850, 0.44, 0.43, 0.1],
      [urgentDoorKnock, 0.67, 0.27, 0.26, 1, 10500, 0, 0.001, 0.022],
      [slattedCrateSettle, 1.31, 0.21, 0.13, 1, 10500, 0, 0.001, 0.022],
      [naturalGroan, 2.28, 1.21, 0.33, 0.94, 3250.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
