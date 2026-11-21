import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import leatherStrapFlex from './_recordings/leather-strap-flex.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import backpackZipClose from './_recordings/backpack-zip-close.ts';

export default {
  id: 'canvas-pack-shoulder-lift', name: "Canvas pack shoulder lift", category: 'Props & Interactions',
  tags: ["equipment", "canvas", "backpack", "equip"],
  loopable: false, durationSec: 0.59, mixRole: 'detail', targetRmsDbfs: -27,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(leatherStrapFlex, jacketMovementRustle, backpackZipClose),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [leatherStrapFlex, 0.0, 0.48, 0.82, 1, 10500, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.14, 0.31, 0.69, 1, 10500, 0, 0.001, 0.022],
      [backpackZipClose, 0.42, 0.12, 0.16, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
