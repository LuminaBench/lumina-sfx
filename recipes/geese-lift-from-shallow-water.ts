import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import geeseWarningFlock from './_recordings/geese-warning-flock.ts';
import fieldWings from './_recordings/field-wings.ts';
import shallowWaterFootstep from './_recordings/shallow-water-footstep.ts';
import gooseSingleHonk from './_recordings/goose-single-honk.ts';

export default {
  id: 'geese-lift-from-shallow-water', name: "Geese lift from shallow water", category: 'Animals',
  tags: ["goose", "geese", "flight", "splash"],
  loopable: false, durationSec: 2.042, mixRole: 'voice', targetRmsDbfs: -23,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(geeseWarningFlock, fieldWings, shallowWaterFootstep, gooseSingleHonk),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [geeseWarningFlock, 0.0, 1.38, 0.92, 1, 10500, 0, 0.001, 0.022],
      [fieldWings, 0.19, 0.76, 0.71, 1, 10500, 0, 0.001, 0.022],
      [shallowWaterFootstep, 0.28, 0.4, 0.39, 1, 10500, 0, 0.001, 0.022],
      [gooseSingleHonk, 1.47, 0.42, 0.47, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
