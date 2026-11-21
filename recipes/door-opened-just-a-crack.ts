import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import doorHandleUnlatch from './_recordings/door-handle-unlatch.ts';
import cupboardDoorCreak from './_recordings/cupboard-door-creak.ts';

export default {
  id: 'door-opened-just-a-crack', name: "Door opened just a crack", category: 'Props & Interactions',
  tags: ["door", "cautious", "open", "hinge"],
  loopable: false, durationSec: 0.91, mixRole: 'detail', targetRmsDbfs: -27,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(doorHandleUnlatch, cupboardDoorCreak),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [doorHandleUnlatch, 0.0, 0.3, 0.7, 1, 10500, 0, 0.001, 0.022],
      [cupboardDoorCreak, 0.27, 0.59, 0.65, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
