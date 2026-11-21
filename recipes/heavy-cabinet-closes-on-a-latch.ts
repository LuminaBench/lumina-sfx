import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import steelDrawerShut from './_recordings/steel-drawer-shut.ts';
import motionClankClose from './_recordings/motion-clank-close.ts';
import milestoneRatchet from './_recordings/milestone-ratchet.ts';
import chainRattleShort from './_recordings/chain-rattle-short.ts';

export default {
  id: 'heavy-cabinet-closes-on-a-latch', name: "Heavy cabinet closes on a latch", category: 'Props & Interactions',
  tags: ["cabinet", "door", "metal", "catch"],
  loopable: false, durationSec: 0.812, mixRole: 'detail', targetRmsDbfs: -24,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(steelDrawerShut, motionClankClose, milestoneRatchet, chainRattleShort),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [steelDrawerShut, 0.0, 0.61, 0.44, 1, 10500, 0, 0.001, 0.022],
      [motionClankClose, 0.392, 0.32, 1.3, 1.1, 14800.0, 0, 0.001, 0.022],
      [milestoneRatchet, 0.54, 0.19, 1.0, 1.14, 15200.0, 0, 0.001, 0.022],
      [chainRattleShort, 0.45, 0.2, 0.52, 1.19, 15000.0, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
