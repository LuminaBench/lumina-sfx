import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import steelDrawerOpen from './_recordings/steel-drawer-open.ts';
import chainRattleShort from './_recordings/chain-rattle-short.ts';
import milestoneRatchet from './_recordings/milestone-ratchet.ts';

export default {
  id: 'tool-drawer-rummage-and-lift', name: "Tool drawer rummage and lift", category: 'Props & Interactions',
  tags: ["workbench", "tools", "drawer", "inventory"],
  loopable: false, durationSec: 1.112, mixRole: 'detail', targetRmsDbfs: -25,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(steelDrawerOpen, chainRattleShort, milestoneRatchet),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [steelDrawerOpen, 0.0, 0.66, 0.73, 1, 10500, 0, 0.001, 0.022],
      [chainRattleShort, 0.54, 0.22, 0.25, 1, 10500, 0, 0.001, 0.022],
      [milestoneRatchet, 0.77, 0.26, 0.66, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
