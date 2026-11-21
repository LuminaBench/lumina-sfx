import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import seedPacketRustle from './_recordings/seed-packet-rustle.ts';
import plantLargeSeeds from './_recordings/plant-large-seeds.ts';

export default {
  id: 'seed-packet-tapped-into-palm', name: "Seed packet tapped into palm", category: 'Props & Interactions',
  tags: ["planting", "seeds", "dispense", "portion"],
  loopable: false, durationSec: 0.91, mixRole: 'detail', targetRmsDbfs: -29,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(seedPacketRustle, plantLargeSeeds),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [seedPacketRustle, 0.0, 0.4, 0.82, 1, 10500, 0, 0.001, 0.022],
      [plantLargeSeeds, 0.35, 0.31, 0.63, 1, 10500, 0, 0.001, 0.022],
      [plantLargeSeeds, 0.69, 0.17, 0.29, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
