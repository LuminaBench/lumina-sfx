import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import leatherStrapFlex from './_recordings/leather-strap-flex.ts';
import orchardShearsSnip from './_recordings/orchard-shears-snip.ts';

export default {
  id: 'shears-picked-up-and-tested', name: "Shears picked up and tested", category: 'Props & Interactions',
  tags: ["farm", "shears", "equip", "tool"],
  loopable: false, durationSec: 0.8, mixRole: 'detail', targetRmsDbfs: -26,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(leatherStrapFlex, orchardShearsSnip),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [leatherStrapFlex, 0.0, 0.19, 0.32, 1, 10500, 0, 0.001, 0.022],
      [orchardShearsSnip, 0.19, 0.27, 0.88, 1, 10500, 0, 0.001, 0.022],
      [orchardShearsSnip, 0.52, 0.23, 0.66, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
