import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import doorChainLatchSlide from './_recordings/door-chain-latch-slide.ts';
import coinPileDrop from './_recordings/coin-pile-drop.ts';
import responseMicroclick from './_recordings/response-microclick.ts';

export default {
  id: 'reward-drawer-delivered', name: "Reward drawer delivered", category: 'Sci-Fi & UI',
  tags: ["ui", "reward", "unlock", "loot", "delivery"],
  loopable: false, durationSec: 0.353, mixRole: 'interface', targetRmsDbfs: -25,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(doorChainLatchSlide, coinPileDrop, responseMicroclick),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [doorChainLatchSlide, 0.0, 0.138, 0.45, 1, 10500, 0, 0.001, 0.022],
      [coinPileDrop, 0.091, 0.212, 0.58, 1, 10500, 0, 0.001, 0.022],
      [responseMicroclick, 0.215, 0.041, 0.42, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
