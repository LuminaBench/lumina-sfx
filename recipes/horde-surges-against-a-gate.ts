import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalHorde from './_recordings/natural-horde.ts';
import chainRattleShort from './_recordings/chain-rattle-short.ts';
import paddockGateSwing from './_recordings/paddock-gate-swing.ts';
import urgentDoorKnock from './_recordings/urgent-door-knock.ts';

export default {
  id: 'horde-surges-against-a-gate', name: "Horde surges against a gate", category: 'Zombies & Combat',
  tags: ["horde", "zombie", "crowd", "gate"],
  loopable: false, durationSec: 3.257, mixRole: 'voice', targetRmsDbfs: -23,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalHorde, chainRattleShort, paddockGateSwing, urgentDoorKnock),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [naturalHorde, 0.0, 3.12, 0.91, 1, 10500, 0, 0.001, 0.022],
      [chainRattleShort, 0.35, 0.68, 0.32, 1, 10500, 0, 0.001, 0.022],
      [paddockGateSwing, 0.87, 0.94, 0.35, 1, 10500, 0, 0.001, 0.022],
      [urgentDoorKnock, 1.39, 0.35, 0.24, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.037, 0.087], send: 0.19, dampingHz: 2900 });
  },
} satisfies SoundRecipe;
