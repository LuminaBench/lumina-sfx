import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import bottleCorkPull from './_recordings/bottle-cork-pull.ts';
import fieldJarContact from './_recordings/field-jar-contact.ts';
import woodenDrawerShut from './_recordings/wooden-drawer-shut.ts';

export default {
  id: 'bottle-stopper-seated-in-a-drawer', name: "Bottle stopper seated in a drawer", category: 'Props & Interactions',
  tags: ["bottle", "cork", "put", "away"],
  loopable: false, durationSec: 1.15, mixRole: 'detail', targetRmsDbfs: -26,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(bottleCorkPull, fieldJarContact, woodenDrawerShut),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [bottleCorkPull, 0.0, 0.32, 0.73, 1, 10500, 0, 0.001, 0.022],
      [fieldJarContact, 0.28, 0.32, 0.49, 1, 10500, 0, 0.001, 0.022],
      [woodenDrawerShut, 0.65, 0.45, 0.42, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
