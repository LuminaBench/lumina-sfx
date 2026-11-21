import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import cardboardPackageOpen from './_recordings/cardboard-package-open.ts';
import fieldLeafTear from './_recordings/field-leaf-tear.ts';
import seedPacketRustle from './_recordings/seed-packet-rustle.ts';

export default {
  id: 'paper-parcel-torn-open-at-seam', name: "Paper parcel torn open at seam", category: 'Props & Interactions',
  tags: ["package", "parcel", "tear", "opening"],
  loopable: false, durationSec: 0.93, mixRole: 'detail', targetRmsDbfs: -26,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(cardboardPackageOpen, fieldLeafTear, seedPacketRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [cardboardPackageOpen, 0.0, 0.44, 0.72, 1, 10500, 0, 0.001, 0.022],
      [fieldLeafTear, 0.28, 0.35, 0.67, 1, 10500, 0, 0.001, 0.022],
      [seedPacketRustle, 0.53, 0.35, 0.37, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
