import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import responseButton from './_recordings/response-button.ts';
import milestoneRatchet from './_recordings/milestone-ratchet.ts';
import energyCellSeating from './_recordings/energy-cell-seating.ts';

export default {
  id: 'quick-slot-equips-a-small-tool', name: "Quick slot equips a small tool", category: 'Sci-Fi & UI',
  tags: ["ui", "inventory", "equip", "hotbar", "slot"],
  loopable: false, durationSec: 0.243, mixRole: 'interface', targetRmsDbfs: -26,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(responseButton, milestoneRatchet, energyCellSeating),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [responseButton, 0.0, 0.087, 0.55, 1, 10500, 0, 0.001, 0.022],
      [milestoneRatchet, 0.038, 0.11, 0.51, 1, 10500, 0, 0.001, 0.022],
      [energyCellSeating, 0.106, 0.087, 0.62, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
