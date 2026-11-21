import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import leatherStrapFlex from './_recordings/leather-strap-flex.ts';

export default {
  id: 'canvas-pack-flap-search', name: "Canvas pack flap search", category: 'Props & Interactions',
  tags: ["equipment", "backpack", "inventory", "search", "cloth"],
  loopable: false, durationSec: 0.9, mixRole: 'detail', targetRmsDbfs: -28,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, leatherStrapFlex),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [jacketMovementRustle, 0.0, 0.31, 0.67, 1, 10500, 0, 0.001, 0.022],
      [leatherStrapFlex, 0.22, 0.45, 0.37, 1, 10500, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.54, 0.31, 0.81, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
