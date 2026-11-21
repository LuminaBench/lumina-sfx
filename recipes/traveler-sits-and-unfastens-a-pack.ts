import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import twoFootLanding from './_recordings/two-foot-landing.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import energyCellSeating from './_recordings/energy-cell-seating.ts';
import backpackZipClose from './_recordings/backpack-zip-close.ts';

export default {
  id: 'traveler-sits-and-unfastens-a-pack', name: "Traveler sits and unfastens a pack", category: 'Props & Interactions',
  tags: ["backpack", "rest", "camp", "unequip"],
  loopable: false, durationSec: 1.25, mixRole: 'detail', targetRmsDbfs: -26,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(twoFootLanding, jacketMovementRustle, energyCellSeating, backpackZipClose),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [twoFootLanding, 0.0, 0.2, 0.62, 1, 10500, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.08, 0.29, 0.63, 1, 10500, 0, 0.001, 0.022],
      [energyCellSeating, 0.47, 0.2, 0.72, 1, 10500, 0, 0.001, 0.022],
      [backpackZipClose, 0.74, 0.46, 0.58, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
