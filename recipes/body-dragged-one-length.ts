import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import naturalGravelDrag from './_recordings/natural-gravel-drag.ts';
import twoFootLanding from './_recordings/two-foot-landing.ts';

export default {
  id: 'body-dragged-one-length', name: "Body dragged one length", category: 'Zombies & Combat',
  tags: ["body", "cloth", "drag", "concrete", "weight"],
  loopable: false, durationSec: 0.852, mixRole: 'impact', targetRmsDbfs: -25,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, naturalGravelDrag, twoFootLanding),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [jacketMovementRustle, 0.0, 0.28, 0.68, 1, 10500, 0, 0.001, 0.022],
      [naturalGravelDrag, 0.15, 0.48, 0.56, 1, 10500, 0, 0.001, 0.022],
      [twoFootLanding, 0.58, 0.19, 0.48, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
