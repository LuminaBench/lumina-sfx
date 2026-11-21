import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import dogDoubleBark from './_recordings/dog-double-bark.ts';
import urgentDoorKnock from './_recordings/urgent-door-knock.ts';

export default {
  id: 'dog-barks-from-behind-a-door', name: "Dog barks from behind a door", category: 'Animals',
  tags: ["dog", "bark", "muffled", "indoors"],
  loopable: false, durationSec: 2.422, mixRole: 'voice', targetRmsDbfs: -26,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(dogDoubleBark, urgentDoorKnock),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [dogDoubleBark, 0.0, 0.74, 0.83, 1.0, 2450.0, 0, 0.001, 0.022],
      [urgentDoorKnock, 0.83, 0.27, 0.17, 1, 10500, 0, 0.001, 0.022],
      [dogDoubleBark, 1.59, 0.75, 0.79, 1.02, 2100.0, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
