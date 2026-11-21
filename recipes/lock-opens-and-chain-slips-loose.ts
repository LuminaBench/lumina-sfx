import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import keyTurnInLock from './_recordings/key-turn-in-lock.ts';
import doorChainLatchSlide from './_recordings/door-chain-latch-slide.ts';
import chainRattleShort from './_recordings/chain-rattle-short.ts';

export default {
  id: 'lock-opens-and-chain-slips-loose', name: "Lock opens and chain slips loose", category: 'Props & Interactions',
  tags: ["door", "security", "chain", "unlock"],
  loopable: false, durationSec: 1.07, mixRole: 'detail', targetRmsDbfs: -25,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(keyTurnInLock, doorChainLatchSlide, chainRattleShort),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [keyTurnInLock, 0.0, 0.51, 0.76, 1, 10500, 0, 0.001, 0.022],
      [doorChainLatchSlide, 0.41, 0.31, 0.86, 1, 10500, 0, 0.001, 0.022],
      [chainRattleShort, 0.63, 0.39, 0.34, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
