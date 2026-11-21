import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import cardboardBoxCrush from './_recordings/cardboard-box-crush.ts';
import cardboardPackageOpen from './_recordings/cardboard-package-open.ts';
import twoFootLanding from './_recordings/two-foot-landing.ts';

export default {
  id: 'package-flattened-under-palm', name: "Package flattened under palm", category: 'Props & Interactions',
  tags: ["package", "cardboard", "crush", "tabletop"],
  loopable: false, durationSec: 0.66, mixRole: 'detail', targetRmsDbfs: -25,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(cardboardBoxCrush, cardboardPackageOpen, twoFootLanding),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [cardboardBoxCrush, 0.0, 0.46, 0.94, 1, 10500, 0, 0.001, 0.022],
      [cardboardPackageOpen, 0.24, 0.37, 0.4, 1, 10500, 0, 0.001, 0.022],
      [twoFootLanding, 0.38, 0.13, 0.18, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
